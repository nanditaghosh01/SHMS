import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { RoomCard } from '../../components/cards/RoomCard';
import { Sparkles } from 'lucide-react';

export const AiRecommendationsPage: React.FC = () => {
  const { rooms } = useHotel();

  const [purpose, setPurpose] = useState<string>('relaxation');
  const [budgetTier, setBudgetTier] = useState<string>('comfort');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['Private Balcony']);

  const amenityOptions = [
    'Private Balcony',
    'Deep Soaking Tub',
    'Club Lounge Access',
    'Rainforest Shower',
    'Dedicated 24/7 Butler'
  ];

  const toggleAmenity = (item: string) => {
    setSelectedAmenities(prev =>
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  const rankedRooms = useMemo(() => {
    return rooms
      .map(room => {
        let score = 70;

        if (budgetTier === 'essential' && room.pricePerNight <= 250) score += 20;
        else if (budgetTier === 'comfort' && room.pricePerNight >= 250 && room.pricePerNight <= 600) score += 20;
        else if (budgetTier === 'luxury' && room.pricePerNight > 500) score += 20;

        if (purpose === 'relaxation' && (room.category === 'Deluxe' || room.amenities.includes('Rainforest Shower'))) score += 10;
        else if (purpose === 'business' && room.category === 'Executive') score += 10;
        else if (purpose === 'romance' && (room.category === 'Suite' || room.category === 'Presidential')) score += 10;

        const matchedAmenities = selectedAmenities.filter(a =>
          room.amenities.some(r => r.toLowerCase().includes(a.toLowerCase()))
        );
        score += matchedAmenities.length * 5;

        return {
          room,
          score: Math.min(99, score)
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [rooms, budgetTier, purpose, guestCount, selectedAmenities]);

  return (
    <div style={{ padding: '2.5rem 0 6rem' }}>
      <div className="container">
        {/* Minimal Header */}
        <div style={{ maxWidth: '640px', marginBottom: '2.5rem' }}>
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
            AI MATCH
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--color-midnight)', margin: 0, fontWeight: 700 }}>
            Suite Matchmaker
          </h1>
        </div>

        {/* Minimal Controls */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid rgba(11, 25, 87, 0.08)',
            boxShadow: '0 8px 24px rgba(11, 25, 87, 0.04)',
            marginBottom: '3rem'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              marginBottom: '1.5rem'
            }}
          >
            <div>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Vibe</label>
              <select
                className="form-select"
                value={purpose}
                onChange={e => setPurpose(e.target.value)}
              >
                <option value="relaxation">Tranquility & Spa</option>
                <option value="business">Executive Work</option>
                <option value="romance">Romance & Sunset</option>
                <option value="family">Family Escape</option>
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Tier</label>
              <select
                className="form-select"
                value={budgetTier}
                onChange={e => setBudgetTier(e.target.value)}
              >
                <option value="essential">Essential ($180–$250)</option>
                <option value="comfort">Comfort Luxury ($250–$600)</option>
                <option value="luxury">Presidential ($600+)</option>
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Guests</label>
              <select
                className="form-select"
                value={guestCount}
                onChange={e => setGuestCount(Number(e.target.value))}
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4+ Guests</option>
              </select>
            </div>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '0.6rem' }}>
              Desired Highlights
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {amenityOptions.map(amenity => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: '9999px',
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? 'var(--color-midnight)' : 'var(--color-lace)',
                      color: isSelected ? '#FFFFFF' : 'var(--color-midnight)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Sparkles size={18} color="var(--color-sapphire)" />
            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-midnight)', margin: 0, fontWeight: 700 }}>
              Curated Matches
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.25rem'
            }}
          >
            {rankedRooms.slice(0, 3).map(({ room, score }) => (
              <div key={room.id} style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 10,
                    backgroundColor: 'rgba(11, 25, 87, 0.9)',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    backdropFilter: 'blur(6px)'
                  }}
                >
                  {score}% Match
                </div>
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
