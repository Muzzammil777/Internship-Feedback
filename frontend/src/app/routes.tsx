import { createHashRouter } from "react-router";
import Login from "./pages/Login";
import RootLayout from "./layouts/RootLayout";
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";
import StudentFeedback from "./pages/student/Feedback";
import StudentDownloads from "./pages/student/Downloads";
import CompanyStudentDetails from "./pages/company/StudentDetails";
import CompanyFeedbackForm from "./pages/company/FeedbackForm";
import CompanyFormEditor from "./pages/company/FormEditor";

export const router = createHashRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { path: "student/dashboard", Component: StudentDashboard },
      { path: "student/profile", Component: StudentProfile },
      { path: "student/feedback", Component: StudentFeedback },
      { path: "student/downloads", Component: StudentDownloads },
      { path: "company/student-details", Component: CompanyStudentDetails },
      { path: "company/feedback-form", Component: CompanyFeedbackForm },
      { path: "company/form-editor", Component: CompanyFormEditor },
    ],
  },
]);
