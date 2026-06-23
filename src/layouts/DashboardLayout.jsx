import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Navbar, Sidebar } from '../components';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';



import {
  adminRoutes,
  teacherRoutes,
  studentRoutes,
  parentRoutes,
} from "../utils/dashboardRoutes";

/*
======================================================
Dashboard Layout Component

Purpose:
- Provides a shared layout for all authenticated
  dashboard pages.
- Displays:
  • Role-based Sidebar
  • Top Navigation Bar
  • Scrollable Page Content Area
- Prevents layout duplication across modules.

Used By:
- Admin Dashboard Pages
- Teacher Dashboard Pages
- Student Dashboard Pages
- Parent Dashboard Pages

Route Structure Example:

<Route element={<ProtectedRoute />}>
  <Route element={<DashboardLayout />}>
    <Route
      path="/admin/dashboard"
      element={<AdminDashboard />}
    />
  </Route>
</Route>

Layout Structure:

-------------------------------------------------------
| Sidebar |                Navbar                     |
|         |-------------------------------------------|
|         |                                           |
|         |             Page Content                  |
|         |             (<Outlet />)                  |
|         |                                           |
-------------------------------------------------------

Features:
- Role-based navigation menu
- Persistent sidebar and navbar
- Independent page content scrolling
- Responsive layout support
- Shared dashboard shell for all user roles
======================================================
*/

function DashboardLayout() {
  /*
  ======================================================
  Get logged-in user from Redux store

  Example:
  {
    id: 1,
    full_name: "Ahmed Khan",
    role: "admin"
  }
  ======================================================
  */
 const [searchQuery, setSearchQuery] = useState('');
  const user = useSelector(
    (state) => state.auth.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate('/login');
}
  /*
  ======================================================
  Map each user role to its corresponding
  sidebar navigation items
  ======================================================
  */
  const routesMap = {
    admin: adminRoutes,
    teacher: teacherRoutes,
    student: studentRoutes,
    parent: parentRoutes,
  };

  /*
  ======================================================
  Determine sidebar items based on logged-in user's role

  Examples:
  admin   -> adminRoutes
  teacher -> teacherRoutes
  student -> studentRoutes
  parent  -> parentRoutes

  Fallback:
  If no role exists, use an empty array.
  ======================================================
  */
  const sidebarItems =
    routesMap[user?.role] || [];

  return (
    /*
    ======================================================
    Main Dashboard Wrapper

    Classes:
    - flex            : Creates sidebar and content columns
    - h-screen        : Full viewport height
    - overflow-hidden : Prevents page-level scrolling
    - bg-surface-dim  : Dashboard background color

    Only the main content section scrolls.
    ======================================================
    */
    <div className="flex h-screen overflow-hidden bg-surface-dim">
      {/* ==================================================
          Sidebar

          Shared navigation component that changes
          dynamically according to user role.

          Example:
          Admin   -> User Management, Fees, Events
          Teacher -> Attendance, Assignments
          Student -> Report Card, Fees
          Parent  -> Children, Grades
      ================================================== */}
      <Sidebar
        title="School AI"
        subtitle="Personalized Assistant"
        logo="🎓"
        items={sidebarItems}
      />

      {/* ==================================================
          Right Content Section

          Contains:
          1. Navbar
          2. Scrollable page content
      ================================================== */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* ================================================
            Top Navigation Bar

            Stays visible while page content changes.
        ================================================ */}
        <Navbar
        userName={user?.full_name}
        userRole={user?.role}
        tone={user?.role || 'brand'}
        onLogout={handleLogout}
      //    logo="School AI"
      //   notificationCount={3}
      //   onNotificationClick={() => navigate('/notifications')}
      //   search={{
      //   value: searchQuery,
      //   onChange: (e) => setSearchQuery(e.target.value),
      //   onSearch: (val) => console.log('search:', val),
      // }}
      />

        {/* ================================================
            Main Page Content Area

            Classes:
            - flex-1          : Occupies remaining height
            - overflow-y-auto : Enables vertical scrolling
            - p-6             : Consistent page spacing

            React Router renders the matched nested route
            inside <Outlet />.

            Examples:
            /admin/dashboard       -> <AdminDashboard />
            /teacher/attendance    -> <Attendance />
            /student/report-card   -> <ReportCard />
            /parent/fees           -> <Fees />
        ================================================ */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;