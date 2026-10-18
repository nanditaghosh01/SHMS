import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { label: 'Suites', path: '/rooms' },
    { label: 'AI Match', path: '/ai-recommendations' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
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
          height: '76px'
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
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
            <User size={17} />
          </Link>

          <Link
            to="/rooms"
            className="btn btn-primary btn-sm"
            style={{ padding: '0.55rem 1.4rem' }}
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
              padding: '0.4rem',
              color: 'var(--color-midnight)',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-md)'
          }}
          className="mobile-nav-drawer"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--color-midnight)',
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-midnight)',
                textDecoration: 'none'
              }}
            >
              My Bookings
            </NavLink>
            <div style={{ paddingTop: '0.5rem' }}>
              <Link
                to="/rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Book a Stay
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
