import { useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/common/SEO';

export default function NotFound() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleHomeClick = () => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'STUDENT') {
      navigate('/student');
    } else if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
      navigate('/admin');
    } else {
      navigate('/manager');
    }
  };

  return (
    <div className="min-h-screen bg-bg text-primary flex items-center justify-center p-4 relative overflow-hidden">
      <SEO 
        title="404 - Page Not Found" 
        description="The requested page could not be found on MessMind." 
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-danger/10 rounded-full blur-3xl pointer-events-none" />

      <div className="card max-w-lg w-full text-center relative z-10 p-8 md:p-12 animate-fade-in border border-border shadow-2xl">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface-2 border border-border flex items-center justify-center text-accent shadow-[0_0_24px_rgba(88,166,255,0.2)] animate-pulse2">
          <Compass className="w-10 h-10" />
        </div>

        <h1 className="text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent/60 tracking-wider mb-2">
          404
        </h1>

        <h2 className="text-xl md:text-2xl font-bold font-display text-primary mb-3">
          Lost in the Dining Hall?
        </h2>

        <p className="text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-sm mx-auto">
          The page or recipe you are looking for doesn't exist, has been relocated, or is currently off today's menu.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface-2 border border-border text-primary hover:border-accent/40 hover:bg-surface text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          
          <button
            onClick={handleHomeClick}
            className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold shadow-[0_0_16px_rgba(88,166,255,0.3)] hover:shadow-[0_0_24px_rgba(88,166,255,0.45)] transition-all"
          >
            <Home className="w-4 h-4" /> {user ? 'My Dashboard' : 'Go to Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
