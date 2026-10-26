import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { ShieldCheck, ChevronUp, ChevronDown, Check } from 'lucide-react';

export const DemoBar: React.FC = () => {
  const { role, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isDashboard = location.pathname.startsWith('/dashboard');

  const rolesList: { id: UserRole; label: string; path: string }[] = [
    { id: 'guest', label: 'Guest Portal', path: '/my-bookings' },
    { id: 'admin', label: 'Administrator', path: '/dashboard/admin' },
    { id: 'receptionist', label: 'Receptionist Desk', path: '/dashboard/receptionist' },
    { id: 'housekeeping', label: 'Housekeeping Board', path: '/dashboard/housekeeping' },
    { id: 'manager', label: 'Manager Analytics', path: '/dashboard/manager' }
  ];

  const handleSelectRole = (newRole: UserRole, targetPath: string) => {
    switchRole(newRole);
    setOpen(false);
    if (newRole !== 'guest') {
      navigate(targetPath);
    } else {
      if (location.pathname.startsWith('/dashboard')) {
        navigate('/');
      }
    }
  };

  return (
    <aside
      aria-label="Staff switcher"
      className={`demobar-container ${isDashboard ? 'in-dashboard' : 'in-public'}`}
      style={{
        position: 'fixed',
        zIndex: 1000,
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* Dropdown Menu */}
      {open && (
        <div
          className="demobar-menu"
          style={{
            position: 'absolute',
            bottom: '48px',
            right: 0,
            width: '240px',
            maxWidth: 'calc(100vw - 2rem)',
            backgroundColor: '#0B1957',
            color: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(11, 25, 87, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            overflow: 'hidden',
            padding: '0.6rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            style={{
              padding: '0.5rem 0.6rem 0.6rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#D2B3DB',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>Staff Role Switcher</span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>Demo</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {rolesList.map(r => {
              const isSelected = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => handleSelectRole(r.id, r.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 700 : 500,
                    backgroundColor: isSelected ? '#426BC2' : 'transparent',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s'
                  }}
                >
                  <span>{r.label}</span>
                  {isSelected && <Check size={14} />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Pill Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="demobar-toggle-btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          backgroundColor: '#0B1957',
          color: '#FFFFFF',
          padding: '0.5rem 0.9rem',
          borderRadius: '9999px',
          boxShadow: '0 8px 24px rgba(11, 25, 87, 0.28)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          fontSize: '0.78rem',
          fontWeight: 600,
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'transform 0.2s'
        }}
      >
        <ShieldCheck size={14} color="#D2B3DB" />
        <span style={{ textTransform: 'capitalize' }}>{role}</span>
        {open ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
      </button>

      <style>{`
        .demobar-container.in-public {
          bottom: 1.5rem;
          right: 1.5rem;
        }
        .demobar-container.in-dashboard {
          bottom: 1.5rem;
          right: 1.5rem;
        }

        @media (max-width: 768px) {
          .demobar-container.in-public {
            bottom: calc(64px + env(safe-area-inset-bottom, 0px) + 0.6rem) !important;
            right: 0.85rem !important;
          }
          .demobar-container.in-dashboard {
            bottom: 1rem !important;
            right: 0.85rem !important;
          }
        }
      `}</style>
    </aside>
  );
};
