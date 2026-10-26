import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { useHotel } from '../../context/HotelContext';
import { useNotifications } from '../../context/NotificationContext';
import { DemoBar } from '../common/DemoBar';
import {
  LayoutDashboard,
  BedDouble,
  CalendarDays,
  Users,
  Sparkles,
  ClipboardList,
  Wrench,
  Boxes,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  Search,
  ExternalLink,
  LogOut,
  Menu,
  X,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface DashboardLayoutProps {
  currentRoleTitle: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ currentRoleTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, role, logout } = useAuth();
  const { inventory, tasks, bookings } = useHotel();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  // Badges calculation
  const lowStockCount = inventory.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock').length;
  const pendingTasksCount = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length;
  const todayArrivalsCount = bookings.filter(b => b.status === 'confirmed').length;

  // Nav items per role
  const getNavLinks = () => {
    if (role === 'admin') {
      return [
        { label: 'Overview', path: '/dashboard/admin', icon: LayoutDashboard },
        { label: 'Rooms Inventory', path: '/dashboard/admin/rooms', icon: BedDouble },
        { label: 'Bookings & Guests', path: '/dashboard/admin/bookings', icon: CalendarDays, badge: todayArrivalsCount },
        { label: 'Staff Directory', path: '/dashboard/admin/staff', icon: Users },
        { label: 'Housekeeping & Tasks', path: '/dashboard/admin/tasks', icon: ClipboardList, badge: pendingTasksCount },
        { label: 'Supply Inventory', path: '/dashboard/admin/inventory', icon: Boxes, badge: lowStockCount > 0 ? lowStockCount : undefined, badgeColor: 'warning' },
        { label: 'Executive Reports', path: '/dashboard/admin/reports', icon: BarChart3 },
        { label: 'System Settings', path: '/dashboard/admin/settings', icon: Settings }
      ];
    }
    if (role === 'receptionist') {
      return [
        { label: 'Front Desk Overview', path: '/dashboard/receptionist', icon: LayoutDashboard },
        { label: 'Arrivals & Departures', path: '/dashboard/receptionist/arrivals', icon: CalendarDays, badge: todayArrivalsCount },
        { label: 'QR Pass Scanner', path: '/dashboard/receptionist/scan', icon: QrCode },
        { label: 'Walk-In Booking', path: '/dashboard/receptionist/new-booking', icon: BedDouble },
        { label: 'Invoices & Billing', path: '/dashboard/receptionist/billing', icon: CreditCard }
      ];
    }
    if (role === 'housekeeping') {
      return [
        { label: 'Cleaning Tasks Board', path: '/dashboard/housekeeping', icon: ClipboardList, badge: pendingTasksCount },
        { label: 'Room Inspection', path: '/dashboard/housekeeping/rooms', icon: BedDouble },
        { label: 'Maintenance Issues', path: '/dashboard/housekeeping/issues', icon: Wrench },
        { label: 'Linen & Amenities Stock', path: '/dashboard/housekeeping/supplies', icon: Boxes }
      ];
    }
    // Manager
    return [
      { label: 'Executive Analytics', path: '/dashboard/manager', icon: BarChart3 },
      { label: 'Occupancy Forecasting', path: '/dashboard/manager/forecast', icon: LayoutDashboard },
      { label: 'Revenue Performance', path: '/dashboard/manager/revenue', icon: CreditCard },
      { label: 'Guest Feedback & NPS', path: '/dashboard/manager/feedback', icon: Sparkles }
    ];
  };

  const navLinks = getNavLinks();

  // Lock body scroll when mobile sidebar is open
  React.useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F4F7FC' }}>
      <DemoBar />

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Mobile Backdrop Overlay */}
        {sidebarOpen && (
          <div
            className="dashboard-backdrop"
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(11, 25, 87, 0.5)',
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)',
              zIndex: 840
            }}
          />
        )}

        {/* Left Sidebar */}
        <aside
          style={{
            width: '270px',
            backgroundColor: 'var(--color-midnight)',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'sticky',
            top: 0,
            height: '100vh',
            zIndex: 850,
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}
        >
          {/* Brand & Role Header */}
          <div style={{ padding: '1.25rem 1.4rem 1.2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Logo variant="dark" size="md" showTagline={false} />
              <button
                onClick={() => setSidebarOpen(false)}
                className="dashboard-close-btn"
                aria-label="Close sidebar"
                style={{
                  display: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  padding: '0.4rem',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(66, 107, 194, 0.3)',
                  border: '1px solid rgba(66, 107, 194, 0.6)',
                  color: '#E9F3FF',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                <ShieldCheck size={12} color="#D2B3DB" /> {currentRoleTitle}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                Live
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ flex: 1, padding: '1.2rem 0.8rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ padding: '0 0.6rem 0.4rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
              Management Modules
            </div>

            {navLinks.map(item => {
              const Icon = item.icon;
              // Check active path
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.7rem 0.9rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.72)',
                    backgroundColor: isActive ? 'var(--color-sapphire)' : 'transparent',
                    transition: 'all 0.15s',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={18} color={isActive ? '#FFFFFF' : '#B5C4E5'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        backgroundColor: item.badgeColor === 'warning' ? '#F59E0B' : 'rgba(255,255,255,0.22)',
                        color: item.badgeColor === 'warning' ? '#000000' : '#FFFFFF'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(0,0,0,0.15)' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.7)',
                padding: '0.5rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '0.3rem'
              }}
            >
              <ExternalLink size={15} /> Back to Guest Website
            </Link>

            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.82rem',
                color: '#F87171',
                padding: '0.5rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              <LogOut size={15} /> Sign Out of Terminal
            </button>
          </div>
        </aside>

        {/* Main Content Pane */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Dashboard Topbar */}
          <header
            className="dashboard-header"
            style={{
              height: '70px',
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 1.8rem',
              position: 'sticky',
              top: 0,
              zIndex: 800
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0 }}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="dashboard-menu-btn"
                aria-label="Toggle menu"
                style={{
                  display: 'none',
                  color: 'var(--color-midnight)',
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: sidebarOpen ? 'var(--color-lace)' : 'transparent',
                  cursor: 'pointer'
                }}
              >
                {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              <div style={{ minWidth: 0 }}>
                <h1
                  style={{
                    fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                    fontWeight: 700,
                    color: 'var(--color-midnight)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {currentRoleTitle} Workspace
                </h1>
                <p className="dashboard-subtitle" style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Lumora Coastal Estate • Terminal v2.4 (Encrypted)
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
              {/* Notifications */}
              <button
                onClick={() => navigate('/profile')}
                aria-label="Notifications"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-lace)',
                  color: 'var(--color-midnight)',
                  border: '1px solid var(--color-border)',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <Bell size={17} />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-sapphire)',
                      color: '#FFFFFF',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Profile Card */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-bridal-blue)',
                  border: '1px solid var(--color-border)'
                }}
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user?.name || 'User'}
                    style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-midnight)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.78rem',
                      fontWeight: 700
                    }}
                  >
                    {user?.name ? user.name.charAt(0) : 'U'}
                  </div>
                )}
                <div className="dashboard-profile-text" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-midnight)' }}>
                    {user?.name || 'Staff User'}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-sapphire)', textTransform: 'capitalize' }}>
                    {role}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="dashboard-main" style={{ flex: 1, padding: '2rem 1.8rem 4rem', minWidth: 0 }}>
            <Outlet />
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .dashboard-sidebar {
            position: fixed !important;
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            height: 100vh !important;
            transform: translateX(-100%);
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
          }
          .dashboard-sidebar.open {
            transform: translateX(0);
          }
          .dashboard-menu-btn {
            display: flex !important;
          }
          .dashboard-close-btn {
            display: flex !important;
          }
          .dashboard-header {
            padding: 0 1rem !important;
          }
          .dashboard-main {
            padding: 1.25rem 1rem 5rem !important;
          }
        }
        @media (max-width: 640px) {
          .dashboard-subtitle {
            display: none !important;
          }
        }
        @media (max-width: 520px) {
          .dashboard-profile-text {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
