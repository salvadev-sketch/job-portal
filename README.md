# Job Portal

Job portal web app — job seeker site + recruiter dashboard.

## Status: Frontend + backend built

- `prototype/index.html` — the original static mockup (kept for reference)
- `frontend/` — real React (Vite + Tailwind) app, wired to the backend API
- `backend/` — real Express + MongoDB API

Planned UX (from the project walkthrough):

- Home with job search, categories, and location filters
- Job listings from top companies
- Job detail page with apply flow
- Clerk-powered sign in (Google OAuth + email)
- Applicant profile with applied jobs and status tracking
- Recruiter dashboard — Add Job, Manage Jobs, View Applications

## Done ✅

- ✅ Repo created
- ✅ Interactive frontend prototype (Ledger-style, no backend)
- ✅ Express + MongoDB backend (`/backend`)
- ✅ Real React frontend (`/frontend`) — Home, Jobs search, Job detail + apply, My Applications, Recruiter dashboard (Add/Manage roles, View applicants), Clerk auth, wired to the live API

## Frontend

```
frontend/
├── src/
│   ├── lib/api.js         # fetch wrapper for the backend
│   ├── components/
│   │   ├── Navbar.jsx       # Clerk sign-in/user button
│   │   └── JobRow.jsx        # ledger-style listing row
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Jobs.jsx           # search results
│   │   ├── JobDetail.jsx      # apply flow
│   │   ├── MyApplications.jsx
│   │   └── recruiter/
│   │       ├── Dashboard.jsx
│   │       ├── AddJob.jsx
│   │       ├── ManageJobs.jsx
│   │       └── ViewApplications.jsx
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js     # Ledger design tokens (paper/ink/signal amber)
└── vite.config.js
```

### Run locally

```bash
cd frontend
cp .env.example .env   # set VITE_CLERK_PUBLISHABLE_KEY + VITE_API_BASE_URL
npm install
npm run dev
```

Run the backend (`/backend`) alongside it — see its own README section for setup.

## Backend

```
backend/
├── config/       # db.js (MongoDB), sentry.js
├── middleware/   # auth.js (Clerk + recruiter role check)
├── models/       # Job.js, Application.js
├── routes/       # jobRoute.js, recruiterRoute.js, userRoute.js
├── seed/         # seedJobs.js
└── server.js
```

### Run locally

```bash
cd backend
cp .env.example .env   # fill in MongoDB URI, Clerk keys, Sentry DSN
npm install
npm run seed             # optional: load sample jobs
npm run dev
```

## Stack

- Frontend: React + Vite + Tailwind ✅
- Backend: Node/Express + MongoDB ✅
- Auth: Clerk
- Monitoring: Sentry

## Next steps

- Connect real Clerk keys and test the full auth flow (job seeker + recruiter roles)
- Deploy backend (Render/Railway) + frontend (Vercel)
