# MoviCloud Internship Feedback System Documentation

This document explains the current implementation of the project: what the frontend does, how the backend works, how MongoDB is used, and how data moves through the system from login to feedback submission and reporting.

## 1. Project Summary

MoviCloud Internship Feedback is a role-based internship management and evaluation system. It supports two primary user groups:

- Students, who can view their internship profile, review company feedback, submit feedback about the company, and download PDF reports.
- Company users, who can manage student records and submit performance feedback for students.

The current app is a full-stack implementation built with React on the frontend and FastAPI with MongoDB on the backend.

## 2. High-Level Architecture

The application is split into three main layers:

- Frontend: React + TypeScript + Vite, responsible for rendering the UI, managing auth session state, calling the backend API, and generating client-side PDFs.
- Backend: FastAPI, responsible for authentication, validation, access control, data persistence, and rate limiting.
- Database: MongoDB, used as the source of truth for users, students, and feedback records.

The app uses JWT-based authentication. The backend issues the token, and the frontend stores it in localStorage and sends it with API requests through a shared fetch helper.

## 3. Frontend Documentation

### 3.1 Frontend Stack

The frontend uses:

- React 18
- TypeScript
- Vite 6
- Tailwind CSS 4
- motion / Framer Motion for animation
- React Router for page routing
- Lucide icons
- shadcn-style UI primitives
- jsPDF and html2canvas for PDF generation

### 3.2 Frontend Structure

Important folders under `frontend/src/app`:

- `components/shared/`: reusable cross-page UI such as avatar, rating, skill chips, status cards, loading animation, and success animation
- `components/ui/`: low-level UI primitives such as button, input, dialog, select, slider, textarea, etc.
- `context/`: auth state and login logic
- `layouts/`: shared layout wrappers
- `pages/student/`: student-facing pages
- `pages/company/`: company-facing pages
- `lib/`: shared utilities such as authenticated API fetch helpers
- `routes.tsx`: router definitions and lazy loading wrappers

### 3.3 Frontend Authentication Flow

Authentication is handled in `frontend/src/app/context/AuthContext.tsx` and `frontend/src/app/lib/api.ts`.

Flow:

1. The user submits email and password on the login page.
2. The frontend calls `POST /auth/login`.
3. The backend returns a JWT access token and user details.
4. The frontend stores the user session in localStorage.
5. The shared `apiFetch` helper adds the Bearer token automatically to protected API requests.

If the selected role does not match the returned role, login is rejected on the client side.

### 3.4 Student Frontend Pages

#### Dashboard

The student dashboard fetches the student profile and related feedback records. It summarizes internship data and feedback status.

#### Profile

The profile page allows a student to update their personal and internship details:

- name
- email
- phone
- college and department
- role title
- internship dates
- supervisor information
- skills
- tasks
- profile photo upload/removal

The profile photo is handled as a base64 data URL and validated on both frontend and backend.

#### Feedback

The student feedback page shows the company feedback they received and lets them submit feedback about the company. It supports section-based questionnaires and legacy numeric fields.

#### Downloads

The downloads page generates PDF reports in the browser using `jsPDF` and `html2canvas`. It collects student profile data and feedback data, then produces downloadable reports.

### 3.5 Company Frontend Pages

#### Student Details

This page shows the company’s student list, supports search, student creation, and student deletion, and includes a form to create new student accounts.

#### Feedback Form

This is the main company feedback page. It supports:

- selecting a student
- viewing student-submitted feedback
- rating multiple categories
- adding text feedback
- choosing a hiring recommendation
- saving the feedback back to MongoDB

The page also supports form templates stored in browser localStorage. These templates let the company define extra fields for feedback forms without changing backend code.

#### Form Editor

The form editor allows company users to create and maintain reusable field templates for feedback forms.

### 3.6 Frontend UX Notes

The app uses shared loading and success animations so page transitions feel consistent. Recent loading states were consolidated into a shared loading component. The feedback page also uses top-centered toast-like error banners for submit errors.

## 4. Backend Documentation

### 4.1 Backend Stack

The backend uses:

- FastAPI
- Uvicorn
- Pydantic and pydantic-settings
- Motor for async MongoDB access
- passlib[bcrypt] for password hashing
- python-jose for JWT tokens
- slowapi for rate limiting

### 4.2 Backend Structure

Important folders under `backend/app`:

- `main.py`: application setup, middleware, routers, and startup hook
- `core/`: configuration, database bootstrapping, security helpers, and crypto helpers
- `routes/`: API endpoints for auth, students, feedback, and health

There are also higher-level data model and schema folders in the repository:

- `backend/models/`
- `backend/schemas/`
- `backend/database/`

The active runtime routes currently live under `backend/app/routes`.

### 4.3 Backend Middleware and Security

The backend applies:

- CORS configuration from environment settings
- JWT authentication for protected paths
- security headers on responses
- SlowAPI rate limiting

Protected URL prefixes include `/students` and `/feedback`.

### 4.4 Authentication

The auth route handles email/password login.

Authentication flow:

1. The frontend sends email and password to `POST /auth/login`.
2. The backend looks up the user in the `users` collection.
3. The backend verifies the password hash.
4. The backend issues a JWT access token.
5. The frontend stores and reuses the token for protected requests.

Demo credentials are supported through the configured environment values.

### 4.5 Student Routes

Student routes allow the company role and authenticated users to:

- list students
- create a student
- fetch a student profile by email
- update a student profile
- delete a student

Important behavior:

- Creating a student also creates a matching user login document.
- Passwords are hashed before storage.
- Profile photos are validated as JPEG or PNG base64 data URLs.
- Student records carry internship metadata and task lists.

### 4.6 Feedback Routes

