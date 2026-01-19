from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import httpx
from emergentintegrations.llm.chat import LlmChat, UserMessage
from novarch_prompt import NOVARCH_SYSTEM_PROMPT


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Brevo configuration
BREVO_API_KEY = os.environ.get('BREVO_API_KEY', '')
BREVO_LIST_NAME = os.environ.get('BREVO_LIST_NAME', 'Novarch Early Access')
BREVO_API_URL = "https://api.brevo.com/v3"

# LLM configuration
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class SubscribeRequest(BaseModel):
    email: EmailStr

class SubscribeResponse(BaseModel):
    success: bool
    message: str
    email: Optional[str] = None

class SubscriberInDB(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    brevo_synced: bool = False
    brevo_contact_id: Optional[int] = None
    status: str = "active"


# Brevo Service
class BrevoService:
    def __init__(self):
        self.api_key = BREVO_API_KEY
        self.base_url = BREVO_API_URL
        self.headers = {
            "api-key": self.api_key,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    
    async def get_or_create_list(self, list_name: str) -> Optional[int]:
        """Get list ID by name, create if doesn't exist"""
        if not self.api_key:
            logger.warning("Brevo API key not configured")
            return None
            
        try:
            # First, try to find existing list
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/contacts/lists",
                    headers=self.headers,
                    params={"limit": 50}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    for contact_list in data.get("lists", []):
                        if contact_list.get("name") == list_name:
                            return contact_list.get("id")
                
                # List not found, create it
                create_response = await client.post(
                    f"{self.base_url}/contacts/lists",
                    headers=self.headers,
                    json={"name": list_name, "folderId": 1}
                )
                
                if create_response.status_code in [200, 201]:
                    return create_response.json().get("id")
                    
                logger.error(f"Failed to create list: {create_response.text}")
                return None
                
        except Exception as e:
            logger.error(f"Error getting/creating Brevo list: {str(e)}")
            return None
    
    async def create_contact(self, email: str, list_id: Optional[int] = None) -> dict:
        """Create or update contact in Brevo"""
        if not self.api_key:
            logger.warning("Brevo API key not configured - skipping Brevo sync")
            return {"success": False, "reason": "api_key_not_configured"}
        
        try:
            payload = {
                "email": email,
                "updateEnabled": True
            }
            
            if list_id:
                payload["listIds"] = [list_id]
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/contacts",
                    headers=self.headers,
                    json=payload
                )
                
                if response.status_code in [200, 201]:
                    return {"success": True, "data": response.json()}
                elif response.status_code == 204:
                    # Contact updated successfully
                    return {"success": True, "data": {"updated": True}}
                else:
                    error_data = response.json() if response.text else {}
                    logger.error(f"Brevo API error: {response.status_code} - {error_data}")
                    return {"success": False, "error": error_data}
                    
        except Exception as e:
            logger.error(f"Error creating Brevo contact: {str(e)}")
            return {"success": False, "error": str(e)}
    
    async def add_contact_to_list(self, email: str, list_id: int) -> bool:
        """Add existing contact to a list"""
        if not self.api_key:
            return False
            
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/contacts/lists/{list_id}/contacts/add",
                    headers=self.headers,
                    json={"emails": [email]}
                )
                return response.status_code in [200, 201, 204]
        except Exception as e:
            logger.error(f"Error adding contact to list: {str(e)}")
            return False


brevo_service = BrevoService()


# Routes
@api_router.get("/")
async def root():
    return {"message": "Novarch API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


@api_router.post("/subscribe", response_model=SubscribeResponse)
async def subscribe_email(request: SubscribeRequest):
    """
    Subscribe an email to the Novarch Early Access list.
    Stores in MongoDB and syncs to Brevo if API key is configured.
    """
    email = request.email.lower().strip()
    
    try:
        # Check if email already exists
        existing = await db.subscribers.find_one({"email": email})
        if existing:
            return SubscribeResponse(
                success=True,
                message="You're on the list. We'll reach out when it's ready.",
                email=email
            )
        
        # Get or create Brevo list
        list_id = await brevo_service.get_or_create_list(BREVO_LIST_NAME)
        
        # Create contact in Brevo
        brevo_result = await brevo_service.create_contact(email, list_id)
        
        # Store subscriber in MongoDB
        subscriber = {
            "id": str(uuid.uuid4()),
            "email": email,
            "subscribed_at": datetime.utcnow(),
            "brevo_synced": brevo_result.get("success", False),
            "brevo_list_id": list_id,
            "status": "active"
        }
        
        await db.subscribers.insert_one(subscriber)
        
        logger.info(f"New subscriber: {email}, Brevo synced: {brevo_result.get('success', False)}")
        
        return SubscribeResponse(
            success=True,
            message="You're on the list. We'll reach out when it's ready.",
            email=email
        )
        
    except Exception as e:
        logger.error(f"Subscription error for {email}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to process subscription. Please try again."
        )


@api_router.get("/subscribers/count")
async def get_subscriber_count():
    """Get total subscriber count"""
    count = await db.subscribers.count_documents({"status": "active"})
    return {"count": count}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    # Create index on email for faster lookups
    await db.subscribers.create_index("email", unique=True)
    logger.info("Database indexes created")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
