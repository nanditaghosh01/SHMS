import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BedDouble, Sparkles, CalendarDays, Coffee, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHotel } from '../../context/HotelContext';

export const MobileBottomBar: React.FC = () => {
  const location = useLocation();
  const { user, role } = useAuth();
  const { bookings } = useHotel();

  // Active bookings count for badge
  const activeBookingsCount = bookings.filter(b => b.status === 'confirmed' || b.status === 'checked_in').length;

  // Don't show bottom bar if in staff dashboards (dashboards have their own sidebar and topbar)
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) {
    return null;
  }

  const navItems = [
    { label: 'Suites', path: '/rooms', icon: BedDouble },
    { label: 'AI Match', path: '/ai-recommendations', icon: Sparkles },
    { label: 'My Stays', path: '/my-bookings', icon: CalendarDays, badge: activeBookingsCount > 0 ? activeBookingsCount : undefined },
    { label: 'Services', path: '/services', icon: Coffee },
    {
      label: role === 'guest' ? 'Account' : 'Staff',
      path: role === 'guest' ? '/profile' : `/dashboard/${role}`,
      icon: role === 'guest' ? User : ShieldCheck,
      highlight: role !== 'guest'
    }
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 890,
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(11, 25, 87, 0.08)',
        boxShadow: '0 -4px 20px rgba(11, 25, 87, 0.06)',
        display: 'none',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '62px',
          maxWidth: '540px',
          margin: '0 auto',
          padding: '0 0.5rem'
        }}
      >
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === '/rooms' && location.pathname === '/');

          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                flex: 1,
                minHeight: '48px',
                color: isActive ? 'var(--color-sapphire)' : 'var(--color-text-muted)',
                textDecoration: 'none',
                position: 'relative',
                transition: 'color 0.15s, transform 0.15s'
              }}
            >
              <div style={{ position: 'relative' }}>
                <Icon
                  size={20}
                  color={isActive ? 'var(--color-sapphire)' : '#727D9C'}
                  strokeWidth={isActive ? 2.3 : 1.8}
                />
                {item.badge !== undefined && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-8px',
                      backgroundColor: 'var(--color-sapphire)',
                      color: '#FFFFFF',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      minWidth: '15px',
                      height: '15px',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 3px'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.01em',
                  lineHeight: 1
                }}
              >
                {item.label}
              </span>

              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    width: '16px',
                    height: '2.5px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--color-sapphire)'
                  }}
                />
              )}
            </NavLink>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};
