# MoviCloud Internship Feedback System

Detailed project documentation is available in [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md).

Full-stack internship evaluation platform with:

- Frontend: React + TypeScript + Vite
- Backend: FastAPI + MongoDB (Motor)
- Two roles: student and company

The current README is implementation-based and reflects what is actually present in this repository.

## Overview

MoviCloud supports two feedback directions:

- Company -> Student: structured intern performance evaluation
- Student -> Company: section-based internship experience feedback

The app includes profile management, feedback submission and review, and PDF report generation on the frontend.

## Current Status

- Backend is implemented and running (not planned)
- Frontend is connected to backend endpoints
- Authentication is database-backed email/password login
- JWT access tokens are issued by the backend and propagated by the frontend
- Form templates are currently persisted in browser localStorage (frontend)

## Tech Stack

### Frontend

- React 18
- TypeScript 5
- Vite 6
- Tailwind CSS 4
- Radix UI and shadcn-based components
- motion (Framer Motion)
- React Router 7
- jsPDF + html2canvas for report generation

### Backend

- FastAPI 0.115
- Uvicorn
- Pydantic + pydantic-settings
- Motor (MongoDB async driver)
- passlib[bcrypt]
- python-jose[cryptography]
- slowapi
- python-dotenv

## Repository Structure

```text
.
|- frontend/
|  |- src/app/pages/student/      # dashboard, profile, feedback, downloads
|  |- src/app/pages/company/      # student directory, feedback form, form editor
|  |- src/app/context/            # auth context and login flow
|  |- src/app/layouts/            # sidebar/root layout
|  |- public/
|  `- .env.example
|
|- backend/
|  |- app/main.py                 # FastAPI app entry, middleware, routers
|  |- app/core/                   # settings and async mongo connection
|  |- app/routes/                 # auth, students, feedback, health
|  |- models/                     # domain documents (typed Pydantic models)
|  |- schemas/                    # API request/response schemas
|  |- database/                   # sync mongo helpers + index definitions
|  |- requirements.txt
|  `- .env.example
|
|- start.bat                      # convenience startup script
`- README.md
```

## Backend Analysis

### App Composition

FastAPI app bootstraps in backend/app/main.py and includes:

- CORS middleware using CORS_ORIGINS from env
- Startup DB readiness probe (ping + demo user seed)
- JWT auth with protected student and feedback routes
- Login and feedback rate limiting with slowapi
- Security headers middleware
- Routers: /health, /auth, /students, /feedback

### Implemented Endpoints

#### Health

- GET /health

#### Auth

- POST /auth/login
  - validates email/password against users collection
  - fallback to demo credentials from env
  - returns access_token, token_type, email, name, role

#### Students

- GET /students
- POST /students
- GET /students/profile/{email}
- PUT /students/profile/{email}
- DELETE /students/{student_id}

Notes:

- Student create also creates matching user login record
- Passwords are hashed before storage
- Profile includes photo, skills, tasks, internship metadata
- profilePhoto is stored as base64 data URL string
- Sensitive student and feedback routes require a Bearer token

#### Feedback

- GET /feedback/company?student_id=...
- POST /feedback/company
- GET /feedback/student?student_email=...
- POST /feedback/student

Notes:

- Student feedback supports section-based questionnaire payload
- Legacy fallback fields are still accepted
- Company feedback writes student status to completed
- Route has in-memory fallback if MongoDB becomes unavailable
- Company feedback POST is company-only; student feedback POST is student-only

### Data and Schema Layers

The backend currently has two parallel layers:

- Active route-level schema models under backend/app/routes
- Additional domain models and schemas under backend/models and backend/schemas for richer typed architecture and index planning

MongoDB index definitions exist in backend/database/indexes.py for users, students, companies, feedback, templates, and downloads.

## Frontend Analysis

### Routing and Roles

Routes are role-oriented:

- student/dashboard
- student/profile
- student/feedback
- student/downloads
- company/student-details
- company/feedback-form
- company/form-editor

Root layout provides responsive sidebar (desktop collapse + mobile drawer).

### Auth Flow

- Login calls POST /auth/login
- User and access token are persisted in localStorage
- Role mismatch is blocked on client side

Important credential detail:

- Frontend quick-fill company credential uses admin@internfeedback.com
- Backend default demo company credential in backend/.env.example is admin@internfeedback.com

If you rely on demo login, align these values.

### Student Area

- Dashboard loads profile + both feedback streams
- Profile supports editing, skills/tasks, and photo upload/removal
- Feedback page shows company feedback and submits section-based student feedback
- Downloads page builds PDF reports from backend data using jsPDF/html2canvas

### Company Area

- Student directory supports search, create student, and delete student
- Company feedback form supports full evaluation and reads student-submitted feedback
- Form editor allows customizable question fields for both form types
- Template definitions are saved in localStorage and reused by feedback pages

## Environment Variables

### Backend (backend/.env)

Start from backend/.env.example:

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
DEMO_STUDENT_EMAIL=student@example.com
DEMO_STUDENT_PASSWORD=123456
DEMO_COMPANY_EMAIL=admin@internfeedback.com
DEMO_COMPANY_PASSWORD=123456
```

### Frontend (frontend/.env)

Start from frontend/.env.example:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## Run Locally

### Option 1: Use start script (Windows)

From repository root:

```bat
start.bat
```

This script installs dependencies and opens separate terminals for backend and frontend servers.

### Option 2: Run manually

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

URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API docs: http://localhost:8000/docs

## Known Gaps and Next Improvements

- Move form templates from browser localStorage to backend persistence
- Add automated tests for auth, feedback validation, and student lifecycle
- Add token refresh if longer-lived sessions are needed

## License

Proprietary software owned by MoviCloud.
