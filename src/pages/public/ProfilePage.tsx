import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useHotel } from '../../context/HotelContext';
import {
  User,
  Bell,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle,
  Calendar,
  Sparkles,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, role } = useAuth();
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const { bookings } = useHotel();

  const [activeTab, setActiveTab] = useState<'notifications' | 'profile'>('notifications');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredNotifs = notifications.filter(n => {
    if (filterCategory === 'all') return true;
    return n.category === filterCategory;
  });

  return (
    <div style={{ padding: '3rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Header Profile Summary */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '2.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user?.name || 'User'}
                style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-midnight)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 700
                }}
              >
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
            )}

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h1 style={{ fontSize: '1.65rem', color: 'var(--color-midnight)', margin: 0 }}>
                  {user?.name || 'Guest User'}
                </h1>
                <span className="badge badge-sapphire" style={{ textTransform: 'capitalize' }}>
                  {role} Member
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                {user?.email} • {user?.phone || '+1 (555) 234-8901'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.6rem', fontSize: '0.8rem', color: 'var(--color-midnight-muted)' }}>
                <span>Lumora Circle Status: <strong>Diamond Tier</strong></span>
                <span>• Total Stays: <strong>{bookings.length}</strong></span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`btn btn-sm ${activeTab === 'notifications' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <Bell size={15} />
              <span>Notifications ({unreadCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`btn btn-sm ${activeTab === 'profile' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <User size={15} />
              <span>Personal Details</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Notifications Center */}
        {activeTab === 'notifications' && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 2.5rem',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', color: 'var(--color-midnight)', margin: 0 }}>
                  Notification Activity Center
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Stay updates, digital pass deliveries, and in-room service dispatches.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Filter Dropdown */}
                <select
                  className="form-select"
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                >
                  <option value="all">All Categories</option>
                  <option value="booking">Bookings</option>
                  <option value="checkin">Digital Key</option>
                  <option value="service">Services</option>
                  <option value="system">Announcements</option>
                </select>

                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="btn btn-secondary btn-sm"
                  >
                    Mark All as Read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {filteredNotifs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                  No notifications in this category.
                </div>
              ) : (
                filteredNotifs.map(notif => (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    style={{
                      padding: '1.2rem',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: notif.read ? 'var(--color-lace-light)' : 'var(--color-bridal-blue)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        {!notif.read && (
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-sapphire)' }} />
                        )}
                        <span className="badge badge-sapphire" style={{ fontSize: '0.68rem', textTransform: 'capitalize' }}>
                          {notif.category}
                        </span>
                        <h4 style={{ fontSize: '0.96rem', color: 'var(--color-midnight)', margin: 0 }}>
                          {notif.title}
                        </h4>
                      </div>
                      <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', margin: 0, paddingLeft: notif.read ? 0 : '14px' }}>
                        {notif.message}
                      </p>
                    </div>

                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                      {notif.timestamp}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Profile Settings */}
        {activeTab === 'profile' && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-midnight)', marginBottom: '1.5rem' }}>
              Personal Preferences & Contact Information
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" defaultValue={user?.name} />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" defaultValue={user?.email} />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Phone</label>
                <input type="tel" className="form-input" defaultValue={user?.phone || '+1 (555) 234-8901'} />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Currency</label>
                <select className="form-select">
                  <option>USD ($) — United States Dollar</option>
                  <option>EUR (€) — Euro</option>
                  <option>GBP (£) — British Pound</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
              <button
                type="button"
                onClick={() => alert('Profile preferences updated.')}
                className="btn btn-primary btn-sm"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
