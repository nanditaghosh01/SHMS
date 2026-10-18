import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Logo } from '../../components/common/Logo';
import {
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept terms & conditions to continue.');
      return;
    }

    setError('');
    register(name, email);

    addNotification({
      category: 'system',
      title: 'Welcome to Lumora',
      message: `Greetings ${name}, your luxury guest profile has been activated.`
    });

    navigate('/my-bookings');
  };

  return (
    <div style={{ padding: '3.5rem 1rem 6rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>
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
              Join the Lumora Circle
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Create your profile for effortless room booking and contactless key passes.
            </p>
          </div>

          {error && (
            <div style={{ backgroundColor: 'var(--color-danger-bg)', color: 'var(--color-danger)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', marginBottom: '1.2rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Eleanor Vance"
                  required
                />
                <User size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '15px' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="eleanor.vance@example.com"
                  required
                />
                <Mail size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '15px' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number (for SMS Passes)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (555) 234-8901"
                  required
                />
                <Phone size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '15px' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Create Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  required
                />
                <Lock size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '15px' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                />
                <Lock size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '15px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem', fontSize: '0.84rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={e => setAgreeTerms(e.target.checked)}
                  style={{ accentColor: 'var(--color-sapphire)' }}
                />
                <span>
                  I agree to the Lumora Stay Policies & Privacy Standards.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginBottom: '1.2rem' }}
            >
              <span>Create Account</span>
              <ArrowRight size={17} />
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--color-sapphire)', fontWeight: 700 }}>
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
