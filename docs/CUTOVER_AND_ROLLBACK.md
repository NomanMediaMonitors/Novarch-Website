# NOVARCH production cutover and rollback plan

**Author:** Noman (architecture lead) · **Date:** 2026-10-26 · **Issue:** [#13](https://github.com/Novarch-ai/Novarch-Website/issues/13) task C
**Status:** draft for Creator review. **No live changes were made in producing this document.**

> Evidence in Part 0 was gathered with public DNS lookups and unauthenticated HTTP `GET` requests to public endpoints and the documented health route. No credentials were used, no authenticated endpoint was called, no write was attempted, and no configuration was touched.

---

## Part 0 — The cutover has already happened

This plan was requested on the premise, stated in issue #13, that *"source migration is still only in a draft PR and is not deployed."* **That is no longer true.** All three applications are live in production now. Measured 2026-10-26:

| Check | Result |
| --- | --- |
| `novarch.eu` A record | `216.198.79.1` (Vercel) |
| `novarch.eu` HTTP | `308` → `https://www.novarch.eu/`, `server: Vercel` |
| `www.novarch.eu` CNAME | `df91527a2d6af7df.vercel-dns-017.com` → `216.198.79.65`, `64.29.17.65` (Vercel) |
| `www.novarch.eu` HTTP | `200`, `server: Vercel`, `x-nextjs-prerender: 1`, markup contains `/_next/` |
| Authoritative nameservers | `holly.ns.cloudflare.com`, `kip.ns.cloudflare.com` (Cloudflare) |
| `novarch-backend.vercel.app/api/health` | `200` — `{"success":true,"status":"healthy","database":"connected","uptime":2}` |
| `novarch-dashboard.vercel.app` | `200`, `server: Vercel` |
| `novarch-frontend.vercel.app` | `404` (frontend project serves the custom domain only) |
| `novarch-api.onrender.com` | **unreachable** |

**The live site is this migration codebase, not the legacy CRA app.** Six routes that exist only in `migration/hattech-fullstack-2026-10-24` all return `200` and are prerendered: `/winter-arc`, `/hacktheflag`, `/our-community`, `/case-studies`, `/pricing`, `/founders`. None of these exist in the legacy route list baked into `main`'s `deploy-pages.yml` (`en`, `impressum`, `datenschutz`, `systems`, `work`, `company`, `manifesto`, `workflow-review`, `launch`, `community`, `talent`, `advisors`, `pay`, `pay/success`).

### What this changes

1. **There is no frontend or backend cutover left to plan.** It is done.
2. **Production is running code that is not in `main`,** has not completed review, and was never validated in a staging environment. PR [#12](https://github.com/Novarch-ai/Novarch-Website/pull/12) is still a draft.
3. **The legacy backend is gone.** `novarch-api.onrender.com` is unreachable, so the previous API cannot be failed back to.
4. **`main`'s `deploy-pages.yml` is dark.** It still runs on every push to `main` and publishes to GitHub Pages, but no DNS record points at Pages. It is a vestigial deploy, not the live one. *(This corrects the central claim of my review on #12, which assumed Pages was serving the domain.)*
5. **The remaining work is not cutover. It is reconciliation, rollback capability, and the verification that was skipped.**

---

## Part 1 — Immediate actions (P0)

### 1.1 Rotate the MongoDB credential — highest priority

`SECURITY_REMEDIATION.md` finding 2 is still marked **OPEN**: a credential-bearing MongoDB URI is present in Git history (commit `0eed31d2b26dce60279d15a7bbc5289a0d2c57e9`), and the document states its current validity *was deliberately not tested*.

That was an acceptable position on 20 October, when the same document could truthfully say *"No production deployment … was performed."* It is not acceptable now: `/api/health` reports `database: connected`, so a production database is live and serving real traffic. If that credential still works, it is a live exposure of production data.

Steps, in order, by the credential owner:

1. In Atlas, create a **new** database user with least privilege for the application (read/write on the application database only — not `atlasAdmin`).
2. Update `MONGODB_URI` in the Vercel backend project's environment variables and redeploy.
3. Confirm `/api/health` still reports `database: connected`.
4. **Delete** the old database user. Rotation is not complete until the old credential is revoked — changing source does not revoke a database credential.
5. Review Atlas access logs for use of the old credential from unexpected addresses, and the IP allowlist.
6. Only then consider Git history cleanup, which is cosmetic by comparison.

Do not post the old or new URI into issues, PRs or chat.

### 1.2 Reconcile `main` with what is deployed

Production is running unmerged code. Until `main` matches production, there is no reviewed, authoritative source for what is live, and no reliable base to roll back to.

Suggested order, once the Creator authorises:

1. Merge [#24](https://github.com/Novarch-ai/Novarch-Website/pull/24) — CI on Ubuntu / Node 24 / npm 11.
2. Merge [#14](https://github.com/Novarch-ai/Novarch-Website/pull/14) — frontend lockfile repair. **Production currently cannot be rebuilt reproducibly without this**: `npm ci` fails on the deployed tree.
3. Merge [#21](https://github.com/Novarch-ai/Novarch-Website/pull/21) — non-breaking advisory fixes (two of them production-exploitable).
4. Merge [#23](https://github.com/Novarch-ai/Novarch-Website/pull/23) — `zod` 4.6.7, closing a CVSS 7.5 advisory in the request-validation layer of a payment backend.
5. Merge [#22](https://github.com/Novarch-ai/Novarch-Website/pull/22) — cross-platform dev script.
6. Merge [#12](https://github.com/Novarch-ai/Novarch-Website/pull/12) to bring `main` level with production.

Note the ordering consequence: **the live deployment currently carries all five open advisories.** It is running `body-parser` 1.20.8, `nodemailer` 10.1.1 and `zod` 3.25.76 in production.

### 1.3 Decide what `main`'s Pages workflow should do

`.github/workflows/deploy-pages.yml` still builds the legacy CRA app and publishes to GitHub Pages on every push to `main`. It is harmless today only because no DNS points at it. Two defensible options:

- **Delete it** (as #12 does) — once the Vercel deployment is the acknowledged production path.
- **Keep it deliberately** as a static fallback origin — see Part 3.

What should not happen is leaving it to rot: a live workflow that deploys stale code to an endpoint nobody watches is a supply-chain and brand risk.

---

## Part 2 — Rollback capability is currently near zero

This is the most serious operational gap, and it is worth stating plainly: **if the current production deployment failed badly right now, there is no tested path back.**

| Layer | Current rollback option | Assessment |
| --- | --- | --- |
| Frontend | Vercel "Promote to Production" on a previous deployment | **Viable**, if an earlier good deployment exists in the project |
| Backend | Vercel rollback to previous deployment | **Viable**, same caveat |
| Legacy frontend (CRA) | Source preserved on `backup/pre-hattech-migration-2026-10-24`; Pages workflow still on `main` | **Degraded** — would need a Pages deploy and a DNS change |
| Legacy backend (Render) | `novarch-api.onrender.com` unreachable | **Gone** |
| Database | Atlas backup / restore | **Unverified** — no restore drill has been recorded |
| DNS | Cloudflare records | Viable, but see HSTS below |

### Establish these before anything else changes

1. **Confirm Vercel retains prior deployments** for all three projects, and record the deployment ID currently serving production. A rollback target you have not written down is not a rollback plan.
2. **Run an Atlas restore drill** into a scratch cluster and record how long it takes and what the data loss window is. `SECURITY_REMEDIATION.md` already recommends this; it is still outstanding.
3. **Decide the legacy fallback's fate.** Either keep the Pages deploy warm as a static holding page, or accept explicitly that there is no non-Vercel fallback. Both are acceptable; an unexamined assumption is not.
4. **HSTS constrains rollback.** The live site sends `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` — two years, all subdomains, preload. Any fallback origin, including a temporary one, **must** serve valid HTTPS on the apex and every subdomain used. An HTTP-only or self-signed emergency origin will be unreachable in browsers that have seen this header.

---

## Part 3 — Layer runbooks

### 3.1 Vercel

**Current state:** three projects — frontend (serving `novarch.eu` / `www`), backend (`novarch-backend.vercel.app`), dashboard (`novarch-dashboard.vercel.app`).

**Known configuration risks**

- `backend/vercel.json` uses the legacy `builds` / `routes` v2 schema, pointing `@vercel/node` at **`src/server.ts`** — the TypeScript source — while `backend/package.json` declares `"main": "dist/server.js"` and a `build: tsc` script. The Vercel config therefore bypasses the project's own build. Worth confirming this is intentional.
- Using `builds` disables Vercel's zero-config pipeline and causes most project-level build settings to be ignored.
- Every request routes to one Express app as a serverless function. Mongoose connection handling under cold starts should be checked for pool churn; the observed `uptime: 2` on the health endpoint confirms cold starts are happening in normal traffic.
- **`"novarch-workspace": "file:.."`** in `backend/package.json` and `frontend/package.json`. With Root Directory set to the app folder, this resolves outside the build root. This is the most likely cause of a Vercel-only build failure that passes locally and needs explicit confirmation of how it currently resolves.
- `SECURITY_REMEDIATION.md` notes the connected Vercel team is a **Hobby** plan, whose terms do not permit commercial use. This is a commercial/legal blocker for a live business site, independent of any technical work.

**Rollback:** Vercel → project → Deployments → select last known good → *Promote to Production*. Per project, seconds. Record the current production deployment ID for all three **before** the next deploy.

### 3.2 MongoDB

**Rotation:** see 1.1 — it is the P0 item.

**Index verification.** `SECURITY_REMEDIATION.md` item 3 warns that the application requires `AdminSession`, `SecurityCounter` and `SecurityEvent` collections with TTL and unique indexes, and that *"index creation must be verified in staging; do not assume an existing database has them."* Production is live and staging does not exist, so this has not been verified anywhere. Two of the controls the security work depends on — server-side session expiry and cross-instance rate limiting — rely on those indexes.

**Rollback:** database rollback is restore-from-backup, which is destructive to anything written since. Treat schema or collection changes as forward-only, and verify the restore drill before any migration that is not additive.

### 3.3 Stripe webhooks

**Verify in test mode first, in this order:** signature verification rejects an unsigned payload; a duplicate `checkout.session.completed` is idempotent; a tampered amount is rejected against the server catalog; a `payment_intent.payment_failed` resolves its Checkout Session and does not match on email. The backend security suite already covers all four as unit tests (7/7 passing); what is missing is the same four against real Stripe test-mode deliveries.

**Endpoint switching:** when the webhook URL changes, register the new endpoint **first**, confirm deliveries succeed, and only then disable the old one. Never have zero active endpoints. Each endpoint has its own signing secret, so `STRIPE_WEBHOOK_SECRET` must be updated in the same change window.

**Rollback:** re-enable the previous endpoint, restore its signing secret, and use Stripe's dashboard to replay failed deliveries from the gap. Payment records are keyed on immutable Stripe IDs with an idempotent paid-update path, so replay is safe by design — this is the part of the system best prepared for rollback.

### 3.4 Cloudflare / DNS

**Current:** authoritative NS at Cloudflare; apex `A 216.198.79.1`; `www` CNAME to Vercel. Apex 308-redirects to `www`.

**Before any DNS change:** lower the TTL on the records being changed to 60 seconds and wait for the old TTL to expire. Doing this *after* deciding to roll back is too late — TTL is the floor on rollback speed.

**Record current values verbatim** before editing, including proxy (orange-cloud) status per record. A record restored with the wrong proxy setting changes TLS termination and client-IP headers, which interacts directly with `TRUST_PROXY_HOPS` and the `x-novarch-verified-ip` handling in `SECURITY_REMEDIATION.md` item 5 — a silently wrong client IP degrades rate limiting to the shared `unknown` budget.

**Rollback:** restore the recorded records. Bounded by TTL, hence the pre-lowering step. Remember HSTS preload (Part 2) — any destination must serve valid HTTPS.

---

## Part 4 — The verification that was skipped

`SECURITY_REMEDIATION.md` already specifies staging acceptance, and none of it has been run against a real environment. Reproduced here as the outstanding checklist:

- valid login / logout / replay; password-change revocation
- forged role and algorithm tokens rejected
- direct BFF bypass rejected without `INTERNAL_API_SECRET`
- 8+ form submissions against the shared budget
- multiple API instances sharing rate limits (requires the MongoDB counters and TTL indexes)
- database outage handling — fail closed, not silent success
- real Stripe test-mode duplicate and failure webhooks
- HTML email output
- mobile language and checkout behaviour with CSP enabled

Plus, from issue #13 task C and not yet addressed: SMTP deliverability, dashboard login/logout and role enforcement, legal pages, PII logging review, health checks, and documentation of whether customer submissions and payment records from the legacy CRA/FastAPI + Render stack were preserved or migrated. **That last item is time-sensitive** — the Render service is already unreachable, so if data was held there and not exported, the window to recover it may already have closed.

### Staging still needs to exist

Three isolated Vercel projects, an isolated `novarch_staging*` database, and Stripe test keys. PR [#17](https://github.com/Novarch-ai/Novarch-Website/pull/17) adds a guard enforcing exactly those invariants — but it is opt-in via `NOVARCH_DEPLOYMENT_STAGE`, so a staging deployment that omits the variable silently falls back to the production CORS origins hardcoded at `backend/src/config/index.ts:8-17`. Recommend inverting that default to localhost-only so any misconfigured environment fails toward isolation.

Note also that `dashboard/vercel.json` hardcodes `connect-src https://novarch-backend.vercel.app`, so a staging dashboard will have its own API blocked by its own CSP until that value is parameterised.

---

## Part 5 — What needs the Creator's written authorisation

Per issue #13, none of the following may proceed without it:

1. Merging #12 to `main`.
2. Any DNS change at Cloudflare.
3. Any change to production Stripe configuration.
4. Decommissioning the legacy fallback path (or accepting formally that none exists).

Two items **do not** need a cutover decision and should not wait on one:

- **The MongoDB credential rotation (1.1).** Production is live and the exposure is open. This reduces risk and changes no behaviour.
- **Merging the fix PRs (1.2).** Production is already running the vulnerable versions; these only move it toward the reviewed state.

---

## Summary

The cutover is not ahead of us — it is behind us, and it happened without the staging validation, rollback plan and reviewed merge that issue #13 asked for. Nothing here is a reason for alarm about the code: the site is up, the backend is healthy, security headers are strong, and the underlying security work in `SECURITY_REMEDIATION.md` is genuinely thorough.

The gap is operational. In priority order: **rotate the database credential**, **establish and record a rollback target**, **get `main` to match what is deployed**, and **run the acceptance checklist in a staging environment that does not yet exist**.
