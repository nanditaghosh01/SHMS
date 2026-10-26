import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Reservations');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '2.5rem 0 6rem' }}>
      <div className="container">
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
            CONCIERGE
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--color-midnight)', margin: 0, fontWeight: 700 }}>
            Contact & Inquiries
          </h1>
        </div>

        <div
          className="contact-layout-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}
        >
          {/* Contact Details Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '1.6rem',
                border: '1px solid rgba(11, 25, 87, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-sapphire)', marginBottom: '0.5rem' }}>
                <MapPin size={18} />
                <h3 style={{ fontSize: '1.05rem', color: 'var(--color-midnight)', margin: 0 }}>Estate Address</h3>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                Lumora Coastal Estate · One Lumora Way<br />
                Highway 1, Monterey Coastline, CA 93940
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '1.6rem',
                border: '1px solid rgba(11, 25, 87, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-sapphire)', marginBottom: '0.5rem' }}>
                <Phone size={18} />
                <h3 style={{ fontSize: '1.05rem', color: 'var(--color-midnight)', margin: 0 }}>Direct Concierge</h3>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                +1 (800) 586-6721 · concierge@lumora.com<br />
                Front Desk 24/7 Available
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '1.6rem',
                border: '1px solid rgba(11, 25, 87, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-sapphire)', marginBottom: '0.5rem' }}>
                <Clock size={18} />
                <h3 style={{ fontSize: '1.05rem', color: 'var(--color-midnight)', margin: 0 }}>Service Hours</h3>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                Reception: 24/7 · Concierge Desk: 6:00 AM – 11:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form Right */}
          <div
            className="contact-card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '2.2rem',
              border: '1px solid rgba(11, 25, 87, 0.08)',
              boxShadow: '0 8px 24px rgba(11, 25, 87, 0.04)'
            }}
          >
            <h2 style={{ fontSize: '1.3rem', color: 'var(--color-midnight)', marginBottom: '1.2rem', fontWeight: 700 }}>
              Send an Inquiry
            </h2>

            {submitted ? (
              <div
                style={{
                  backgroundColor: 'var(--color-success-bg)',
                  border: '1px solid var(--color-success-border)',
                  color: 'var(--color-success)',
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={32} style={{ margin: '0 auto 0.6rem' }} />
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Inquiry Sent</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-midnight-muted)', margin: 0 }}>
                  Our concierge team will respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '1rem' }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Topic</label>
                  <select
                    className="form-select"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                  >
                    <option value="Reservations">Reservations</option>
                    <option value="Private Events">Private Events</option>
                    <option value="Billing">Billing & Folio</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Message</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="How may we assist?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
                >
                  <Send size={15} />
                  <span>Send</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
