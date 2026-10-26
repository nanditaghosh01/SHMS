import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useHotel } from '../../context/HotelContext';
import {
  Users,
  Bed,
  Star,
  Check,
  Calendar,
  Shield,
  ArrowRight,
  Wifi,
  Coffee,
  Sparkles,
  Clock,
  QrCode,
  MapPin,
  ChevronLeft
} from 'lucide-react';

export const RoomDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { rooms, searchCriteria } = useHotel();

  const room = rooms.find(r => r.id === id) || rooms[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState(searchCriteria.checkIn);
  const [checkOut, setCheckOut] = useState(searchCriteria.checkOut);
  const [adults, setAdults] = useState(searchCriteria.adults || 2);
  const [children, setChildren] = useState(searchCriteria.children || 0);
  const [dateError, setDateError] = useState('');

  // Calculate nights
  const calculateNights = () => {
    const inDate = new Date(checkIn).getTime();
    const outDate = new Date(checkOut).getTime();
    if (outDate <= inDate) return 0;
    return Math.max(1, Math.round((outDate - inDate) / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights();
  const subtotal = room ? room.pricePerNight * (nights || 1) : 0;
  const taxes = Number((subtotal * 0.12).toFixed(2));
  const total = Number((subtotal + taxes).toFixed(2));

  const handleProceedToBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (nights <= 0) {
      setDateError('Check-out date must be strictly after check-in date.');
      return;
    }
    setDateError('');
    navigate(`/booking/checkout?roomId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`);
  };

  if (!room) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Sanctuary Not Found</h2>
        <Link to="/rooms" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to All Rooms
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            to="/rooms"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--color-sapphire)'
            }}
          >
            <ChevronLeft size={16} /> Back to Accommodations Directory
          </Link>
        </div>

        {/* Title & Metadata Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-sapphire">{room.category} Category</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Room {room.roomNumber} • Floor {room.floor}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', color: 'var(--color-midnight)' }}>
              {room.name}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#FFFFFF',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <Star size={16} fill="#F59E0B" color="#F59E0B" />
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{room.rating}</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>({room.reviewsCount} reviews)</span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-midnight)' }}>
                  ${room.pricePerNight}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>/ night</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Direct reservation guarantee</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div style={{ marginBottom: '2.5rem' }}>
          {/* Main Large Image */}
          <div
            className="room-details-main-img"
            style={{
              height: '480px',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border)',
              marginBottom: '1rem',
              backgroundColor: '#CBD5E1'
            }}
          >
            <img
              src={room.images[activeImageIndex] || room.images[0]}
              alt={room.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.3s' }}
            />
          </div>

          {/* Thumbnails */}
          {room.images.length > 1 && (
            <div className="room-details-thumbnails mobile-scroll-row" style={{ display: 'flex', gap: '0.75rem' }}>
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '120px',
                    height: '80px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '2.5px solid var(--color-sapphire)' : '1px solid var(--color-border)',
                    opacity: activeImageIndex === idx ? 1 : 0.65,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    padding: 0,
                    flexShrink: 0
                  }}
                >
                  <img src={img} alt={`${room.name} thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Detail Layout: Content Left, Booking Sticky Widget Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '3rem',
            alignItems: 'start'
          }}
          className="details-layout"
        >
          {/* Left Details */}
          <div>
            {/* Quick Specs Bar */}
            <div
              className="room-specs-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1rem',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '1.4rem',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xs)',
                marginBottom: '2.5rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Occupancy</span>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-midnight)', marginTop: '0.2rem' }}>
                  Up to {room.capacity.adults + room.capacity.children} Guests
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Bed Type</span>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-midnight)', marginTop: '0.2rem' }}>
                  {room.bedType}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Room Dimensions</span>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-midnight)', marginTop: '0.2rem' }}>
                  {room.sizeSqFt} sq ft ({Math.round(room.sizeSqFt * 0.0929)} m²)
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Floor Placement</span>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-midnight)', marginTop: '0.2rem' }}>
                  Floor Level {room.floor}
                </div>
              </div>
            </div>

            {/* Architectural Overview */}
            <div style={{ marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-midnight-muted)', margin: 0 }}>
                {room.description}
              </p>
            </div>

            {/* Architectural Features */}
            {room.features && room.features.length > 0 && (
              <div style={{ marginBottom: '2.8rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Signature Architectural Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.9rem' }}>
                  {room.features.map((feat, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        backgroundColor: 'var(--color-bridal-blue)',
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: 'var(--color-midnight)'
                      }}
                    >
                      <Sparkles size={16} color="var(--color-sapphire)" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comprehensive Amenities Grid */}
            <div style={{ marginBottom: '2.8rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.2rem' }}>Included In-Suite Amenities</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
                {room.amenities.map((amenity, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      fontSize: '0.92rem',
                      color: 'var(--color-midnight-muted)'
                    }}
                  >
                    <Check size={16} color="var(--color-sapphire)" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Policies & QR Notice */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '1.8rem',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-midnight)' }}>
                Stay Policies & Digital Arrival
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Clock size={16} color="var(--color-sapphire)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Check-in: 3:00 PM</strong>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Early check-in upon request</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Clock size={16} color="var(--color-sapphire)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Check-out: 11:00 AM</strong>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Late departure available for Club</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <QrCode size={16} color="var(--color-sapphire)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Contactless Key</strong>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Digital QR delivered upon booking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sticky Booking Box */}
          <aside
            className="room-booking-aside"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-lg)',
              position: 'sticky',
              top: '120px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1.2rem', borderBottom: '1px solid var(--color-border)' }}>
              <div>
                <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-midnight)' }}>
                  ${room.pricePerNight}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}> / night</span>
              </div>
              <span className="badge badge-success">Available</span>
            </div>

            {dateError && (
              <div
                style={{
                  backgroundColor: 'var(--color-danger-bg)',
                  border: '1px solid var(--color-danger-border)',
                  color: 'var(--color-danger)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  marginBottom: '1rem'
                }}
              >
                ⚠️ {dateError}
              </div>
            )}

            <form onSubmit={handleProceedToBooking}>
              <div className="form-group">
                <label className="form-label">Check-in Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Check-out Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.4rem' }}>
                <div>
                  <label className="form-label">Adults</label>
                  <select
                    className="form-select"
                    value={adults}
                    onChange={e => setAdults(Number(e.target.value))}
                  >
                    {[...Array(room.capacity.adults + 1)].map((_, i) => i > 0 && (
                      <option key={i} value={i}>{i} Adult{i > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Children</label>
                  <select
                    className="form-select"
                    value={children}
                    onChange={e => setChildren(Number(e.target.value))}
                  >
                    {[...Array(room.capacity.children + 1)].map((_, i) => (
                      <option key={i} value={i}>{i} Child{i > 1 ? 'ren' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Breakdown Calculation */}
              <div
                style={{
                  backgroundColor: 'var(--color-lace)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.2rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.88rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--color-midnight-muted)' }}>
                    ${room.pricePerNight} × {nights} {nights === 1 ? 'night' : 'nights'}
                  </span>
                  <span style={{ fontWeight: 600 }}>${subtotal}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--color-midnight-muted)' }}>Estimated Hospitality Taxes (12%)</span>
                  <span style={{ fontWeight: 600 }}>${taxes}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.8rem', borderTop: '1px solid var(--color-border)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-midnight)' }}>
                  <span>Total Due</span>
                  <span>${total}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginBottom: '1rem' }}
                disabled={nights <= 0}
              >
                <span>Reserve Room {room.roomNumber}</span>
                <ArrowRight size={17} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
                🔒 Free cancellation up to 48 hours before check-in.
              </div>
            </form>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .details-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .room-booking-aside {
            position: static !important;
            width: 100% !important;
            padding: 1.5rem !important;
          }
        }
        @media (max-width: 768px) {
          .room-details-main-img {
            height: 270px !important;
            border-radius: var(--radius-lg) !important;
          }
          .room-details-thumbnails button {
            width: 80px !important;
            height: 56px !important;
          }
          .room-specs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};
