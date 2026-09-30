
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import SEO from '../../components/common/SEO';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await login(email, password);
      if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
        navigate(from && from.startsWith('/admin') ? from : '/admin', { replace: true });
      } else if (user.role === 'STUDENT') {
        navigate(from && from.startsWith('/student') ? from : '/student', { replace: true });
      } else {
        navigate(from && from.startsWith('/manager') ? from : '/manager', { replace: true });
      }
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || !err.response) {
        setError(
          'Cannot connect to backend server. Please make sure the backend is running on http://localhost:8000.'
        );
      } else {
        setError(err.response?.data?.detail || 'Invalid email or password.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const setDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="card w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Welcome to <span className="text-accent">MessMind</span>
          </h1>
          <p className="text-secondary mt-1 text-sm">
            Sign in to your account
          </p>
        </div>

        {/* Demo Quick Logins */}
        <div className="mb-6 p-3 rounded-xl bg-surface border border-border">
          <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2 text-center">
            Quick Demo Login
          </p>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setDemo('admin@messmind.edu', 'admin123')}
              className="px-2.5 py-1.5 rounded-lg bg-danger/10 border border-danger/25 text-danger text-xs font-semibold hover:bg-danger/20 transition-all text-center"
            >
              👑 Admin
            </button>

            <button
              type="button"
              onClick={() => setDemo('manager@messmind.edu', 'manager123')}
              className="px-2.5 py-1.5 rounded-lg bg-accent/10 border border-accent/25 text-accent text-xs font-semibold hover:bg-accent/20 transition-all text-center"
            >
              👨‍🍳 Manager
            </button>

            <button
              type="button"
              onClick={() => setDemo('student@messmind.edu', 'student123')}
              className="px-2.5 py-1.5 rounded-lg bg-success/10 border border-success/25 text-success text-xs font-semibold hover:bg-success/20 transition-all text-center"
            >
              🎓 Student
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-danger/10 text-danger text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              type="email"
              required
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@messmind.edu"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="label" htmlFor="password">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="input-field pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isSubmitting}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full mt-6"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
