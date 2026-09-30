import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShieldAlert, Users, PlusCircle, LogOut, FileText, Utensils, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { name: 'User Management', path: '/admin', icon: Users, exact: true },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => { await logout(); navigate('/login'); };

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const sidebarContent = (
    <>
      <div className="px-5 pt-6 pb-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-danger flex items-center justify-center shadow-[0_0_12px_rgba(248,81,73,0.3)]">
              <ShieldAlert className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary font-display leading-none">MessMind</p>
              <p className="text-[10px] text-muted mt-0.5 uppercase tracking-widest">Admin Control</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-2 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(item => {
          const active = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active ? 'bg-danger/10 text-danger' : 'nav-idle'
              }`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              <span>{item.name}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-danger animate-pulse2" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-secondary hover:bg-danger/10 hover:text-danger transition-all duration-150"
        >
          <LogOut className="w-[18px] h-[18px]" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-40 lg:hidden bg-surface border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-danger flex items-center justify-center shadow-[0_0_12px_rgba(248,81,73,0.3)]">
              <ShieldAlert className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-primary font-display">MessMind</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-2 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Backdrop overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px] flex flex-col bg-surface border-r border-border
          transform transition-transform duration-300 ease-in-out
          lg:static lg:w-[220px] lg:shrink-0 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {sidebarContent}
      </aside>

      {/* Main */}
      <main className="flex-1 h-full overflow-y-auto bg-bg">
        <div className="w-full h-full p-4 pt-[70px] sm:p-5 sm:pt-[70px] lg:p-6 lg:pt-6 xl:p-8 xl:pt-8 animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
