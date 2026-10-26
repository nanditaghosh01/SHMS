import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  X,
  User,
  BedDouble,
  Sparkles,
  Coffee,
  Info,
  Phone,
  HelpCircle,
  CalendarDays,
  ShieldCheck,
  LogOut,
  ChevronRight
} from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Suites', path: '/rooms', icon: BedDouble },
    { label: 'AI Match', path: '/ai-recommendations', icon: Sparkles },
    { label: 'Services', path: '/services', icon: Coffee },
    { label: 'About', path: '/about', icon: Info },
    { label: 'Contact', path: '/contact', icon: Phone }
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-xs)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px'
        }}
      >
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.4rem'
          }}
          className="desktop-nav"
        >
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-heading)',
                fontSize: '0.92rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--color-sapphire)' : 'var(--color-midnight)',
                transition: 'color 0.2s',
                textDecoration: 'none',
                letterSpacing: '0.01em'
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <Link
            to="/my-bookings"
            style={{
              fontSize: '0.88rem',
              fontWeight: 500,
              color: 'var(--color-midnight)',
              textDecoration: 'none',
              padding: '0.4rem 0.6rem'
            }}
            className="desktop-nav"
          >
            My Bookings
          </Link>

          <Link
            to="/profile"
            aria-label="Profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-lace)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-midnight)',
              textDecoration: 'none'
            }}
            title={user?.name || 'Profile'}
          >
            <User size={18} />
          </Link>

          <Link
            to="/rooms"
            className="btn btn-primary btn-sm header-cta-desktop"
            style={{ padding: '0.55rem 1.3rem' }}
          >
            Book a Stay
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-nav-toggle"
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              padding: '0.5rem',
              minWidth: '42px',
              minHeight: '42px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-midnight)',
              backgroundColor: mobileMenuOpen ? 'var(--color-lace)' : 'transparent',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Sheet */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(11, 25, 87, 0.45)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 899,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            className="mobile-nav-sheet"
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderBottomLeftRadius: '24px',
              borderBottomRightRadius: '24px',
              boxShadow: '0 20px 40px rgba(11, 25, 87, 0.15)',
              borderBottom: '1px solid var(--color-border)',
              maxHeight: 'calc(100vh - 90px)',
              overflowY: 'auto',
              padding: '1.25rem 1.25rem 2rem'
            }}
          >
            {/* User Greeting & Status Card */}
            <div
              style={{
                backgroundColor: 'var(--color-lace)',
                borderRadius: '16px',
                padding: '1rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-midnight)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.95rem'
                  }}
                >
                  {user?.name ? user.name.charAt(0) : 'G'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-midnight)' }}>
                    {user?.name || 'Guest Traveler'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-sapphire)', textTransform: 'capitalize' }}>
                    {role === 'guest' ? 'Circle Member' : `${role} Terminal`}
                  </div>
                </div>
              </div>

              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
              >
                Profile
              </Link>
            </div>

            {/* Navigation Links with Icons */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.08em', padding: '0.3rem 0.5rem' }}>
                Sanctuary Navigation
              </div>

              {navLinks.map(link => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 0.9rem',
                      borderRadius: '12px',
                      fontSize: '0.98rem',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? 'var(--color-bridal-blue)' : 'transparent',
                      color: isActive ? 'var(--color-sapphire)' : 'var(--color-midnight)',
                      textDecoration: 'none',
                      transition: 'background 0.15s'
                    })}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Icon size={19} color="var(--color-sapphire)" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight size={16} color="var(--color-text-muted)" />
                  </NavLink>
                );
              })}

              <NavLink
                to="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '12px',
                  fontSize: '0.98rem',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? 'var(--color-bridal-blue)' : 'transparent',
                  color: isActive ? 'var(--color-sapphire)' : 'var(--color-midnight)',
                  textDecoration: 'none'
                })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CalendarDays size={19} color="var(--color-sapphire)" />
                  <span>My Reservations</span>
                </div>
                <ChevronRight size={16} color="var(--color-text-muted)" />
              </NavLink>

              <NavLink
                to="/help"
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '12px',
                  fontSize: '0.98rem',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? 'var(--color-bridal-blue)' : 'transparent',
                  color: isActive ? 'var(--color-sapphire)' : 'var(--color-midnight)',
                  textDecoration: 'none'
                })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <HelpCircle size={19} color="var(--color-sapphire)" />
                  <span>FAQs & Support</span>
                </div>
                <ChevronRight size={16} color="var(--color-text-muted)" />
              </NavLink>

              {role !== 'guest' && (
                <NavLink
                  to={`/dashboard/${role}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.9rem',
                    borderRadius: '12px',
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--color-midnight)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    marginTop: '0.5rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShieldCheck size={19} color="#D2B3DB" />
                    <span>Enter Staff Workspace</span>
                  </div>
                  <ChevronRight size={16} color="#D2B3DB" />
                </NavLink>
              )}
            </nav>

            {/* Action CTA & Quick Switcher */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link
                to="/rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                Book a Sanctuary
              </Link>

              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    color: '#DC2626',
                    padding: '0.6rem',
                    cursor: 'pointer'
                  }}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '0.7rem' }}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
        @media (max-width: 540px) {
          .header-cta-desktop { display: none !important; }
        }
      `}</style>
    </header>
  );
};
