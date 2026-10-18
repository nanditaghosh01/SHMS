import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  bgVariant?: 'bridal' | 'petal' | 'white' | 'midnight';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subValue,
  change,
  trend = 'neutral',
  icon: Icon,
  iconColor = 'var(--color-sapphire)',
  bgVariant = 'white'
}) => {
  const getBg = () => {
    switch (bgVariant) {
      case 'bridal':
        return 'var(--color-bridal-blue)';
      case 'petal':
        return 'var(--color-petal-light)';
      case 'midnight':
        return 'var(--color-midnight)';
      default:
        return '#FFFFFF';
    }
  };

  const isDark = bgVariant === 'midnight';

  return (
    <div
      style={{
        backgroundColor: getBg(),
        borderRadius: 'var(--radius-lg)',
        padding: '1.4rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s',
        color: isDark ? '#FFFFFF' : 'inherit'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
        <span
          style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            color: isDark ? 'rgba(255,255,255,0.75)' : 'var(--color-midnight-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          {title}
        </span>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(66, 107, 194, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon size={20} color={isDark ? '#E9F3FF' : iconColor} />
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.2rem' }}>
          <span
            style={{
              fontSize: '1.9rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: isDark ? '#FFFFFF' : 'var(--color-midnight)',
              lineHeight: 1.1
            }}
          >
            {value}
          </span>
          {subValue && (
            <span style={{ fontSize: '0.85rem', color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--color-text-muted)' }}>
              {subValue}
            </span>
          )}
        </div>

        {change && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.76rem' }}>
            <span
              style={{
                fontWeight: 700,
                color: trend === 'up' ? '#10B981' : trend === 'down' ? '#EF4444' : 'var(--color-sapphire)'
              }}
            >
              {change}
            </span>
            <span style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--color-text-muted)' }}>
              vs last week
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
