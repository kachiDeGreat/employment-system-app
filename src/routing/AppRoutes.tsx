import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import GraduateDashboardPage from "../pages/GraduateDashboardPage";
import EmployerDashboardPage from "../pages/EmployerDashboardPage";
import InstitutionDashboardPage from "../pages/InstitutionDashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import { UserRole } from "../types";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={[UserRole.Graduate]} />}>
        <Route path="/graduate-dashboard" element={<GraduateDashboardPage />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={[UserRole.Employer]} />}>
        <Route path="/employer-dashboard" element={<EmployerDashboardPage />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={[UserRole.Institution]} />}>
        <Route
          path="/institution-dashboard"
          element={<InstitutionDashboardPage />}
        />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
    