import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  to = '/'
}) => {
  const iconSizes = {
    sm: 32,
    md: 40,
    lg: 52
  };

  const textSizes = {
    sm: '1.15rem',
    md: '1.45rem',
    lg: '1.85rem'
  };

  const isDark = variant === 'dark';
  const textColor = isDark ? '#FFFFFF' : 'var(--color-midnight)';
  const tagColor = isDark ? 'rgba(255, 255, 255, 0.65)' : 'var(--color-sapphire)';

  const dimension = iconSizes[size];

  const content = (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
      {/* Exact stylized folded L mark based on user-provided logo */}
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 6px rgba(11,25,87,0.08))' }}
      >
        <defs>
          <linearGradient id="lumoraRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6F3962" />
            <stop offset="45%" stopColor="#9C648B" />
            <stop offset="100%" stopColor="#C596B9" />
          </linearGradient>
          <linearGradient id="lumoraRibbonFold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#55244A" />
            <stop offset="60%" stopColor="#8F547D" />
            <stop offset="100%" stopColor="#B782A5" />
          </linearGradient>
        </defs>

        {/* Circular Emblem Base */}
        <circle cx="50" cy="50" r="48" fill={isDark ? '#16225E' : '#FDFBF9'} stroke={isDark ? '#426BC2' : '#E8D9ED'} strokeWidth="2.5" />

        {/* Stylized origami/folded ribbon 'L' */}
        <g transform="translate(18, 14) scale(0.64)">
          {/* Vertical Leaf/Ribbon Stem */}
          <path
            d="M 12 10 C 12 6, 46 6, 46 12 L 46 72 C 34 76, 12 70, 12 50 Z"
            fill="url(#lumoraRibbonGrad)"
          />
          {/* Sweeping Horizontal Base Fold */}
          <path
            d="M 12 50 C 18 78, 40 84, 52 84 C 70 84, 88 70, 96 60 C 86 66, 68 64, 52 64 C 40 64, 25 60, 12 50 Z"
            fill="url(#lumoraRibbonFold)"
          />
          {/* Inner Dimensional Lip */}
          <path
            d="M 46 62 C 58 65, 76 63, 92 61 C 82 72, 65 84, 52 84 C 45 84, 38 80, 32 74 C 41 70, 46 66, 46 62 Z"
            fill="#B987AC"
            opacity="0.9"
          />
        </g>
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: textSizes[size],
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: textColor,
            textTransform: 'uppercase'
          }}
        >
          LUMORA
        </span>
        {showTagline && (
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: size === 'sm' ? '0.62rem' : '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: tagColor,
              textTransform: 'uppercase',
              marginTop: '2px'
            }}
          >
            Smart Hospitality
          </span>
        )}
      </div>
    </div>
  );

  return to ? <Link to={to} style={{ textDecoration: 'none' }}>{content}</Link> : content;
};
