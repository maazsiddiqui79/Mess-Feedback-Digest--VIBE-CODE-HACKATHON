import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, Users, User, LogOut, Utensils, Network } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { name: 'Feedback',        path: '/student',           icon: MessageSquare, exact: true },
  { name: 'Community',       path: '/student/community', icon: Users },
  { name: 'My Profile',      path: '/student/profile',   icon: User },
  { name: 'Student Network', path: '/student/profiles',  icon: Network },
];

export default function StudentLayout() {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();

  const handleLogout = async () => { await logout(); navigate('/login'); };

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      {/* Sidebar */}
      <aside className="w-[220px] shrink-0 flex flex-col h-full bg-surface border-r border-border">
        {/* Logo */}
        <div className="px-5 pt-6 pb-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-[0_0_12px_rgba(88,166,255,0.3)]">
              <Utensils className="w-4 h-4 text-[#0d1117]" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary font-display leading-none">MessMind</p>
              <p className="text-[10px] text-muted mt-0.5 uppercase tracking-widest">Student</p>
            </div>
          </div>
        </div>

        {/* Nav */}
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

        {/* Logout */}
        <div className="px-3 py-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-secondary hover:bg-[#f85149]/10 hover:text-danger transition-all duration-150"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 h-full overflow-y-auto bg-bg">
        <div className="w-full h-full p-6 md:p-8 animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
