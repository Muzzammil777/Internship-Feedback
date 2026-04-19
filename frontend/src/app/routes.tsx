import { Suspense, lazy } from "react";
import type { ReactNode } from "react";
import { createHashRouter } from "react-router";

const Login = lazy(() => import("./pages/Login"));
const RootLayout = lazy(() => import("./layouts/RootLayout"));
const StudentDashboard = lazy(() => import("./pages/student/Dashboard"));
const StudentProfile = lazy(() => import("./pages/student/Profile"));
const StudentFeedback = lazy(() => import("./pages/student/Feedback"));
const StudentDownloads = lazy(() => import("./pages/student/Downloads"));
const CompanyStudentDetails = lazy(() => import("./pages/company/StudentDetails"));
const CompanyFeedbackForm = lazy(() => import("./pages/company/FeedbackForm"));
const CompanyFormEditor = lazy(() => import("./pages/company/FormEditor"));

const RouteLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-sm">
    Loading...
  </div>
);

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<RouteLoader />}>{element}</Suspense>
);

export const router = createHashRouter([
  {
    path: "/",
    element: withSuspense(<Login />),
  },
  {
    path: "/",
    element: withSuspense(<RootLayout />),
    children: [
      { path: "student/dashboard", element: withSuspense(<StudentDashboard />) },
      { path: "student/profile", element: withSuspense(<StudentProfile />) },
      { path: "student/feedback", element: withSuspense(<StudentFeedback />) },
      { path: "student/downloads", element: withSuspense(<StudentDownloads />) },
      { path: "company/student-details", element: withSuspense(<CompanyStudentDetails />) },
      { path: "company/feedback-form", element: withSuspense(<CompanyFeedbackForm />) },
      { path: "company/form-editor", element: withSuspense(<CompanyFormEditor />) },
    ],
  },
]);
