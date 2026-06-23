import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Eye, EyeOff, GraduationCap } from 'lucide-react';

import { loginSuccess } from '../../../store/authSlice';
import { mockUsers } from '../../../mocks/authMock';
import { Button,Input } from '../../../components';

/**
 * LOGIN PAGE
 *
 * Handles user authentication using mock data (real API later).
 * On success: dispatches loginSuccess to Redux, redirects by role.
 * On pending: redirects to /pending-approval.
 * On failure: shows inline error message.
 *
 * Uses AuthLayout (centered card) as its wrapper via React Router.
 */

const ROLE_REDIRECTS = {
  admin: '/admin/dashboard',
  teacher: '/teacher/dashboard',
  student: '/student/dashboard',
  parent: '/parent/dashboard',
};


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    setError(''); // clear error on every keystroke
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a small network delay (replace with real API call later)
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (!user) {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
        return;
      }

      if (user.status === 'Pending') {
        // Don't store in Redux — user isn't approved yet
        navigate('/pending-approval');
        return;
      }

      // Store user + token in Redux, then redirect by role
      dispatch(loginSuccess({ user, token: user.token }));
      navigate(ROLE_REDIRECTS[user.role] || '/login');
    }, 800);
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Welcome back</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Sign in to access your portal
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-input bg-danger-bg px-4 py-3 text-sm text-danger-text">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="name@school.edu"
          value={form.email}
          onChange={handleChange}
          leftIcon={<Mail size={16} />}
          required
        />

        <div className="space-y-1">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-text-muted hover:text-text-primary transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
            required
          />
          
          {/* Forgot password — right aligned under password field */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-xs text-brand-primary hover:text-brand-hover transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          tone="brand"
        >
          Sign In
        </Button>
      </form>

      {/* Sign up link */}
      <p className="text-center text-sm text-text-secondary">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-brand-primary hover:text-brand-hover transition-colors"
        >
          Sign up
        </Link>
      </p>

    </div>
  );
}

export default Login;