<div align="center">

<img src="frontend/public/favicon.png" alt="MoviCloud Logo" width="80" height="80" />

# MoviCloud — Internship Feedback System

**A full-stack platform for managing internship evaluations between companies and students.**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## 📋 Overview

The **MoviCloud Internship Feedback System** is a role-based web application that streamlines the internship evaluation process. Companies can assess student interns across multiple performance metrics, while students can review their evaluations and share feedback about their internship experience — all in one centralized platform.

---

## ✨ Features

### 🎓 Student Portal
| Feature | Description |
|---|---|
| **Dashboard** | Overview of internship progress, key stats, and timeline |
| **Feedback Viewer** | Read company evaluations with detailed rating breakdowns |
| **Feedback Submission** | Rate and review the internship experience (mentorship, environment, etc.) |
| **Profile** | View personal details, university info, skills, tasks, and internship timeline |
| **Downloads** | Download feedback reports, certificates, and analysis PDFs |

### 🏢 Company Portal
| Feature | Description |
|---|---|
| **Student Directory** | Browse all interns, search/filter, and view detailed student profiles |
| **Feedback Form** | Evaluate students across 8 performance metrics with sliders and written comments |
| **Form Editor** | Customize both feedback form templates (Company→Student and Student→Company) |
| **Add Student** | Create student accounts with login credentials directly from the dashboard |

---

## 🏗️ Architecture

```
MoviCloud Internship Feedback
├── frontend/          # React + Vite SPA
└── backend/           # FastAPI REST API  (planned)
```

### Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 + TypeScript | UI framework |
| **Build Tool** | Vite 6 | Dev server & bundler |
| **Styling** | Tailwind CSS v4 | Utility-first CSS |
| **UI Components** | Radix UI / shadcn | Accessible component primitives |
| **Animations** | Framer Motion (motion) | Page & micro-animations |
| **Icons** | Lucide React | Icon library |
| **Routing** | React Router v7 | Client-side routing |
| **Charts** | Recharts | Data visualization |
| **Backend** | FastAPI (Python) | REST API & auth |
| **Database** | MongoDB | Document store for users, feedback, forms |

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── favicon.png              # MoviCloud company logo
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── shared/          # Reusable components
│   │   │   │   ├── Logo.tsx
│   │   │   │   ├── RatingBar.tsx
│   │   │   │   ├── StarRating.tsx
│   │   │   │   ├── SkillTag.tsx
│   │   │   │   └── StudentAvatar.tsx
│   │   │   └── ui/              # shadcn/Radix UI primitives
│   │   ├── context/
│   │   │   └── AuthContext.tsx  # Role-based auth state
│   │   ├── layouts/
│   │   │   └── RootLayout.tsx   # Sidebar navigation shell
│   │   ├── pages/
│   │   │   ├── Login.tsx        # Shared login page
│   │   │   ├── student/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Profile.tsx
│   │   │   │   ├── Feedback.tsx
│   │   │   │   └── Downloads.tsx
│   │   │   └── company/
│   │   │       ├── StudentDetails.tsx
│   │   │       ├── FeedbackForm.tsx
│   │   │       └── FormEditor.tsx
│   │   ├── routes.tsx           # React Router config
│   │   └── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔐 Authentication & Roles

The system uses **role-based access control** with two roles:

| Role | Demo Credentials | Redirects to |
|---|---|---|
| **Student** | `student@example.com` / `123456` | `/student/dashboard` |
| **Company** | `admin@example.com` / `123456` | `/company/student-details` |

> **Note:** Authentication currently uses a mock `AuthContext`. Backend integration with FastAPI + JWT will replace this.

---

## 🔌 API Design (Planned — FastAPI + MongoDB)

```
POST   /auth/login                    # Login, returns JWT
GET    /students                      # List all students (company only)
POST   /students                      # Create student account
GET    /students/{id}                 # Get student details
GET    /feedback/{student_id}         # Get feedback for a student
POST   /feedback/{student_id}         # Submit company feedback
GET    /feedback/student/{id}/mine    # Student views own evaluations
POST   /feedback/student/{id}/submit  # Student submits company review
GET    /forms/templates               # Get feedback form templates
PUT    /forms/templates/{type}        # Update a form template
GET    /downloads/{student_id}        # List downloadable documents
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=18`
- npm or pnpm
- Python `>=3.10` (for backend)
- MongoDB Atlas account or local MongoDB instance

---

### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

### Backend Setup *(FastAPI)*

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret

# Run the development server
uvicorn main:app --reload
```

The API will be available at **http://localhost:8000**
Interactive API docs: **http://localhost:8000/docs**

---

### Environment Variables

```env
# .env (backend)
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/internship_feedback
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## 🗃️ Database Schema (MongoDB)

### `users` collection
```json
{
  "_id": "ObjectId",
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "password_hash": "...",
  "role": "student | company",
  "university": "State University",
  "department": "Engineering - Frontend",
  "skills": ["React", "TypeScript"],
  "created_at": "ISODate"
}
```

### `feedback` collection
```json
{
  "_id": "ObjectId",
  "student_id": "ObjectId",
  "company_id": "ObjectId",
  "type": "company_to_student | student_to_company",
  "ratings": {
    "technical": 5,
    "quality": 4,
    "communication": 4,
    "teamwork": 5
  },
  "overall_rating": 5,
  "strengths": "...",
  "improvements": "...",
  "comments": "...",
  "recommendation": "Highly Recommended",
  "submitted_at": "ISODate"
}
```

### `form_templates` collection
```json
{
  "_id": "ObjectId",
  "type": "company_to_student | student_to_company",
  "fields": [
    { "id": "1", "label": "Technical Skills", "type": "slider", "required": true }
  ],
  "updated_at": "ISODate"
}
```

---

## 📦 Frontend Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | 18.3.1 | Core UI library |
| `react-router` | 7.13.0 | Client-side routing |
| `motion` | 12.23 | Animations |
| `lucide-react` | 0.487 | Icons |
| `tailwindcss` | 4.1.12 | Styling |
| `@radix-ui/*` | various | Accessible UI primitives |
| `recharts` | 2.15 | Charts & data viz |
| `react-hook-form` | 7.55 | Form management |
| `sonner` | 2.0 | Toast notifications |
| `class-variance-authority` | 0.7 | Component variants |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is proprietary software owned by **MoviCloud**. All rights reserved.

---

<div align="center">
  <sub>Built with ❤️ by the MoviCloud Team</sub>
</div>
