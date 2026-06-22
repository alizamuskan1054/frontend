import {
  ChevronRight,
} from "lucide-react";

/*
======================================================
Reusable Page Header Component

Purpose:
- Displays page title and subtitle.
- Shows breadcrumb navigation.
- Provides a section for page actions
  (buttons, filters, search bars, etc.).
- Used at the top of dashboard pages.

Props:
- title        : Main page heading
- subtitle     : Additional description text
- breadcrumbs  : Array of breadcrumb items
- action       : JSX displayed on the right side
- className    : Additional custom classes

Examples:

1. Basic Usage
------------------------------------------------------
<PageHeader
  title="Dashboard"
  subtitle="Welcome back, Fazail"
/>

------------------------------------------------------

2. With Breadcrumbs
------------------------------------------------------
<PageHeader
  title="Attendance"
  subtitle="Manage student attendance"
  breadcrumbs={[
    "Dashboard",
    "Students",
    "Attendance",
  ]}
/>

------------------------------------------------------

3. With Action Button
------------------------------------------------------
<PageHeader
  title="Students"
  subtitle="Manage all students"
  action={
    <Button>
      Add Student
    </Button>
  }
/>

------------------------------------------------------

4. Complete Example
------------------------------------------------------
<PageHeader
  title="Assignments"
  subtitle="Create and manage assignments"
  breadcrumbs={[
    "Dashboard",
    "Teacher",
    "Assignments",
  ]}
  action={
    <Button>
      Create Assignment
    </Button>
  }
/>

Features:
- Responsive layout
- Breadcrumb navigation
- Optional subtitle
- Custom action section
- Custom styling support
======================================================
*/

function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  action,
  className = "",
}) {
  return (
    /*
    ======================================================
    Main Header Container
    Responsive layout with title section
    and optional action section
    ======================================================
    */
    <div
      className={`
        flex
        flex-col
        gap-4
        rounded-card
        border
        border-slate-200
        bg-gradient-to-r
        from-white
        via-slate-50
        to-blue-50
        p-6
        shadow-soft

        md:flex-row
        md:items-center
        md:justify-between

        ${className}
      `}
    >
      {/* ==================================================
          Left Section
          Breadcrumbs, Title, and Subtitle
      ================================================== */}
      <div>
        {/* Breadcrumb Navigation */}
        {breadcrumbs.length > 0 && (
          <div
            className="
              mb-3
              flex
              flex-wrap
              items-center
              gap-2
              text-sm
              text-text-secondary
            "
          >
            {breadcrumbs.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  {/* Breadcrumb Item */}
                  <span>
                    {item}
                  </span>

                  {/* Separator Icon */}
                  {index !==
                    breadcrumbs.length - 1 && (
                    <ChevronRight
                      size={14}
                    />
                  )}
                </div>
              )
            )}
          </div>
        )}

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-text-primary">
          {title}
        </h1>

        {/* Page Subtitle */}
        {subtitle && (
          <p className="mt-2 text-text-secondary">
            {subtitle}
          </p>
        )}
      </div>

      {/* ==================================================
          Right Section
          Usually contains buttons, filters,
          search bars, or other actions
      ================================================== */}
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
}

export default PageHeader;