import { Link, useLocation } from "react-router-dom";
import { XMarkIcon, HomeIcon, UserIcon } from "./Icons";

export default function Sidebar({ open, onClose }) {
  const { pathname } = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <HomeIcon className="w-5 h-5" /> },
    { to: "/profile", label: "Profile", icon: <UserIcon className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-50 w-64 h-[calc(100vh-4rem)] border-r bg-white p-4 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:top-16 lg:translate-x-0 lg:h-[calc(100vh-4rem)]`}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between mb-8">
          <span className="text-xl font-bold">Dashboard</span>
          {/* X icon only on mobile */}
          <button
            className="lg:hidden p-1 rounded hover:bg-gray-100"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition
                  ${active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto text-xs text-gray-400 absolute bottom-4 left-4">&copy; {new Date().getFullYear()} Ritik</div>
      </aside>
    </>
  );
}