The feedback routes support two directions:

- `POST /feedback/company`: company submits evaluation for a student
- `POST /feedback/student`: student submits feedback about the company

There are also listing endpoints:

- `GET /feedback/company`
- `GET /feedback/student`

Current route behavior:

- Company feedback updates the student status to `completed` when saved.
- Student feedback supports both section-based questionnaire payloads and a legacy fixed-field fallback.
- Both feedback routes validate the JSON body manually before processing it.
- If MongoDB is unavailable, the routes can fall back to in-memory storage during the current process.

### 4.7 Validation Rules

Company feedback validation includes:

- required student identity fields
- required feedback narrative fields
- required ratings map with values from 1 to 5
- strict string length limits

Student feedback validation includes:

- required student email and company name
- either section-based responses or the legacy numeric fields
- rating values constrained between 0 and 5 for the legacy model and 1 to 5 for section ratings

## 5. Database Documentation

### 5.1 MongoDB Collections Used by the Current App

The current implementation uses these collections actively:

- `users`
- `students`
- `company_feedback`
- `student_feedback`

The repository also contains additional database and schema scaffolding for richer domain modeling and indexes.

### 5.2 Collection Responsibilities

#### users

Stores login credentials and role information.

Typical data:

- email
- name
- role
- password hash
- optional student or company linkage fields

#### students

Stores student profile and internship metadata.

Typical data:

- name
- email
- role title
- college
- college department
- profile photo
- status
- supervisor
- internship dates
- skills
- tasks

#### company_feedback

Stores the company’s evaluation of a student.

Typical data:

- studentId
- studentEmail
- studentName
- role
- college
- projectTitle
- duration
- internship dates
- ratings map
- strengths
- improvements
- comments
- recommendation
- createdAt

#### student_feedback

Stores student feedback about the company.

Typical data:

- studentEmail
- studentName
- companyName
- sections or legacy numeric fields
- strengths
- improvements
- overallComments
- overallRating
- ratingCount
- createdAt

### 5.3 Database Behavior

The backend uses MongoDB as the source of truth. Some startup logic also seeds or repairs demo data and creates indexes where needed. If the database is not reachable, the app can temporarily fall back to in-memory storage for feedback routes within the current runtime.

### 5.4 Status Lifecycle

Student status moves through the following simple workflow:

- newly created student: `pending`
- after company feedback is saved: `completed`

The company feedback route is responsible for updating this status.

## 6. End-to-End Workflow

### 6.1 Login Workflow

1. User opens the app.
2. User logs in as student or company.
3. Backend validates credentials and returns JWT.
4. Frontend stores the session locally.
5. Protected pages use the token automatically.

### 6.2 Company Creates a Student

1. Company opens Student Details.
2. Company enters student data and submits.
3. Frontend sends the request to the backend.
4. Backend creates a student record and a matching user login record.
5. The student appears in the company list and in the backend database.

### 6.3 Company Submits Feedback

1. Company opens the feedback form.
2. The app loads the student list.
3. The company selects a student.
4. The form loads any student-submitted feedback.
5. The company fills in ratings, text fields, and recommendation.
6. The frontend validates required fields and submits JSON.
7. Backend validates the payload, saves the feedback, and marks the student as completed.
8. The UI shows success feedback.

### 6.4 Student Submits Feedback

1. Student opens the feedback page.
2. The app loads the student’s company feedback and company feedback history.
3. Student answers section-based or legacy feedback questions.
4. Frontend submits the response.
5. Backend validates and stores the submission.

### 6.5 Download Workflow

1. Student opens the downloads page.
2. Frontend collects profile and feedback data.
3. PDF libraries render the report client-side.
4. User downloads the generated file.

## 7. Environment and Configuration

### Backend Environment

Typical backend settings include:

- MongoDB URI and database name
- JWT secret and algorithm
- access token expiration
- CORS origins
- rate limits
- demo credentials

### Frontend Environment

The frontend primarily uses:

- `VITE_API_BASE_URL`

## 8. Run and Deployment Notes

### Local Development

- Use `start.bat` from the repository root on Windows.
- Or run backend and frontend separately.

### Backend

- Install Python dependencies from `backend/requirements.txt`
- Run with Uvicorn

### Frontend

- Install Node dependencies
- Run the Vite dev server

### Production Considerations

- Store secrets outside the repository.
- Use a real JWT secret in production.
- Persist templates in MongoDB if they need to survive browser resets.
- Add tests for auth, validation, and feedback workflows.

## 9. Current Strengths of the Project

- Clear separation between student and company flows
- JWT authentication and role-based route protection
- Async MongoDB access in the backend
- Client-side PDF generation for reports
- Shared UI primitives and loading states in the frontend

## 10. Current Gaps and Future Work

- Form templates still live in browser localStorage instead of MongoDB
- More automated tests would help prevent validation regressions
- Feedback analytics and reporting could be expanded
- A richer admin role would help with oversight and template management

## 11. Practical File Map

- `README.md`: short project overview and run instructions
- `PROJECT_DOCUMENTATION.md`: this detailed document
- `frontend/src/app/routes.tsx`: page routing
- `frontend/src/app/context/AuthContext.tsx`: login/session state
- `frontend/src/app/lib/api.ts`: authenticated fetch helper
- `frontend/src/app/pages/student/`: student workflows
- `frontend/src/app/pages/company/`: company workflows
- `backend/app/main.py`: FastAPI setup
- `backend/app/routes/auth.py`: login
- `backend/app/routes/students.py`: student records and profile management
- `backend/app/routes/feedback.py`: feedback submission and listing
- `backend/app/core/database.py`: MongoDB bootstrap and indexes
- `backend/app/core/security.py`: JWT and access control helpers
