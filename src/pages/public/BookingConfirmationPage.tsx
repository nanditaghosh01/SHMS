import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHotel } from '../../context/HotelContext';
import {
  CheckCircle,
  QrCode,
  Calendar,
  CreditCard,
  Printer,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

export const BookingConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { bookings } = useHotel();

  const booking = bookings.find(b => b.id === id) || bookings[0];

  const handlePrint = () => {
    window.print();
  };

  if (!booking) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Reservation Not Found</h2>
        <Link to="/my-bookings" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Go to My Bookings
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Celebration Header */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2.5rem',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center',
            marginBottom: '2.5rem'
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              border: '2px solid var(--color-success-border)'
            }}
          >
            <CheckCircle size={38} />
          </div>

          <span className="badge badge-success" style={{ marginBottom: '0.8rem' }}>
            ● Confirmed & Guaranteed
          </span>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--color-midnight)', marginBottom: '0.8rem' }}>
            Your stay at Lumora is secured.
          </h1>

          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '540px', margin: '0 auto 1.8rem', fontSize: '0.98rem' }}>
            We look forward to welcoming you, <strong>{booking.guestName}</strong>. A confirmation folio and digital pass have been dispatched to <strong>{booking.guestEmail}</strong>.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              backgroundColor: 'var(--color-bridal-blue)',
              padding: '0.8rem 1.8rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)'
            }}
          >
            <span style={{ fontSize: '0.85rem', color: 'var(--color-midnight-muted)' }}>Booking Reference:</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-midnight)', letterSpacing: '0.05em' }}>
              {booking.bookingReference}
            </span>
          </div>
        </div>

        {/* Digital QR Pass Box */}
        <div
          style={{
            backgroundColor: 'var(--color-midnight)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-xl)',
            marginBottom: '2.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '2.5rem',
            alignItems: 'center'
          }}
          className="qr-confirmation-box"
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-lavender)', marginBottom: '0.6rem' }}>
              <QrCode size={18} />
              <span style={{ fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Contactless Digital Pass
              </span>
            </div>

            <h3 style={{ color: '#FFFFFF', fontSize: '1.45rem', marginBottom: '0.8rem' }}>
              Fast-Track Arrival Key
            </h3>

            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '420px' }}>
              Present this encrypted verification pass at the front-desk self-scanner for contactless verification, digital room key delivery, and immediate access to Room {booking.roomNumber}.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to={`/qr-pass/${booking.id}`} className="btn btn-primary btn-sm">
                <span>Open Fullscreen QR Keycard</span>
                <ArrowRight size={15} />
              </Link>
              <button onClick={handlePrint} className="btn btn-outline-white btn-sm">
                <Printer size={15} />
                <span>Print Folio</span>
              </button>
            </div>
          </div>

          {/* SVG QR Code Simulation */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: '1.2rem',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}
          >
            {/* Custom stylized QR code */}
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" fill="white" />
              {/* Corner position markers */}
              <rect x="10" y="10" width="24" height="24" fill="#0B1957" rx="3" />
              <rect x="14" y="14" width="16" height="16" fill="white" rx="1" />
              <rect x="18" y="18" width="8" height="8" fill="#426BC2" rx="1" />

              <rect x="66" y="10" width="24" height="24" fill="#0B1957" rx="3" />
              <rect x="70" y="14" width="16" height="16" fill="white" rx="1" />
              <rect x="74" y="18" width="8" height="8" fill="#426BC2" rx="1" />

              <rect x="10" y="66" width="24" height="24" fill="#0B1957" rx="3" />
              <rect x="14" y="70" width="16" height="16" fill="white" rx="1" />
              <rect x="18" y="74" width="8" height="8" fill="#426BC2" rx="1" />

              {/* Data modules */}
              <rect x="42" y="12" width="6" height="6" fill="#0B1957" />
              <rect x="52" y="18" width="6" height="6" fill="#0B1957" />
              <rect x="42" y="28" width="6" height="6" fill="#0B1957" />
              <rect x="12" y="44" width="6" height="6" fill="#0B1957" />
              <rect x="22" y="52" width="6" height="6" fill="#0B1957" />
              <rect x="40" y="40" width="20" height="20" fill="#0B1957" rx="2" />
              <rect x="44" y="44" width="12" height="12" fill="#E8D9ED" rx="1" />
              <circle cx="50" cy="50" r="3" fill="#6F3962" />
              <rect x="66" y="42" width="6" height="6" fill="#0B1957" />
              <rect x="76" y="52" width="6" height="6" fill="#0B1957" />
              <rect x="84" y="44" width="6" height="6" fill="#0B1957" />
              <rect x="42" y="68" width="6" height="6" fill="#0B1957" />
              <rect x="54" y="76" width="6" height="6" fill="#0B1957" />
              <rect x="68" y="70" width="8" height="8" fill="#0B1957" />
              <rect x="80" y="80" width="8" height="8" fill="#0B1957" />
            </svg>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0B1957', marginTop: '0.4rem', letterSpacing: '0.04em' }}>
              {booking.qrPassCode}
            </div>
          </div>
        </div>

        {/* Detailed Reservation Folio Breakdown */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-midnight)' }}>
              Folio Summary Details
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Issued: {new Date(booking.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Sanctuary</span>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-midnight)', marginTop: '0.2rem' }}>
                {booking.roomName}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Room {booking.roomNumber} • {booking.roomCategory}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Check-in</span>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-midnight)', marginTop: '0.2rem' }}>
                {booking.checkInDate}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                From 3:00 PM
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Check-out</span>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-midnight)', marginTop: '0.2rem' }}>
                {booking.checkOutDate}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                By 11:00 AM ({booking.nights} Nights)
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Payment Method</span>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-midnight)', marginTop: '0.2rem' }}>
                {booking.paymentMethod}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>
                Status: Paid in Full (${booking.totalPrice})
              </div>
            </div>
          </div>

          {booking.specialRequests && (
            <div style={{ backgroundColor: 'var(--color-lace)', padding: '1rem 1.2rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
              <strong>Noted Guest Requests:</strong> {booking.specialRequests}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/my-bookings" className="btn btn-secondary btn-lg">
            View All My Reservations
          </Link>
          <Link to="/services" className="btn btn-primary btn-lg">
            <span>Arrange In-Room Services</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .qr-confirmation-box {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .qr-confirmation-box > div:last-child {
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
};
