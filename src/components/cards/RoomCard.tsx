import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Room } from '../../types';

interface RoomCardProps {
  room: Room;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <article
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(11, 25, 87, 0.08)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column'
      }}
      className="lumora-editorial-card"
    >
      {/* High-Resolution Architectural Photography */}
      <Link
        to={`/rooms/${room.id}`}
        style={{
          position: 'relative',
          height: '260px',
          overflow: 'hidden',
          display: 'block',
          backgroundColor: '#EDE9E3'
        }}
        aria-label={`View ${room.name}`}
      >
        <img
          src={room.images[0]}
          alt={room.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="card-media"
        />

        {/* Minimal Floating Category Pill */}
        <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              color: 'var(--color-midnight)',
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(11, 25, 87, 0.08)'
            }}
          >
            {room.category}
          </span>
        </div>

        {/* Minimal Subtle Status Pill if occupied */}
        {room.status === 'occupied' && (
          <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                backgroundColor: 'rgba(11, 25, 87, 0.85)',
                color: '#FFFFFF',
                padding: '0.25rem 0.6rem',
                borderRadius: '9999px',
                backdropFilter: 'blur(6px)'
              }}
            >
              Occupied
            </span>
          </div>
        )}
      </Link>

      {/* Minimal Card Details - Zero Paragraphs, Zero Checkbox Chips */}
      <div style={{ padding: '1.4rem 1.4rem 1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3
          style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--color-midnight)',
            lineHeight: 1.3,
            marginBottom: '0.35rem'
          }}
        >
          <Link
            to={`/rooms/${room.id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {room.name}
          </Link>
        </h3>

        {/* Single clean line of specs */}
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            marginBottom: '1.2rem',
            letterSpacing: '0.02em',
            margin: '0 0 1.2rem 0'
          }}
        >
          {room.capacity.adults + (room.capacity.children || 0)} Guests · {room.bedType} · {room.sizeSqFt} sq ft
        </p>

        {/* Price & Action Link */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.9rem',
            borderTop: '1px solid rgba(11, 25, 87, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-midnight)' }}>
              ${room.pricePerNight}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginLeft: '0.3rem' }}>
              / night
            </span>
          </div>

          <Link
            to={`/rooms/${room.id}`}
            className="card-action-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: 'var(--color-sapphire)',
              textDecoration: 'none'
            }}
          >
            <span>Reserve</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <style>{`
        .lumora-editorial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(11, 25, 87, 0.08);
          border-color: rgba(66, 107, 194, 0.25);
        }
        .lumora-editorial-card:hover .card-media {
          transform: scale(1.05);
        }
        .card-action-link:hover {
          color: var(--color-midnight) !important;
        }
      `}</style>
    </article>
  );
};
