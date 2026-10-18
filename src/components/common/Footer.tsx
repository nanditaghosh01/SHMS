import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-midnight)',
        color: 'rgba(255, 255, 255, 0.72)',
        padding: '3.5rem 0 2.5rem',
        marginTop: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Brand */}
          <div>
            <Logo variant="dark" size="md" />
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.55)',
                fontSize: '0.86rem',
                marginTop: '0.6rem',
                margin: 0
              }}
            >
              Stay beautifully. Manage intelligently.
            </p>
          </div>

          {/* Clean Links */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
            <Link to="/rooms" style={{ color: 'inherit', textDecoration: 'none' }}>Suites</Link>
            <Link to="/ai-recommendations" style={{ color: 'inherit', textDecoration: 'none' }}>AI Match</Link>
            <Link to="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link>
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
            <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
            <Link to="/dashboard/admin" style={{ color: 'var(--color-petal)', textDecoration: 'none', fontWeight: 600 }}>Staff Portal</Link>
          </div>
        </div>

        {/* Bottom line */}
        <div
          style={{
            paddingTop: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.45)'
          }}
        >
          <div>
            © {new Date().getFullYear()} LUMORA Smart Hotel Management System.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/help" style={{ color: 'inherit', textDecoration: 'none' }}>FAQ</Link>
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy & Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
