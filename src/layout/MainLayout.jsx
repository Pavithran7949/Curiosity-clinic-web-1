import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const THEME_STORAGE_KEY = "workmanager-theme";
const SIDEBAR_STORAGE_KEY = "workmanager-sidebar-collapsed";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
}

function getInitialSidebarState() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "1";
}

export default function MainLayout({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(getInitialSidebarState);
  const isDarkMode = theme === "dark";
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarItems = [
    {
      id: "home",
      label: "Home",
      shortLabel: "HM",
      path: "/",
      isActive: location.pathname === "/",
    },
    {
      id: "tasks",
      label: "My Tasks",
      shortLabel: "TS",
      path: "/project/1",
      isActive: location.pathname.startsWith("/project"),
    },
  ];

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, isSidebarCollapsed ? "1" : "0");
  }, [isSidebarCollapsed]);

  return (
    <div data-theme={theme} className="theme-root h-screen w-screen flex theme-app">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarCollapsed ? "w-20" : "w-72"
        } sidebar-shell theme-sidebar border-r theme-border flex flex-col shrink-0 transition-all duration-300`}
      >
        <div
          className={`p-3 border-b theme-border flex items-center gap-2 ${
            isSidebarCollapsed ? "flex-col justify-center" : "justify-between"
          }`}
        >
          {isSidebarCollapsed ? (
            <div className="sidebar-brand-mark">CC</div>
          ) : (
            <div className="sidebar-brand">
              <span className="sidebar-brand-dot" />
              <span className="text-sm font-semibold">Curiosity Clinic</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsSidebarCollapsed((previous) => !previous)}
            className="sidebar-collapse-btn"
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isSidebarCollapsed ? ">" : "<"}
          </button>
        </div>

        <nav className="p-3 space-y-2 text-sm">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.path)}
              className={`sidebar-nav-item ${
                item.isActive ? "sidebar-nav-item-active" : ""
              } ${isSidebarCollapsed ? "justify-center px-2" : ""}`}
              title={item.label}
            >
              <span className={`sidebar-nav-icon ${item.isActive ? "sidebar-nav-icon-active" : ""}`}>
                {item.shortLabel}
              </span>
              {!isSidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Topbar */}
        <header className="h-14 border-b theme-border flex items-center justify-between px-6 gap-4">
          <input
            className="theme-input border theme-border px-4 py-1 rounded w-full max-w-md outline-none"
            placeholder="Search"
          />

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Theme</span>
            <button
              type="button"
              role="switch"
              aria-checked={!isDarkMode}
              aria-label="Toggle theme"
              onClick={() => setTheme(isDarkMode ? "light" : "dark")}
              className={`theme-switch ${!isDarkMode ? "theme-switch-on" : ""}`}
            >
              <span className="theme-switch-thumb" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
