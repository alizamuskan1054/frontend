import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
 
} from "lucide-react";

function Sidebar({
  title = "School AI",
  subtitle = "Let AI Assist",
  logo,
  items = [],
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div
      className={`
        flex h-full flex-col
        rounded-r-3xl
        border-r border-white/10
        bg-gradient-to-b
        from-[#07112B]
        via-[#071B47]
        to-[#020617]
        text-white
        backdrop-blur-xl
        shadow-2xl
        transition-all duration-300
        ${collapsed ? "w-24" : "w-72"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        {!collapsed && (
          <div className="flex items-center gap-4">
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

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
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

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={({
                    isActive,
                  }) =>
                    `
                    group
                    relative
                    flex items-center gap-4
                    rounded-2xl
                    px-5 py-4
                    transition-all duration-300
                    overflow-hidden
                    ${
                      isActive
                        ? `
                          bg-gradient-to-r
                          from-[#5B5CF6]
                          via-[#7C3AED]
                          to-[#D946EF]
                          shadow-lg
                          shadow-violet-500/30
                          text-white
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

                      <Icon
                        size={22}
                        className="shrink-0"
                      />

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
      {/* Mobile Toggle */}
      <button
        onClick={() =>
          setMobileOpen(true)
        }
        className="
          fixed left-5 top-5
          z-50
          rounded-xl
          bg-brand-primary p-3
          text-white
          shadow-lg
          lg:hidden
        "
      >
        <Menu size={22} />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="
              fixed inset-0 z-40
              bg-black/60
              backdrop-blur-sm
              lg:hidden
            "
            onClick={() =>
              setMobileOpen(false)
            }
          />

          <div
            className="
              fixed left-0 top-0
              z-50
              h-screen
              lg:hidden
            "
          >
            <button
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                absolute right-5 top-5
                rounded-xl
                bg-white/10 p-2
                text-white
              "
            >
              <X size={22} />
            </button>

            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;