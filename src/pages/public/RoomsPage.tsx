import React, { useState, useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { RoomCard } from '../../components/cards/RoomCard';

export const RoomsPage: React.FC = () => {
  const { rooms } = useHotel();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');

  const categories = ['all', 'Standard', 'Deluxe', 'Executive', 'Suite', 'Presidential'];

  const filteredRooms = useMemo(() => {
    return rooms
      .filter(room => {
        if (selectedCategory !== 'all' && room.category !== selectedCategory) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
        if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [rooms, selectedCategory, sortBy]);

  return (
    <div style={{ padding: '2.5rem 0 6rem' }}>
      <div className="container">
        {/* Header - Minimal, No Paragraphs */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.2rem', marginBottom: '2rem' }}>
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
              ACCOMMODATIONS
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--color-midnight)', margin: 0, fontWeight: 700 }}>
              Suites & Residences
            </h1>
          </div>

          {/* Minimal Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.84rem',
                borderRadius: '9999px',
                border: '1px solid rgba(11, 25, 87, 0.1)',
                backgroundColor: '#FFFFFF',
                color: 'var(--color-midnight)',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="relevance">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Minimal Horizontal Category Pills */}
        <div
          className="mobile-scroll-row"
          style={{
            marginBottom: '2rem'
          }}
        >
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? 'var(--color-midnight)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--color-midnight)',
                  border: isSelected ? '1px solid var(--color-midnight)' : '1px solid rgba(11, 25, 87, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {cat === 'all' ? 'All Suites' : cat}
              </button>
            );
          })}
        </div>

        {/* Suites Grid */}
        <div
          className="rooms-directory-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2.25rem'
          }}
        >
          {filteredRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .rooms-directory-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};
