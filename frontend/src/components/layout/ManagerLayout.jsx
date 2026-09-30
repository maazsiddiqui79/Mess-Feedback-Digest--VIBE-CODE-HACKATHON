import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut, Utensils, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { name: 'Dashboard', path: '/manager',          icon: LayoutDashboard, exact: true },
  { name: 'Reports',   path: '/manager/reports',  icon: FileText },
  { name: 'Menu',      path: '/manager/menu',     icon: Utensils },
];

export default function ManagerLayout() {
  const { user, logout } = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();

  const navItems = (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN')
    ? [...NAV, { name: 'Admin Control', path: '/admin', icon: ShieldAlert }]
    : NAV;

  const handleLogout = async () => { await logout(); navigate('/login'); };

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <aside className="w-[220px] shrink-0 flex flex-col h-full bg-surface border-r border-border">
        <div className="px-5 pt-6 pb-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-[0_0_12px_rgba(88,166,255,0.3)]">
              <Utensils className="w-4 h-4 text-[#0d1117]" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary font-display leading-none">MessMind</p>
              <p className="text-[10px] text-muted mt-0.5 uppercase tracking-widest">Manager</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const active = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  active ? 'nav-active' : 'nav-idle'
                }`}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                <span>{item.name}</span>
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent animate-pulse2" />}
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
      </aside>

      <main className="flex-1 h-full overflow-y-auto bg-bg">
        <div className="w-full h-full p-6 md:p-8 animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
