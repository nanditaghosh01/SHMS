import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ padding: '2.5rem 0 6rem' }}>
      <div className="container">
        {/* Minimal Hero Header */}
        <div style={{ maxWidth: '640px', marginBottom: '3rem' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--color-sapphire)',
              display: 'block',
              marginBottom: '0.4rem'
            }}
          >
            PHILOSOPHY
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: 'var(--color-midnight)', lineHeight: 1.05, marginBottom: '0.8rem', fontWeight: 800 }}>
            Silence & Stillness.
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', margin: 0, fontWeight: 400 }}>
            Architecture crafted for rest. Technology that stays out of the way.
          </p>
        </div>

        {/* Large Architectural Photography */}
        <div
          className="about-hero-image"
          style={{
            borderRadius: '24px',
            overflow: 'hidden',
            height: '440px',
            boxShadow: '0 12px 32px rgba(11, 25, 87, 0.06)',
            marginBottom: '3rem'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85"
            alt="Lumora Architecture"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* 3 Minimal Pillars - Zero Paragraph Essays */}
        <div
          className="about-pillars-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(11, 25, 87, 0.08)'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-sapphire)', display: 'block', marginBottom: '0.8rem' }}>
              01 / ACOUSTIC
            </span>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-midnight)', marginBottom: '0.3rem' }}>
              Stillness
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
              Triple-glazed acoustic glass & natural sound dampening
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(11, 25, 87, 0.08)'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-sapphire)', display: 'block', marginBottom: '0.8rem' }}>
              02 / MATERIALS
            </span>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-midnight)', marginBottom: '0.3rem' }}>
              Craft
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
              Natural white oak, Italian marble & raw linen
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(11, 25, 87, 0.08)'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-sapphire)', display: 'block', marginBottom: '0.8rem' }}>
              03 / ARRIVAL
            </span>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-midnight)', marginBottom: '0.3rem' }}>
              Frictionless
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
              Contactless mobile QR check-in straight to your door
            </p>
          </div>
        </div>

        {/* Minimal Action */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/rooms" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
            <span>Explore All Suites</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
