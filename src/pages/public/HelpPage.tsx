import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  QrCode,
  Calendar,
  CreditCard,
  Coffee,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does contactless QR check-in work?',
      a: 'Your encrypted QR pass is generated instantly upon booking. Scan it at the estate entrance or elevator scanner to activate your digital room key.'
    },
    {
      q: 'What is the cancellation policy?',
      a: 'Complimentary cancellations or date changes are permitted up to 48 hours prior to check-in with a full instant refund.'
    },
    {
      q: 'What are the check-in and check-out times?',
      a: 'Check-in is at 3:00 PM and check-out is at 11:00 AM. Early arrivals and late check-outs can be requested through the guest concierge.'
    },
    {
      q: 'How do I request in-suite dining or housekeeping?',
      a: 'Order directly from the Services tab on your device. Requests are dispatched immediately with live status updates.'
    },
    {
      q: 'How does the system prevent double-booking?',
      a: 'Our real-time reservation engine locks booked date ranges across all rooms to prevent overlapping bookings.'
    }
  ];

  return (
    <div style={{ padding: '2.5rem 0 6rem' }}>
      <div className="container">
        {/* Header */}
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
            FAQS
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--color-midnight)', margin: 0, fontWeight: 700 }}>
            Frequently Asked Questions
          </h1>
        </div>

        {/* Quick Topic Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem'
          }}
        >
          {[
            { title: 'QR Check-In', icon: QrCode, link: '/qr-pass/bkg-1001' },
            { title: 'Reservations', icon: Calendar, link: '/my-bookings' },
            { title: 'Billing & Folios', icon: CreditCard, link: '/contact' },
            { title: 'Guest Services', icon: Coffee, link: '/services' }
          ].map((topic, i) => {
            const TIcon = topic.icon;
            return (
              <Link
                key={i}
                to={topic.link}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.4rem',
                  border: '1px solid rgba(11, 25, 87, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  textDecoration: 'none',
                  color: 'var(--color-midnight)',
                  transition: 'transform 0.2s'
                }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--color-bridal-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-sapphire)' }}>
                  <TIcon size={18} />
                </div>
                <h3 style={{ fontSize: '1rem', margin: 0, fontWeight: 700 }}>{topic.title}</h3>
              </Link>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div style={{ maxWidth: '780px', margin: '0 auto 3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid rgba(11, 25, 87, 0.08)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '1.2rem 1.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-midnight)' }}>
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp size={18} color="var(--color-sapphire)" /> : <ChevronDown size={18} color="var(--color-text-muted)" />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 1.4rem 1.2rem', color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Strip */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/contact" className="btn btn-secondary btn-sm" style={{ padding: '0.6rem 1.5rem' }}>
            <span>Need More Assistance? Contact Concierge</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
