import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHotel } from '../../context/HotelContext';
import {
  QrCode,
  KeyRound,
  ShieldCheck,
  Calendar,
  Clock,
  Sparkles,
  Wifi,
  ChevronLeft,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

export const QrPassPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { bookings } = useHotel();

  const booking = bookings.find(b => b.id === id || b.bookingReference === id) || bookings[0];

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [pulseActive, setPulseActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!booking) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Digital Pass Not Found</h2>
        <Link to="/my-bookings" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Bookings
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2.5rem 0 5rem', backgroundColor: 'var(--color-lace)', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '1.2rem' }}>
          <Link
            to="/my-bookings"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--color-sapphire)'
            }}
          >
            <ChevronLeft size={16} /> My Reservations
          </Link>
        </div>

        {/* Digital Room Pass Card */}
        <div
          style={{
            backgroundColor: 'var(--color-midnight)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(11, 25, 87, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#FFFFFF',
            position: 'relative'
          }}
        >
          {/* Top Brand Stripe */}
          <div
            style={{
              padding: '1.5rem 1.8rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: '#FFFFFF'
                }}
              >
                LUMORA
              </span>
              <span style={{ fontSize: '0.68rem', color: 'var(--color-lavender)', display: 'block', textTransform: 'uppercase' }}>
                Contactless Sanctuary Key
              </span>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid #10B981',
                borderRadius: 'var(--radius-full)',
                padding: '0.2rem 0.65rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#6EE7B7',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
              Active Pass
            </div>
          </div>

          {/* Room Banner */}
          <div style={{ padding: '1.5rem 1.8rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Allocated Room
            </span>
            <div style={{ fontSize: '3.6rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#FFFFFF', lineHeight: 1.1 }}>
              {booking.roomNumber}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-petal)' }}>
              {booking.roomName}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '0.2rem' }}>
              {booking.roomCategory} • Coastal Estate
            </div>
          </div>

          {/* Cutout Notch effect */}
          <div style={{ position: 'relative', margin: '0 0.5rem' }}>
            <div
              style={{
                position: 'absolute',
                left: '-18px',
                top: '-10px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-lace)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: '-18px',
                top: '-10px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-lace)'
              }}
            />
            <div style={{ borderTop: '2px dashed rgba(255, 255, 255, 0.2)', margin: '0 1rem' }} />
          </div>

          {/* QR Code Container */}
          <div style={{ padding: '2rem 1.8rem', textAlign: 'center', backgroundColor: '#FFFFFF', margin: '1.2rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'inline-block', position: 'relative' }}>
              <svg width="190" height="190" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                <rect x="8" y="8" width="26" height="26" fill="#0B1957" rx="3" />
                <rect x="13" y="13" width="16" height="16" fill="white" rx="1" />
                <rect x="17" y="17" width="8" height="8" fill="#426BC2" rx="1" />

                <rect x="66" y="8" width="26" height="26" fill="#0B1957" rx="3" />
                <rect x="71" y="13" width="16" height="16" fill="white" rx="1" />
                <rect x="75" y="17" width="8" height="8" fill="#426BC2" rx="1" />

                <rect x="8" y="66" width="26" height="26" fill="#0B1957" rx="3" />
                <rect x="13" y="71" width="16" height="16" fill="white" rx="1" />
                <rect x="17" y="75" width="8" height="8" fill="#426BC2" rx="1" />

                <rect x="42" y="10" width="8" height="8" fill="#0B1957" />
                <rect x="54" y="18" width="8" height="8" fill="#0B1957" />
                <rect x="40" y="26" width="6" height="6" fill="#0B1957" />
                <rect x="10" y="42" width="8" height="8" fill="#0B1957" />
                <rect x="22" y="52" width="6" height="6" fill="#0B1957" />

                <rect x="38" y="38" width="24" height="24" fill="#0B1957" rx="4" />
                <rect x="42" y="42" width="16" height="16" fill="#E8D9ED" rx="2" />
                <circle cx="50" cy="50" r="4" fill="#6F3962" />

                <rect x="68" y="42" width="8" height="8" fill="#0B1957" />
                <rect x="80" y="52" width="8" height="8" fill="#0B1957" />
                <rect x="42" y="68" width="8" height="8" fill="#0B1957" />
                <rect x="54" y="78" width="8" height="8" fill="#0B1957" />
                <rect x="70" y="70" width="10" height="10" fill="#0B1957" />
                <rect x="84" y="82" width="6" height="6" fill="#0B1957" />
              </svg>
            </div>

            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0B1957', letterSpacing: '0.08em', marginTop: '0.5rem' }}>
              {booking.qrPassCode}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Hold near NFC door lock or front desk kiosk
            </div>
          </div>

          {/* Guest and Date Details */}
          <div style={{ padding: '0 1.8rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Guest Name:</span>
              <strong style={{ color: '#FFFFFF' }}>{booking.guestName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Reservation:</span>
              <strong style={{ color: '#FFFFFF' }}>{booking.bookingReference}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Valid Dates:</span>
              <strong style={{ color: '#FFFFFF' }}>{booking.checkInDate} — {booking.checkOutDate}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Current Terminal Time:</span>
              <span style={{ color: 'var(--color-lavender)', fontWeight: 600 }}>{currentTime}</span>
            </div>
          </div>

          {/* Bottom NFC Instruction */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              padding: '1rem 1.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.78rem',
              color: 'rgba(255, 255, 255, 0.75)'
            }}
          >
            <Smartphone size={20} color="var(--color-lavender)" style={{ flexShrink: 0 }} />
            <span>Digital pass is compatible with Apple Wallet & Google Wallet NFC emulation.</span>
          </div>
        </div>

        {/* Quick Help Card */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
            Need physical keycard assistance? Visit our 24/7 Concierge Desk or press Front Desk Speed Dial on the in-room telephone.
          </p>
        </div>
      </div>
    </div>
  );
};
