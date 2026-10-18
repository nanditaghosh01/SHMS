import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Logo } from '../../components/common/Logo';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('eleanor.vance@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent, forceRole?: UserRole) => {
    if (e) e.preventDefault();

    let targetRole: UserRole = forceRole || 'guest';
    if (!forceRole) {
      if (email.includes('admin')) targetRole = 'admin';
      else if (email.includes('reception')) targetRole = 'receptionist';
      else if (email.includes('housekeeping')) targetRole = 'housekeeping';
      else if (email.includes('manager')) targetRole = 'manager';
    }

    login(email, targetRole);

    if (targetRole === 'guest') {
      navigate('/my-bookings');
    } else {
      navigate(`/dashboard/${targetRole}`);
    }
  };

  const quickRoles: { role: UserRole; label: string; email: string; icon: string }[] = [
    { role: 'guest', label: 'Guest Account', email: 'eleanor.vance@example.com', icon: '👤' },
    { role: 'admin', label: 'Hotel Administrator', email: 'alexander.s@lumorahotels.com', icon: '⚡' },
    { role: 'receptionist', label: 'Front Desk Reception', email: 'mia.chen@lumorahotels.com', icon: '🛎️' },
    { role: 'housekeeping', label: 'Housekeeping Staff', email: 'elena.r@lumorahotels.com', icon: '🧹' },
    { role: 'manager', label: 'General Manager', email: 'v.kensington@lumorahotels.com', icon: '📊' }
  ];

  return (
    <div style={{ padding: '3.5rem 1rem 6rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>
        {/* Brand Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Logo size="md" />
            <h2 style={{ fontSize: '1.45rem', marginTop: '1.2rem', marginBottom: '0.35rem', color: 'var(--color-midnight)' }}>
              Sign In to Lumora
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Access your reservations or operations terminal.
            </p>
          </div>

          {/* Quick Demo Switcher */}
          <div
            style={{
              backgroundColor: 'var(--color-lace)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.1rem',
              marginBottom: '1.8rem',
              border: '1px solid var(--color-border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.78rem', color: 'var(--color-midnight)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <Sparkles size={14} color="var(--color-sapphire)" /> Quick Demo Role Switcher:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.45rem' }}>
              {quickRoles.map(r => (
                <button
                  key={r.role}
                  type="button"
                  onClick={e => {
                    setEmail(r.email);
                    handleLogin(e, r.role);
                  }}
                  style={{
                    padding: '0.5rem 0.6rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--color-midnight)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>{r.icon}</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div style={{ backgroundColor: 'var(--color-danger-bg)', color: 'var(--color-danger)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', marginBottom: '1.2rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={e => handleLogin(e)}>
            <div className="form-group">
              <label className="form-label">Email or Username</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <Mail size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '15px' }} />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                <a href="#forgot" onClick={e => { e.preventDefault(); alert('In the prototype demo, any password authenticates successfully.'); }} style={{ fontSize: '0.78rem', color: 'var(--color-sapphire)', fontWeight: 600 }}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: 'relative', marginTop: '0.4rem' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <Lock size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '15px' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '14px', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--color-sapphire)' }}
                />
                <span>Remember session</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginBottom: '1.2rem' }}
            >
              <span>Sign In</span>
              <ArrowRight size={17} />
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: 'var(--color-sapphire)', fontWeight: 700 }}>
                Create guest profile
              </Link>
            </div>
          </form>
        </div>

        {/* Prototype Security Footnote */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          🔒 Prototype demonstration environment. Production builds require server-side session enforcement and HTTPS encryption.
        </div>
      </div>
    </div>
  );
};
