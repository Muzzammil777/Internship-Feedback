import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminUserManagement from './pages/AdminUserManagement';
import TemplateGallery from './pages/TemplateGallery';
import AdminReports from './pages/AdminReports';

import FacultyDashboard from './pages/FacultyDashboard';
import FacultyFormBuilder from './pages/FacultyFormBuilder';
import FacultyStudentManagement from './pages/FacultyStudentManagement';
import FacultyEvaluation from './pages/FacultyEvaluation';
import FacultyVerification from './pages/FacultyVerification';

import CompanyFeedback from './pages/CompanyFeedback';
import CompanyConfirmation from './pages/CompanyConfirmation';

import StudentDashboard from './pages/StudentDashboard';
import StudentFeedback from './pages/StudentFeedback';
import StudentApproval from './pages/StudentApproval';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes wrapped in Dashboard Layout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          
          {/* Admin Routes */}
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/users" element={<AdminUserManagement />} />
          <Route path="admin/templates" element={<TemplateGallery />} />
          <Route path="admin/reports" element={<AdminReports />} />

          {/* Faculty Routes */}
          <Route path="faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="faculty/form-builder" element={<FacultyFormBuilder />} />
          <Route path="faculty/students" element={<FacultyStudentManagement />} />
          <Route path="faculty/evaluation" element={<FacultyEvaluation />} />
          <Route path="faculty/verification" element={<FacultyVerification />} />

          {/* Company Routes */}
          <Route path="company/feedback-form" element={<CompanyFeedback />} />
          <Route path="company/confirmation" element={<CompanyConfirmation />} />

          {/* Student Routes */}
          <Route path="student/dashboard" element={<StudentDashboard />} />
          <Route path="student/approval" element={<StudentApproval />} />
          <Route path="student/feedback" element={<StudentFeedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
