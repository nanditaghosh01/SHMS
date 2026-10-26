import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useHotel } from '../../context/HotelContext';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  ShieldCheck,
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Lock,
  ChevronLeft
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { rooms, createBooking } = useHotel();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  // Params or defaults
  const roomId = searchParams.get('roomId') || rooms[0]?.id;
  const targetRoom = rooms.find(r => r.id === roomId) || rooms[0];

  const checkIn = searchParams.get('checkIn') || '2026-10-14';
  const checkOut = searchParams.get('checkOut') || '2026-10-17';
  const adults = Number(searchParams.get('adults')) || 2;
  const children = Number(searchParams.get('children')) || 0;

  // Guest details form state
  const [guestName, setGuestName] = useState(user?.name || 'Eleanor Vance');
  const [guestEmail, setGuestEmail] = useState(user?.email || 'eleanor.vance@example.com');
  const [guestPhone, setGuestPhone] = useState(user?.phone || '+1 (555) 234-8901');
  const [specialRequests, setSpecialRequests] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'desk'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Simulation state
  const [simulatedState, setSimulatedState] = useState<'success' | 'fail'>('success');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculations
  const calculateNights = () => {
    const inDate = new Date(checkIn).getTime();
    const outDate = new Date(checkOut).getTime();
    if (outDate <= inDate) return 1;
    return Math.max(1, Math.round((outDate - inDate) / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights();
  const subtotal = targetRoom ? targetRoom.pricePerNight * nights : 0;
  const taxes = Number((subtotal * 0.12).toFixed(2));
  const total = Number((subtotal + taxes).toFixed(2));

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMessage('Please accept the guest accommodation terms.');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      if (simulatedState === 'fail') {
        setErrorMessage('Demonstration Payment Declined: Simulated transaction failure. Please switch to "Simulate Success" to complete the booking.');
        return;
      }

      // Create Booking
      const result = createBooking({
        guestId: user?.id,
        guestName,
        guestEmail,
        guestPhone,
        roomId: targetRoom.id,
        roomNumber: targetRoom.roomNumber,
        roomName: targetRoom.name,
        roomCategory: targetRoom.category,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nights,
        adults,
        children,
        roomsCount: 1,
        pricePerNight: targetRoom.pricePerNight,
        taxesAndFees: taxes,
        totalPrice: total,
        status: 'confirmed',
        paymentStatus: 'successful',
        paymentMethod: paymentMethod === 'card' ? 'Visa (•••• 4242)' : paymentMethod === 'apple_pay' ? 'Apple Pay' : 'Pay at Front Desk',
        specialRequests
      });

      if (!result.success || !result.booking) {
        setErrorMessage(result.error || 'Failed to complete reservation.');
        return;
      }

      // Confetti burst!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      addNotification({
        category: 'booking',
        title: 'Booking Confirmed!',
        message: `Your reservation for ${targetRoom.name} (${result.booking.bookingReference}) has been confirmed.`
      });

      navigate(`/booking/confirmation/${result.booking.id}`);
    }, 1200);
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            to={`/rooms/${targetRoom.id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--color-sapphire)'
            }}
          >
            <ChevronLeft size={16} /> Return to Room Overview
          </Link>
        </div>

        <div style={{ maxWidth: '650px', marginBottom: '2.5rem' }}>
          <span className="section-eyebrow">FINAL RESERVATION STEP</span>
          <h1>Confirm & Guarantee Stay</h1>
          <p style={{ marginTop: '0.4rem', color: 'var(--color-text-secondary)' }}>
            Complete guest details and secure your sanctuary. Your digital contactless QR keycard will be generated instantly.
          </p>
        </div>

        {/* Prototype Payment Simulator Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-petal-light)',
            border: '1px solid var(--color-petal-dark)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.4rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#592957' }}>
              ⚡ Payment Gateway Sandbox Simulator
            </span>
            <p style={{ fontSize: '0.8rem', color: '#6A3768', margin: 0 }}>
              Test both success & rejection flows without real credit cards.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setSimulatedState('success')}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 700,
                backgroundColor: simulatedState === 'success' ? '#059669' : '#FFFFFF',
                color: simulatedState === 'success' ? '#FFFFFF' : '#059669',
                border: '1px solid #059669',
                cursor: 'pointer'
              }}
            >
              Simulate Success
            </button>
            <button
              type="button"
              onClick={() => setSimulatedState('fail')}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 700,
                backgroundColor: simulatedState === 'fail' ? '#DC2626' : '#FFFFFF',
                color: simulatedState === 'fail' ? '#FFFFFF' : '#DC2626',
                border: '1px solid #DC2626',
                cursor: 'pointer'
              }}
            >
              Simulate Failure
            </button>
          </div>
        </div>

        {errorMessage && (
          <div
            style={{
              backgroundColor: 'var(--color-danger-bg)',
              border: '1px solid var(--color-danger-border)',
              color: 'var(--color-danger)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleCompleteBooking}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 380px',
              gap: '3rem',
              alignItems: 'start'
            }}
            className="checkout-layout"
          >
            {/* Left Column: Guest & Payment Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Section 1: Guest Details */}
              <div
                className="checkout-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.2rem', color: 'var(--color-midnight)' }}>
                  1. Primary Guest Details
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={guestName}
                      onChange={e => setGuestName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address (for Digital Pass)</label>
                    <input
                      type="email"
                      className="form-input"
                      value={guestEmail}
                      onChange={e => setGuestEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mobile Telephone</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={guestPhone}
                      onChange={e => setGuestPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Estimated Arrival Time</label>
                    <select className="form-select">
                      <option>3:00 PM – 5:00 PM (Standard)</option>
                      <option>5:00 PM – 8:00 PM</option>
                      <option>Late Arrival (After 8:00 PM)</option>
                      <option>Early Arrival Request</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Special In-Suite Requests & Pillow Preferences</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="E.g., High floor requested, extra hypoallergenic pillows, anniversary welcome chilled champagne..."
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                  />
                </div>
              </div>

              {/* Section 2: Payment Method */}
              <div
                className="checkout-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-midnight)', margin: 0 }}>
                    2. Payment & Guarantee
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
                    <Lock size={14} /> 256-bit Encrypted
                  </div>
                </div>

                {/* Method Selector Tabs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'apple_pay', label: 'Apple Pay', icon: ShieldCheck },
                    { id: 'desk', label: 'Pay at Desk', icon: MapPin }
                  ].map(m => {
                    const MIcon = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        style={{
                          padding: '0.8rem',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--color-sapphire)' : '1px solid var(--color-border)',
                          backgroundColor: isSelected ? 'var(--color-bridal-blue)' : '#FFFFFF',
                          color: isSelected ? 'var(--color-sapphire)' : 'var(--color-midnight)',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.4rem',
                          cursor: 'pointer'
                        }}
                      >
                        <MIcon size={18} />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === 'card' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="form-label">Demonstration Card Number</label>
                      <input
                        type="text"
                        className="form-input"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Expiration</label>
                      <input
                        type="text"
                        className="form-input"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVC / Security Code</label>
                      <input
                        type="text"
                        className="form-input"
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'apple_pay' && (
                  <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--color-lace)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-midnight)' }}>
                      Ready to authenticate with Apple Pay Touch ID / Face ID.
                    </p>
                  </div>
                )}

                {paymentMethod === 'desk' && (
                  <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-lace)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-midnight-muted)' }}>
                      A temporary hold will be placed on your booking. Full settlement will be processed during reception check-in.
                    </p>
                  </div>
                )}

                <div style={{ marginTop: '1.2rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={e => setAgreeTerms(e.target.checked)}
                      style={{ accentColor: 'var(--color-sapphire)' }}
                    />
                    <span>
                      I agree to the Lumora Stay Policies, 48-hour cancellation terms, and privacy protocols.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Reservation Summary Card */}
            <aside
              className="checkout-summary-aside"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '1.8rem',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
                position: 'sticky',
                top: '120px'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.2rem', color: 'var(--color-midnight)' }}>
                Reservation Summary
              </h3>

              {/* Room Snapshot */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.4rem', paddingBottom: '1.2rem', borderBottom: '1px solid var(--color-border)' }}>
                <img
                  src={targetRoom.images[0]}
                  alt={targetRoom.name}
                  style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                />
                <div>
                  <span className="badge badge-sapphire" style={{ fontSize: '0.68rem', marginBottom: '0.2rem' }}>
                    {targetRoom.category}
                  </span>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-midnight)' }}>
                    {targetRoom.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    Room {targetRoom.roomNumber} • {targetRoom.bedType}
                  </div>
                </div>
              </div>

              {/* Dates & Guests */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.86rem', marginBottom: '1.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Check-in:</span>
                  <strong style={{ color: 'var(--color-midnight)' }}>{checkIn} (3:00 PM)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Check-out:</span>
                  <strong style={{ color: 'var(--color-midnight)' }}>{checkOut} (11:00 AM)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Duration:</span>
                  <strong style={{ color: 'var(--color-midnight)' }}>{nights} {nights === 1 ? 'Night' : 'Nights'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Guests:</span>
                  <strong style={{ color: 'var(--color-midnight)' }}>{adults} Adult{adults > 1 ? 's' : ''}, {children} Children</strong>
                </div>
              </div>

              {/* Financial Calculation */}
              <div
                style={{
                  backgroundColor: 'var(--color-lace)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.1rem',
                  fontSize: '0.88rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>${targetRoom.pricePerNight} × {nights} nights</span>
                  <span>${subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Estimated Hospitality Taxes (12%)</span>
                  <span>${taxes}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-midnight)' }}>
                  <span>Total Amount</span>
                  <span>${total}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', height: '52px' }}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span>Securing Reservation...</span>
                ) : (
                  <>
                    <span>Confirm & Pay ${total}</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Instant confirmation • Contactless QR pass issued on submit
              </div>
            </aside>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .checkout-layout {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
          .checkout-summary-aside {
            position: static !important;
            width: 100% !important;
          }
        }
        @media (max-width: 640px) {
          .checkout-card, .checkout-summary-aside {
            padding: 1.25rem !important;
            border-radius: var(--radius-lg) !important;
          }
        }
      `}</style>
    </div>
  );
};
