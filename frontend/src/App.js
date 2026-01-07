import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NovarchLanding from "./components/NovarchLanding";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NovarchLanding />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
