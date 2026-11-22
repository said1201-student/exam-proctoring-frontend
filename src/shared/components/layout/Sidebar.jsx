import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";

const menuItems = [
  { label: "Dashboard", to: "/dashboard", icon: "🏠" },
  { label: "Mitihani Yangu", to: "/exams", icon: "📝" },
  { label: "Matokeo", to: "/results", icon: "📊" },
  { label: "Mipangilio", to: "/settings", icon: "⚙️" },
];

export function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-ink-900 text-white",
          "flex flex-col transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-16 flex items-center gap-2 px-6 border-b border-white/10">
          <div className="h-9 w-9 rounded-md bg-brand-500 grid place-items-center font-semibold">
            E
          </div>
          <span className="font-semibold text-lg">ExamPro</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-brand-500 text-white"
                    : "text-ink-300 hover:bg-white/5 hover:text-white"
                )
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-full bg-brand-500 grid place-items-center text-sm font-semibold">
              SM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Saidi M.</p>
              <p className="text-xs text-ink-500 truncate">saidi@shule.ac.tz</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-ink-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/5 transition-colors"
          >
            🚪 Toka
          </button>
        </div>
      </aside>
    </>
  );
}