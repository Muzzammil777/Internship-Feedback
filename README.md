<p align="center">
  <img src="https://github.com/user-attachments/assets/d3719d4a-f48c-4c64-92de-e0719bfbf786" alt="MoviCloud Logo" width="120" />
</p>

# MoviCloud Internship Feedback System

Detailed technical documentation is available in [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md).

MoviCloud is a full-stack, role-based internship evaluation platform.

- Frontend: React + TypeScript + Vite
- Backend: FastAPI + MongoDB (Motor)
- Roles: student and company

## What The System Does

The platform supports two feedback directions:

- Company to Student: structured performance evaluation
- Student to Company: section-based internship experience feedback

Core workflows:

- Authentication with JWT access tokens
- Student profile management (including skills, tasks, and profile photo)
- Company-managed student records
- Feedback submission, validation, and retrieval
- Client-side PDF report generation for student downloads

## Current Implementation Status

- Backend and frontend are fully integrated
- Protected routes use Bearer auth (`/students`, `/feedback`)
- JWT token is persisted in browser storage and attached via `apiFetch`
- Company form templates are currently stored in browser localStorage
- Student download PDFs are generated in-browser with loading states

## Tech Stack

### Frontend

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![jsPDF](https://img.shields.io/badge/jsPDF-FF0000?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)

- React 18
- TypeScript 5
- Vite 6
- Tailwind CSS 4
- React Router 7 (hash router)
- motion
- Lucide icons
- shadcn-style component primitives
- jsPDF + html2canvas

### Backend

![FastAPI](https://img.shields.io/badge/FastAPI_0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-E92063?style=for-the-badge&logo=pydantic&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white)

- FastAPI 0.115
- Uvicorn
- Motor (MongoDB async driver)
- Pydantic + pydantic-settings
- passlib[bcrypt]
- python-jose[cryptography]
- slowapi
- python-dotenv

## Repository Structure

```text
.
|- frontend/
|  |- src/app/pages/student/      # dashboard, profile, feedback, downloads
|  |- src/app/pages/company/      # student details, feedback form, form editor
|  |- src/app/context/            # auth state and login flow
|  |- src/app/lib/                # authenticated fetch/session helpers
|  |- src/app/layouts/            # root layout and navigation
|  `- .env.example
|
|- backend/
|  |- app/main.py                 # FastAPI app composition and middleware
|  |- app/core/                   # settings, db connection, security, crypto
|  |- app/routes/                 # health, auth, students, feedback
|  |- models/                     # typed domain models (extended architecture)
|  |- schemas/                    # request/response schemas (extended architecture)
|  |- database/                   # index definitions and db utilities
|  |- requirements.txt
|  `- .env.example
|
|- start.bat                      # Windows convenience startup script
|- PROJECT_DOCUMENTATION.md
`- README.md
```

## API Summary

### Health

- `GET /health`

### Auth

- `POST /auth/login`

Behavior:

- Validates database user credentials first
- Falls back to demo credentials from environment if needed
- Returns `access_token`, `token_type`, `email`, `name`, `role`

### Students

- `GET /students` (company only)
- `POST /students` (company only)
- `GET /students/profile/{email}`
- `PUT /students/profile/{email}`
- `DELETE /students/{student_id}` (company only)

Behavior:

- Student creation also creates a linked user login record
- Profile photo must be JPEG/PNG base64 data URL and <= 2MB
- Update flow also syncs linked user document name/email

### Feedback

- `GET /feedback/company?student_id=...`
- `POST /feedback/company` (company only)
- `GET /feedback/student?student_email=...`
- `POST /feedback/student` (student only)

Behavior:

- Company feedback submission marks student status as `completed`
- Student feedback accepts section-based payloads and legacy fields
- Rate limiting is applied to login and feedback submit routes
- If MongoDB is unavailable at runtime, feedback routes use in-memory fallback

## Authentication And Security

- JWT is generated in backend and stored in frontend localStorage session payload
- Frontend helper `apiFetch` automatically injects `Authorization: Bearer <token>`
- Backend middleware enforces auth on `/students` and `/feedback`
- Security headers are applied globally (CSP, frame/options, referrer, permissions)

## Frontend Route Map

- `/#/student/dashboard`
- `/#/student/profile`
- `/#/student/feedback`
- `/#/student/downloads`
- `/#/company/student-details`
- `/#/company/feedback-form`
- `/#/company/form-editor`

## Environment Variables

### Backend (`backend/.env`)

Start from `backend/.env.example`.

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
MONGODB_DB=internship_feedback
CORS_ORIGINS=http://localhost:5173
APP_NAME=Internship Feedback API
JWT_SECRET_KEY=change-this-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
LOGIN_RATE_LIMIT=8/minute
FEEDBACK_RATE_LIMIT=10/minute
CONTENT_SECURITY_POLICY=default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self'
DEMO_STUDENT_EMAIL=student@example.com
DEMO_STUDENT_PASSWORD=123456
DEMO_COMPANY_EMAIL=admin@internfeedback.com
DEMO_COMPANY_PASSWORD=123456
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:8000
```

## Run Locally

### Option A: Windows Startup Script

From repository root:

```bat
start.bat
```

Important: `start.bat` expects Python at `.venv\Scripts\python.exe` in the repository root.

### Option B: Manual Run

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Default URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- OpenAPI docs: http://localhost:8000/docs

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Student | `student@example.com` | `123456` |
| Company | `admin@internfeedback.com` | `123456` |

## Recent UX Improvements

- Student downloads page uses authenticated API requests for protected endpoints
- Mobile card layout fixed for download action button
- PDF generation shows per-file and bulk loading animations while disabling duplicate clicks
- Student profile task delete button is now visible on mobile

## Known Gaps / Next Steps

- Persist form templates in backend (currently localStorage)
- Add automated tests for auth, feedback validation, and profile lifecycle
- Add centralized error telemetry and frontend toast feedback for generation failures
- Add token refresh if longer-lived sessions are needed

## License

Proprietary software owned by MoviCloud.
