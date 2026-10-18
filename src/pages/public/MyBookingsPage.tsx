import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHotel } from '../../context/HotelContext';
import { useAuth } from '../../context/AuthContext';
import { Booking, BookingStatus } from '../../types';
import {
  CalendarCheck,
  QrCode,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Coffee,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight
} from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const { bookings, cancelBooking } = useHotel();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'active' | 'completed' | 'cancelled'>('all');
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);

  // Filter bookings
  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return b.status === 'confirmed';
    if (activeTab === 'active') return b.status === 'checked_in';
    if (activeTab === 'completed') return b.status === 'checked_out';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  const handleConfirmCancel = () => {
    if (cancellingBookingId) {
      cancelBooking(cancellingBookingId);
      setCancellingBookingId(null);
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return <span className="badge badge-sapphire">Confirmed</span>;
      case 'checked_in':
        return <span className="badge badge-success">● Currently In-House</span>;
      case 'checked_out':
        return <span className="badge badge-petal">Completed</span>;
      case 'cancelled':
        return <span className="badge badge-danger">Cancelled</span>;
    }
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Welcome Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--color-sapphire)',
                display: 'block',
                marginBottom: '0.3rem'
              }}
            >
              GUEST PORTAL
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--color-midnight)', margin: 0, fontWeight: 700 }}>
              My Reservations
            </h1>
          </div>

          <Link to="/rooms" className="btn btn-primary">
            <span>Book New Sanctuary</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Status Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid var(--color-border)'
          }}
        >
          {[
            { id: 'all', label: `All Stays (${bookings.length})` },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'active', label: 'Active In-House' },
            { id: 'completed', label: 'Past Stays' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.65rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: activeTab === tab.id ? 700 : 500,
                backgroundColor: activeTab === tab.id ? 'var(--color-midnight)' : 'transparent',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--color-text-secondary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '4rem 2rem',
              textAlign: 'center',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-bridal-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--color-sapphire)'
              }}
            >
              <CalendarCheck size={28} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>No reservations found in this view</h3>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
              You don't have any stays matching this filter. Explore our sanctuaries to schedule your next retreat.
            </p>
            <Link to="/rooms" className="btn btn-primary">
              Explore Available Rooms
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            {filteredBookings.map(b => (
              <div
                key={b.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  padding: '2rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '2rem',
                  alignItems: 'center'
                }}
                className="booking-list-item"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                    {getStatusBadge(b.status)}
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-midnight)' }}>
                      Ref: {b.bookingReference}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      • Booked {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', color: 'var(--color-midnight)', marginBottom: '0.4rem' }}>
                    {b.roomName} (Room {b.roomNumber})
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.88rem', color: 'var(--color-midnight-muted)', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={15} color="var(--color-sapphire)" />
                      <span>{b.checkInDate} → {b.checkOutDate} ({b.nights} {b.nights === 1 ? 'Night' : 'Nights'})</span>
                    </div>
                    <div>
                      <span>{b.adults} Adults, {b.children} Children</span>
                    </div>
                    <div>
                      <span>Total: <strong>${b.totalPrice}</strong></span>
                    </div>
                  </div>

                  {b.specialRequests && (
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                      Guest Request: "{b.specialRequests}"
                    </p>
                  )}
                </div>

                {/* Contextual Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', minWidth: '180px' }}>
                  {b.status !== 'cancelled' && (
                    <Link
                      to={`/qr-pass/${b.id}`}
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%' }}
                    >
                      <QrCode size={15} />
                      <span>Digital Room Key</span>
                    </Link>
                  )}

                  <Link
                    to="/services"
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%' }}
                  >
                    <Coffee size={15} />
                    <span>In-Room Service</span>
                  </Link>

                  {b.status === 'confirmed' && (
                    <button
                      onClick={() => setCancellingBookingId(b.id)}
                      style={{
                        padding: '0.45rem',
                        fontSize: '0.8rem',
                        color: 'var(--color-danger)',
                        fontWeight: 600,
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      Cancel Reservation
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancellation Confirmation Modal */}
        {cancellingBookingId && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(11, 25, 87, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1rem'
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '2.2rem',
                maxWidth: '460px',
                width: '100%',
                boxShadow: 'var(--shadow-xl)',
                animation: 'fadeIn 0.2s ease-out'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#DC2626', marginBottom: '1rem' }}>
                <AlertTriangle size={24} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-midnight)' }}>Cancel Reservation?</h3>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Are you sure you wish to cancel this stay? Your dates and room allocation will be released back to other travelers immediately.
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
                <button
                  onClick={() => setCancellingBookingId(null)}
                  className="btn btn-secondary btn-sm"
                >
                  Keep Reservation
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="btn btn-sm"
                  style={{ backgroundColor: '#DC2626', color: '#FFFFFF', borderRadius: 'var(--radius-full)' }}
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-list-item {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
