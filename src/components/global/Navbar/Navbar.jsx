import React, { useState } from 'react';
import { Menu, Bell, LogOut, ChevronDown } from 'lucide-react';
import SearchBar from '../SearchBar';
import Badge from '../../ui/Badge';

/**
 * NAVBAR
 *
 * The top bar that sits above every page in a dashboard (Admin/Teacher).
 * Rendered once inside your layout, not on every individual page.
 *
 * Params you can pass:
 *  - logo: what to show on the left, e.g. "Edupulse" (text or your own element)
 *  - onMenuClick: function — runs when the hamburger icon is clicked
 *    (use this to open/close the sidebar on mobile). If you don't pass
 *    this, the menu icon won't show at all.
 *  - search: an object { value, onChange, onSearch } — if you pass this,
 *    a SearchBar shows in the middle. Leave it out to hide search entirely.
 *  - notificationCount: number → shows a small badge on the bell icon
 *    if greater than 0 (e.g. unread notifications). Leave out or 0 to hide it.
 *  - onNotificationClick: function — runs when the bell icon is clicked
 *  - userName: the logged-in user's name, e.g. "Ali Khan"
 *  - userRole: shown under the name, e.g. "Admin" or "Teacher"
 *  - onLogout: function — runs when "Logout" is clicked in the profile dropdown
 *  - tone: role color → "brand" | "admin" | "teacher" | "student" | "parent"
 *
 * Example:
 *   <Navbar
 *     logo="Edupulse"
 *     tone="admin"
 *     onMenuClick={() => setSidebarOpen(true)}
 *     search={{ value: query, onChange: (e) => setQuery(e.target.value), onSearch: doSearch }}
 *     notificationCount={3}
 *     onNotificationClick={() => navigate('/notifications')}
 *     userName="Ali Khan"
 *     userRole="Admin"
 *     onLogout={handleLogout}
 *   />
 */

function Navbar({
  logo,
  onMenuClick,
  search,
  notificationCount = 0,
  onNotificationClick,
  userName,
  userRole,
  onLogout,
  tone = 'brand',
}) {
  // Controls whether the small profile dropdown (with Logout) is open.
  // This is just open/close UI state — it doesn't touch any real
  // logout logic itself, that's what onLogout is for.
  const [profileOpen, setProfileOpen] = useState(false);

  const initials = userName
    ? userName
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-surface-muted bg-surface px-4">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-input p-2 text-text-secondary hover:bg-surface-dim"
          >
            <Menu size={20} />
          </button>
        )}
        {logo && <span className="text-lg font-semibold text-text-primary">{logo}</span>}
      </div>

      {search && (
        <div className="hidden flex-1 max-w-md md:block">
          <SearchBar tone={tone} {...search} />
        </div>
      )}

      <div className="flex items-center gap-4">
        {onNotificationClick && (
          <button
            type="button"
            onClick={onNotificationClick}
            className="relative rounded-input p-2 text-text-secondary hover:bg-surface-dim"
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1">
                <Badge color="danger">{notificationCount}</Badge>
              </span>
            )}
          </button>
        )}

        {userName && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              className="flex items-center gap-2 rounded-input p-1.5 hover:bg-surface-dim"
            >
              <span className="flex h-icon-lg w-icon-lg items-center justify-center rounded-full bg-brand-light text-sm font-semibold text-brand-text">
                {initials}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-medium text-text-primary">{userName}</span>
                {userRole && (
                  <span className="block text-xs text-text-secondary">{userRole}</span>
                )}
              </span>
              <ChevronDown size={16} className="hidden text-text-muted sm:block" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-card border border-surface-muted bg-surface py-1 shadow-dropdown">
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-text-primary hover:bg-surface-dim"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;