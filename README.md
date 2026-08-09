# Job Portal

Job portal web app — job seeker site + recruiter dashboard.

## Status: In progress (backend built, frontend still a prototype)

- `prototype/index.html` — static, interactive front-end prototype (no real backend calls yet)
- `backend/` — real Express + MongoDB API

Planned UX (from the project walkthrough):

- Home with job search, categories, and location filters
- Job listings from top companies (Google, Microsoft, Amazon, etc.)
- Job detail page with apply flow
- Clerk-powered sign in (Google OAuth + email)
- Applicant profile with applied jobs and status tracking
- Recruiter login / sign up
- Recruiter dashboard — Add Job, Manage Jobs, View Applications

## Done ✅

- ✅ Repo created
- ✅ Interactive frontend prototype (Ledger-style, no backend)
- ✅ Express + MongoDB backend (`/backend`) — job listings, recruiter dashboard, applications, Clerk auth middleware, seed script

## Backend

```
backend/
├── config/
│   ├── db.js        # MongoDB connection
│   └── sentry.js    # Sentry init
├── middleware/
│   └── auth.js       # Clerk auth + recruiter role check
├── models/
│   ├── Job.js
│   └── Application.js
├── routes/
│   ├── jobRoute.js        # public job listing/search + apply
│   ├── recruiterRoute.js  # add/manage jobs, view applications
│   └── userRoute.js       # applicant's own applications
├── seed/
│   └── seedJobs.js
└── server.js
```

### Run locally

```bash
cd backend
cp .env.example .env   # fill in MongoDB URI, Clerk keys, Sentry DSN
npm install
npm run seed            # optional: load sample jobs
npm run dev
```

## Planned stack

- Frontend: React
- Backend: Node/Express + MongoDB ✅
- Auth: Clerk
- Monitoring: Sentry

## Next steps

- Build real React frontend (replace static prototype), wire it to the API
- Connect Clerk auth on the frontend (job seeker + recruiter roles)
- Deploy backend (Render/Railway) + frontend (Vercel)
