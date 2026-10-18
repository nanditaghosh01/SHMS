import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { StatCard } from '../../components/cards/StatCard';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  Sparkles,
  Calendar,
  Info,
  ShieldCheck,
  Star
} from 'lucide-react';

export const ManagerDashboard: React.FC = () => {
  const { rooms, bookings, staff } = useHotel();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'quarter'>('30d');

  // Revenue & Occupancy Trend Data
  const trendData = [
    { date: 'Oct 01', actual: 78, forecast: 75, revenue: 14200 },
    { date: 'Oct 03', actual: 82, forecast: 80, revenue: 16800 },
    { date: 'Oct 05', actual: 88, forecast: 85, revenue: 19500 },
    { date: 'Oct 07', actual: 91, forecast: 89, revenue: 21400 },
    { date: 'Oct 09', actual: 86, forecast: 88, revenue: 18900 },
    { date: 'Oct 11', actual: 94, forecast: 92, revenue: 23800 },
    { date: 'Oct 13', actual: 92, forecast: 90, revenue: 22100 },
    // Predictive Period
    { date: 'Oct 15 (F)', actual: null, forecast: 95, revenue: 24500 },
    { date: 'Oct 17 (F)', actual: null, forecast: 98, revenue: 26800 },
    { date: 'Oct 19 (F)', actual: null, forecast: 89, revenue: 20200 },
    { date: 'Oct 21 (F)', actual: null, forecast: 91, revenue: 21900 }
  ];

  // Category Revenue Share Data
  const categoryData = [
    { name: 'Presidential Penthouse', value: 38, color: '#0B1957' },
    { name: 'Suites & Terraces', value: 32, color: '#426BC2' },
    { name: 'Executive Suites', value: 18, color: '#9E688E' },
    { name: 'Deluxe & Standard', value: 12, color: '#B5C4E5' }
  ];

  // Staff Efficiency
  const staffKpis = staff.map(s => ({
    name: s.name,
    role: s.role,
    score: (4.8 + (s.name.length % 3) * 0.08).toFixed(1),
    completed: s.tasksCompletedToday || 8
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Header & Date Range Selector */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="section-eyebrow">HOTEL MANAGEMENT EXECUTIVE INTELLIGENCE</span>
          <h2 style={{ fontSize: '1.45rem', color: 'var(--color-midnight)', margin: 0 }}>
            Revenue & Occupancy Analytics
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Real-time RevPAR metrics, category performance, and predictive demand forecasts.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: '#FFFFFF', padding: '0.3rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)' }}>
          {[
            { id: '7d', label: 'Last 7 Days' },
            { id: '30d', label: 'Last 30 Days' },
            { id: 'quarter', label: 'Q4 Forecast' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTimeRange(t.id as any)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: timeRange === t.id ? 700 : 500,
                backgroundColor: timeRange === t.id ? 'var(--color-sapphire)' : 'transparent',
                color: timeRange === t.id ? '#FFFFFF' : 'var(--color-text-secondary)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-4">
        <StatCard
          title="Average Daily Rate (ADR)"
          value="$468"
          subValue="per occupied room"
          change="+8.4% vs benchmark"
          trend="up"
          icon={DollarSign}
          iconColor="var(--color-sapphire)"
          bgVariant="white"
        />
        <StatCard
          title="RevPAR (Yield)"
          value="$424"
          subValue="per available room"
          change="+11.2% growth"
          trend="up"
          icon={TrendingUp}
          iconColor="#10B981"
          bgVariant="bridal"
        />
        <StatCard
          title="Average Occupancy"
          value="90.6%"
          subValue="estate average"
          change="+5.8% month-over-month"
          trend="up"
          icon={BarChart3}
          iconColor="var(--color-midnight)"
          bgVariant="white"
        />
        <StatCard
          title="Guest Satisfaction (NPS)"
          value="98.2%"
          subValue="4.92 / 5 average"
          change="Top 1% luxury tier"
          trend="up"
          icon={Star}
          iconColor="#F59E0B"
          bgVariant="petal"
        />
      </div>

      {/* Main Occupancy & Demand Forecasting Chart */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '2.2rem',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-midnight)', margin: 0 }}>
              Occupancy Trajectory & Forward-Looking Demand
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Historical actual occupancy compared with predictive automated forecasting.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '0.82rem', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--color-midnight)' }} />
              <span>Actual Occupancy (%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--color-sapphire)' }} />
              <span>Predictive Forecast (%)</span>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="actualGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#0B1957" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0B1957" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="forecastGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#426BC2" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#426BC2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,25,87,0.06)" />
              <XAxis dataKey="date" stroke="#727D9C" fontSize={12} />
              <YAxis domain={[60, 100]} stroke="#727D9C" fontSize={12} unit="%" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B1957', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '0.82rem' }}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#0B1957"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#actualGrad)"
                name="Actual Occupancy"
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#426BC2"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#forecastGrad)"
                name="Demand Forecast"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            marginTop: '1.2rem',
            padding: '0.8rem 1.2rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-bridal-blue)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.8rem',
            color: 'var(--color-midnight-muted)'
          }}
        >
          <Info size={16} color="var(--color-sapphire)" style={{ flexShrink: 0 }} />
          <span>
            <strong>Forecasting Methodology:</strong> Demonstration predictive projection based on historical seasonal velocity and booking lead times. Actual enterprise predictive accuracy relies on multi-year data integration and machine-learned demand curves.
          </span>
        </div>
      </div>

      {/* 2-Column Split: Revenue Share & Staff Performance */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem'
        }}
      >
        {/* Left: Room Category Revenue Share */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2.2rem',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-midnight)', marginBottom: '0.4rem' }}>
            Revenue Contribution by Category
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Presidential and Suite categories generate 70% of total guest room yield.
          </p>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Share']}
                  contentStyle={{ backgroundColor: '#0B1957', color: '#fff', borderRadius: '8px', border: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem', marginTop: '1rem' }}>
            {categoryData.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: c.color, flexShrink: 0 }} />
                <span style={{ color: 'var(--color-midnight-muted)' }}>{c.name}: <strong>{c.value}%</strong></span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Associate Performance Matrix */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2.2rem',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-midnight)', marginBottom: '0.4rem' }}>
            Team Operational Performance
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Associate resolution times and guest satisfaction indices.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {staffKpis.map((s, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem 1.2rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-lace)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-midnight)' }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>
                    {s.role} Associate • {s.completed} tasks fulfilled today
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#F59E0B', fontWeight: 700, fontSize: '0.92rem' }}>
                    <Star size={14} fill="#F59E0B" />
                    <span>{s.score} / 5</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>99% On-Time</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
