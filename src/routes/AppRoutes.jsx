import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../modules/public/HomePage";
// ======================================================
// Layout Components
// These layouts provide a shared structure for pages.
// ======================================================
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// ======================================================
// Authentication Pages
// Pages accessible without logging in.
// ======================================================
import Login from "../modules/auth/pages/Login";
import Register from "../modules/auth/pages/Register";
import ForgotPassword from "../modules/auth/pages/ForgotPassword";
import PendingApproval from "../modules/auth/pages/PendingApproval";

// ======================================================
// Dashboard Pages
// Main pages for different user roles.
// ======================================================
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import TeacherDashboard from "../modules/teacher/pages/TeacherDashboard";
import StudentDashboard from "../modules/student/pages/StudentDashboard";
import ParentDashboard from "../modules/parent/pages/ParentDashboard";
import Attendence from "../modules/student/pages/Attendence";

// ======================================================
// Route Guards
// ProtectedRoute -> Ensures user is authenticated.
// RoleRoute      -> Ensures user has required role.
// ======================================================
import ProtectedRoute from "./ProtectedRoutes";
import RoleRoute from "./RolesRoutes";

/*
======================================================
Application Routing Configuration

Purpose:
- Centralizes all application routes.
- Implements:
  • Authentication routes
  • Protected routes
  • Role-based authorization
  • Shared layouts
  • Fallback routes

Routing Flow:

User
 ↓
AppRoutes
 ↓
ProtectedRoute
 ↓
DashboardLayout
 ↓
RoleRoute
 ↓
Requested Page

Examples:
------------------------------------------------------

/login
→ AuthLayout
→ Login Page

/admin/dashboard
→ ProtectedRoute
→ DashboardLayout
→ RoleRoute(["admin"])
→ AdminDashboard

/student/attendance
→ ProtectedRoute
→ DashboardLayout
→ RoleRoute(["student"])
→ Attendance Page

======================================================
*/

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<AuthLayout />}>
        {/* Login Page */}
        <Route path="/login" element={<Login />}/>
        {<Route path="/register" element={<Register />} />}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pending-approval" element={<PendingApproval />} />
      </Route>

      {/* ==================================================
          Protected Routes

          All routes inside this section require:
          1. User must be authenticated.
          2. User data must exist in Redux store.
      ================================================== */}
      <Route element={<ProtectedRoute />}>
        {/* ================================================
            Shared Dashboard Layout

            Provides:
            - Role-based Sidebar
            - Navbar
            - Scrollable content area
        ================================================ */}
        <Route element={<DashboardLayout />}>

          {/* ================================================
              Admin Routes

              Accessible only by users with:
              role = "admin"
          ================================================ */}
          <Route
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              />
            }
          >
            {/* Admin Dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminDashboard />
              }
            />

            {/* Future admin routes can be added here like
            <Route
              path="/admin/users"
              element={<AdminUsers />}
            />
            <Route
              path="/admin/reports"
              element={<AdminReports />}
            />
            */}
          </Route>

          {/* ================================================
              Teacher Routes

              Accessible only by users with:
              role = "teacher"
          ================================================ */}
          <Route
            element={
              <RoleRoute
                allowedRoles={[
                  "teacher",
                ]}
              />
            }
          >
            {/* Teacher Dashboard */}
            <Route
              path="/teacher/dashboard"
              element={
                <TeacherDashboard />
              }
            />
          </Route>

          {/* ================================================
              Student Routes

              Accessible only by users with:
              role = "student"
          ================================================ */}
          <Route
            element={
              <RoleRoute
                allowedRoles={[
                  "student",
                ]}
              />
            }
          >
            {/* Student Dashboard */}
            <Route
              path="/student/dashboard"
              element={
                <StudentDashboard />
              }
            />

            {/* Student Attendance Page */}
            <Route
              path="/student/attendance"
              element={
                <Attendence />
              }
            />
          </Route>

          {/* ================================================
              Parent Routes

              Accessible only by users with:
              role = "parent"
          ================================================ */}
          <Route
            element={
              <RoleRoute
                allowedRoles={[
                  "parent",
                ]}
              />
            }
          >
            {/* Parent Dashboard */}
            <Route
              path="/parent/dashboard"
              element={
                <ParentDashboard />
              }
            />
          </Route>
        </Route>
      </Route>

      {/* ==================================================
          Fallback Route

          Executes when:
          - URL does not match any route.
          - User manually enters an invalid URL.

          Redirects user to Login page.
      ================================================== */}
      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;