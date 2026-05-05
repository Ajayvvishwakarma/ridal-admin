import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  CalendarCheck,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { path: "/admin/services", label: "Services", icon: <Wrench size={20} /> },
  { path: "/admin/bookings", label: "Bookings", icon: <CalendarCheck size={20} /> },
  { path: "/admin/blog", label: "Blog", icon: <BookOpen size={20} /> },
  { path: "/admin/customers", label: "Customers", icon: <Users size={20} /> },
  { path: "/admin/settings", label: "Settings", icon: <Settings size={20} /> },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#151515] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#e8b84b] rounded-lg flex items-center justify-center">
              <Wrench size={18} className="text-black" />
            </div>
            <div>
              <div className="text-white font-black text-lg leading-none">GARIX</div>
              <div className="text-gray-500 text-xs">Admin Panel</div>
            </div>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="text-gray-600 text-xs font-bold uppercase tracking-widest px-3 mb-3">Main Menu</div>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isActive(item.path)
                  ? "bg-[#e8b84b] text-black"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
              {item.label === "Bookings" && (
                <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-4 py-4 border-t border-white/5 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <ExternalLink size={20} />
            View Website
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("adminAuth");
              navigate("/admin/login");
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-base font-black text-[#151515]">
                {navItems.find((n) => isActive(n.path))?.label ?? "Admin"}
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                Welcome back, Admin! Today is Tuesday, May 5, 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition"
              >
                <div className="w-7 h-7 bg-[#e8b84b] rounded-full flex items-center justify-center text-black font-black text-xs">
                  AD
                </div>
                <span className="text-sm font-semibold text-[#151515] hidden sm:block">Admin</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-10">
                  <Link to="/admin/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#151515]" onClick={() => setUserMenuOpen(false)}>
                    <Settings size={15} /> Settings
                  </Link>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50" onClick={() => { localStorage.removeItem("adminAuth"); setUserMenuOpen(false); navigate("/admin/login"); }}>
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
