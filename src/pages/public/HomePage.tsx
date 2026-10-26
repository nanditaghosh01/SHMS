import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHotel } from '../../context/HotelContext';
import { RoomCard } from '../../components/cards/RoomCard';
import {
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  Sparkles,
  KeyRound,
  Shield,
  Coffee,
  ArrowUpRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { rooms, searchCriteria, setSearchCriteria } = useHotel();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(searchCriteria.destination);
  const [checkIn, setCheckIn] = useState(searchCriteria.checkIn);
  const [checkOut, setCheckOut] = useState(searchCriteria.checkOut);
  const [adults, setAdults] = useState(searchCriteria.adults);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchCriteria(prev => ({
      ...prev,
      destination,
      checkIn,
      checkOut,
      adults
    }));
    navigate('/rooms');
  };

  const featuredRooms = rooms.slice(0, 6);

  const estates = [
    {
      id: 'monterey',
      name: 'Pacific Sanctuary',
      location: 'Monterey Coast, CA',
      tag: 'Ocean Horizon',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'aspen',
      name: 'Alpine Chalet',
      location: 'Aspen Highlands, CO',
      tag: 'Snow & Cedar',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'manhattan',
      name: 'Skyline Penthouse',
      location: 'Manhattan, NY',
      tag: 'Urban Stillness',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85'
    }
  ];

  const experiences = [
    {
      title: 'Thermal Baths',
      subtitle: 'Cedarwood Sauna & Spa',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Private Sailing',
      subtitle: 'Sunset Coastal Charters',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Artisanal Cellar',
      subtitle: 'Sommelier Pairings',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="home-page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', paddingBottom: '4rem' }}>
      {/* 1. CINEMATIC FULL-BLEED EDITORIAL HERO */}
      <section style={{ padding: '1rem 0 0' }}>
        <div className="container">
          <div
            className="home-hero-card"
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              minHeight: '520px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '3.5rem',
              color: '#FFFFFF'
            }}
          >
            {/* Visual Background */}
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85"
              alt="Lumora Sanctuary"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.6)'
              }}
            />

            {/* Top Minimal Tag */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-petal)'
                }}
              >
                LUMORA SANCTUARIES
              </span>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: 'rgba(255, 255, 255, 0.75)'
                }}
              >
                EST. 2026
              </span>
            </div>

            {/* Bottom Hero Typography & CTA */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '620px' }}>
              <h1
                style={{
                  fontSize: 'clamp(2.3rem, 6vw, 4.4rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  marginBottom: '1rem'
                }}
              >
                Sanctuary & Stillness.
              </h1>

              <p
                style={{
                  fontSize: '1.02rem',
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: '0 0 1.8rem 0',
                  fontWeight: 400,
                  letterSpacing: '0.01em'
                }}
              >
                Monterey Coast · Aspen Peaks · Manhattan Skyline
              </p>

              <div className="hero-cta-group" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <Link
                  to="/rooms"
                  className="btn btn-primary"
                  style={{
                    padding: '0.8rem 1.8rem',
                    fontSize: '0.95rem'
                  }}
                >
                  <span>Explore Suites</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/ai-recommendations"
                  className="btn btn-outline-white"
                  style={{
                    padding: '0.8rem 1.6rem',
                    fontSize: '0.95rem'
                  }}
                >
                  AI Match
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SLEEK MINIMAL HORIZONTAL SEARCH CAPSULE (RESPONSIVE) */}
      <section className="home-search-section" style={{ marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <form
            onSubmit={handleSearchSubmit}
            className="home-search-capsule"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '9999px',
              padding: '0.65rem 0.8rem 0.65rem 1.8rem',
              boxShadow: '0 16px 40px rgba(11, 25, 87, 0.08)',
              border: '1px solid rgba(11, 25, 87, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.2rem',
              flexWrap: 'wrap'
            }}
          >
            {/* Estate */}
            <div className="search-field" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: '150px' }}>
              <MapPin size={18} color="var(--color-sapphire)" style={{ flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                  Estate
                </span>
                <select
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  style={{ border: 'none', background: 'none', fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-midnight)', outline: 'none', cursor: 'pointer', width: '100%' }}
                >
                  <option value="Lumora Coastal Estate, Monterey">Monterey Coast</option>
                  <option value="Lumora Alpine Chalet, Aspen">Aspen Chalet</option>
                  <option value="Lumora Metropolitan, Manhattan">Manhattan Loft</option>
                </select>
              </div>
            </div>

            <div className="search-divider" style={{ width: '1px', height: '24px', backgroundColor: 'rgba(11, 25, 87, 0.08)' }} />

            {/* Check-In */}
            <div className="search-field" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Calendar size={18} color="var(--color-sapphire)" style={{ flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                  Check-In
                </span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  style={{ border: 'none', background: 'none', fontWeight: 600, fontSize: '0.84rem', color: 'var(--color-midnight)', outline: 'none' }}
                />
              </div>
            </div>

            <div className="search-divider" style={{ width: '1px', height: '24px', backgroundColor: 'rgba(11, 25, 87, 0.08)' }} />

            {/* Check-Out */}
            <div className="search-field" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Calendar size={18} color="var(--color-sapphire)" style={{ flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                  Check-Out
                </span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  style={{ border: 'none', background: 'none', fontWeight: 600, fontSize: '0.84rem', color: 'var(--color-midnight)', outline: 'none' }}
                />
              </div>
            </div>

            <div className="search-divider" style={{ width: '1px', height: '24px', backgroundColor: 'rgba(11, 25, 87, 0.08)' }} />

            {/* Guests */}
            <div className="search-field" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Users size={18} color="var(--color-sapphire)" style={{ flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                  Guests
                </span>
                <select
                  value={adults}
                  onChange={e => setAdults(Number(e.target.value))}
                  style={{ border: 'none', background: 'none', fontWeight: 600, fontSize: '0.84rem', color: 'var(--color-midnight)', outline: 'none', cursor: 'pointer' }}
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4+ Guests</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary search-btn"
              style={{ padding: '0.7rem 1.8rem', borderRadius: '9999px', fontSize: '0.9rem' }}
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* 3. THREE VISUAL ESTATES (IMAGE-LED, ZERO ESSAYS) */}
      <section>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.8rem' }}>
            <h2 style={{ fontSize: '1.7rem', color: 'var(--color-midnight)', margin: 0 }}>
              Destinations
            </h2>
            <Link
              to="/rooms"
              style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-sapphire)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <span>All Locations</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {estates.map(item => (
              <Link
                key={item.id}
                to="/rooms"
                style={{
                  position: 'relative',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  height: '340px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.8rem',
                  color: '#FFFFFF',
                  textDecoration: 'none'
                }}
                className="estate-card"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.7)',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="estate-img"
                />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--color-petal)',
                      display: 'block',
                      marginBottom: '0.3rem'
                    }}
                  >
                    {item.tag}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', margin: '0 0 0.2rem 0', fontWeight: 700 }}>
                    {item.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.6rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                      {item.location}
                    </span>
                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF'
                      }}
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <style>{`
            .estate-card:hover .estate-img {
              transform: scale(1.06);
            }
          `}</style>
        </div>
      </section>

      {/* 4. FEATURED SUITES (CLEAN GALLERY, NO TEXT WALLS) */}
      <section>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '1.8rem'
            }}
          >
            <h2 style={{ fontSize: '1.7rem', color: 'var(--color-midnight)', margin: 0 }}>
              Sanctuaries
            </h2>
            <Link
              to="/rooms"
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--color-sapphire)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <span>View all ({rooms.length})</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem'
            }}
          >
            {featuredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. THREE CURATED EXPERIENCES (MINIMAL, HIGH-AESTHETIC) */}
      <section>
        <div className="container">
          <div style={{ marginBottom: '1.8rem' }}>
            <h2 style={{ fontSize: '1.7rem', color: 'var(--color-midnight)', margin: 0 }}>
              Experiences
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  height: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.6rem',
                  color: '#FFFFFF'
                }}
                className="exp-card"
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.65)',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="exp-img"
                />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: '0 0 0.2rem 0', fontWeight: 700 }}>
                    {exp.title}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                    {exp.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <style>{`
            .exp-card:hover .exp-img {
              transform: scale(1.06);
            }
          `}</style>
        </div>
      </section>

      {/* 6. FOUR MINIMAL SIGNALS (ICONS & SINGLE TITLES) */}
      <section>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              padding: '1.8rem 0',
              borderTop: '1px solid rgba(11, 25, 87, 0.08)',
              borderBottom: '1px solid rgba(11, 25, 87, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Sparkles size={18} color="var(--color-sapphire)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-midnight)' }}>
                Personalized AI Match
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <KeyRound size={18} color="var(--color-sapphire)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-midnight)' }}>
                Digital QR Arrival
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Shield size={18} color="var(--color-sapphire)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-midnight)' }}>
                Guaranteed Best Rates
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Coffee size={18} color="var(--color-sapphire)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-midnight)' }}>
                24/7 Suite Concierge
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM EDITORIAL PANORAMA */}
      <section>
        <div className="container">
          <div
            style={{
              position: 'relative',
              borderRadius: '26px',
              overflow: 'hidden',
              height: '360px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '2rem'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85"
              alt="Lumora Architecture"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.6)'
              }}
            />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '520px' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-petal)',
                  display: 'block',
                  marginBottom: '0.6rem'
                }}
              >
                YOUR SANCTUARY AWAITS
              </span>

              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#FFFFFF', fontWeight: 700, margin: 0, lineHeight: 1.15 }}>
                Stay beautifully.
              </h2>

              <div style={{ marginTop: '1.5rem' }}>
                <Link
                  to="/rooms"
                  className="btn btn-primary"
                  style={{ padding: '0.75rem 2rem' }}
                >
                  Reserve a Suite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .home-page-wrapper {
            gap: 3.5rem !important;
          }
          .home-hero-card {
            padding: 2.2rem 1.25rem 2rem !important;
            border-radius: 20px !important;
            min-height: 460px !important;
          }
          .home-search-section {
            margin-top: -1.75rem !important;
          }
          .home-search-capsule {
            border-radius: 20px !important;
            padding: 1.25rem 1.1rem !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.75rem !important;
          }
          .search-divider {
            display: none !important;
          }
          .search-field {
            padding: 0.55rem 0.85rem !important;
            background-color: var(--color-lace) !important;
            border-radius: 12px !important;
            width: 100% !important;
          }
          .search-btn {
            width: 100% !important;
            border-radius: 12px !important;
            height: 46px !important;
            font-size: 0.95rem !important;
          }
          .hero-cta-group {
            width: 100%;
          }
          .hero-cta-group .btn {
            flex: 1 1 140px;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

