import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

/*
======================================================
Reusable Sidebar Component

Purpose:
- Displays role-based navigation links.
- Supports desktop and mobile layouts.
- Allows collapsing and expanding on desktop.
- Provides a slide-in sidebar on mobile devices.
- Automatically highlights the active route.

Props:
- title     : Sidebar heading text
- subtitle  : Small description below title
- logo      : Logo or icon displayed in header
- items     : Array of navigation items

Navigation Item Structure:
{
  label: "Dashboard",
  path: "/admin/dashboard",
  icon: LayoutDashboard
}

Features:
- Collapsible desktop sidebar
- Mobile drawer sidebar
- Active route highlighting
- Hidden scrollbar with scrolling support
- Responsive design
======================================================
*/

function Sidebar({
  title = "School AI",
  subtitle = "Let AI Assist",
  logo,
  items = [],
}) {
  /*
  ======================================================
  Local State
  - collapsed : Controls desktop sidebar width
  - mobileOpen: Controls mobile sidebar visibility
  ======================================================
  */
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /*
  ======================================================
  Shared Sidebar Content
  Reused by both desktop and mobile sidebars
  ======================================================
  */
  const sidebarContent = (
    <div
      className="
        flex h-screen flex-col
        rounded-r-3xl
        border-r border-white/10
        bg-gradient-to-b
        from-[#07112B]
        via-[#071B47]
        to-[#020617]
        text-white
        backdrop-blur-xl
        shadow-2xl
      "
    >
      {/* ==================================================
          Sidebar Header
          Displays logo, title, subtitle,
          and collapse button
      ================================================== */}
      <div className="flex items-center justify-between p-6">
        {!collapsed && (
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div
              className="
                flex h-14 w-14 items-center justify-center
                rounded-full
                bg-gradient-to-br
                from-brand-primary
                to-parent-primary
                shadow-lg shadow-brand-primary/30
              "
            >
              {logo}
            </div>

            {/* Title & Subtitle */}
            <div>
              <h2 className="text-2xl font-bold">
                {title}
              </h2>

              <p className="text-sm text-slate-300">
                {subtitle}
              </p>
            </div>
          </div>
        )}

        {/* Collapse / Expand Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            hidden rounded-xl
            bg-white/10 p-2
            transition
            hover:bg-white/20
            lg:block
          "
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* ==================================================
          Navigation Links
          Scrollable area containing menu items
      ================================================== */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide">
        <ul className="space-y-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                {/* Navigation Link */}
                <NavLink
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `
                    group relative flex items-center gap-4
                    overflow-hidden rounded-2xl
                    px-5 py-4
                    transition-all duration-300
                    ${
                      isActive
                        ? `
                          bg-gradient-to-r
                          from-[#5B5CF6]
                          via-[#7C3AED]
                          to-[#D946EF]
                          text-white
                          shadow-lg shadow-violet-500/30
                        `
                        : `
                          text-slate-300
                          hover:bg-white/10
                          hover:text-white
                        `
                    }
                  `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Left indicator shown on hover */}
                      {!isActive && (
                        <span
                          className="
                            absolute left-0 top-0
                            h-full w-1
                            rounded-r-full
                            bg-violet-500
                            opacity-0
                            transition-all
                            group-hover:opacity-100
                          "
                        />
                      )}

                      {/* Navigation Icon */}
                      <Icon
                        size={22}
                        className="shrink-0"
                      />

                      {/* Navigation Label */}
                      {!collapsed && (
                        <span className="font-medium">
                          {item.label}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* ==================================================
          Mobile Menu Button
          Visible only on small screens
      ================================================== */}
      <button
        onClick={() => setMobileOpen(true)}
        className="
          fixed left-5 top-5 z-50
          rounded-xl
          bg-brand-primary p-3
          text-white
          shadow-lg
          lg:hidden
        "
      >
        <Menu size={22} />
      </button>

      {/* ==================================================
          Desktop Sidebar
          Fixed sidebar shown on large screens
      ================================================== */}
      <aside
        className={`
          hidden lg:block
          sticky top-0
          h-screen
          shrink-0
          overflow-hidden
          transition-all duration-300
          ${collapsed ? "w-24" : "w-72"}
        `}
      >
        {sidebarContent}
      </aside>

      {/* ==================================================
          Mobile Sidebar
          Slide-in drawer shown on small screens
      ================================================== */}
      {mobileOpen && (
        <>
          {/* Dark Backdrop */}
          <div
            className="
              fixed inset-0 z-40
              bg-black/60
              backdrop-blur-sm
              lg:hidden
            "
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div
            className="
              fixed left-0 top-0
              z-50 h-screen
              lg:hidden
            "
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="
                absolute right-5 top-5
                rounded-xl
                bg-white/10 p-2
                text-white
              "
            >
              <X size={22} />
            </button>

            {/* Sidebar Width Container */}
            <div
              className={`
                h-screen
                transition-all duration-300
                ${collapsed ? "w-24" : "w-72"}
              `}
            >
              {sidebarContent}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;