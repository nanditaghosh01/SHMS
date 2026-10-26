import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { ServiceType, ServicePriority } from '../../types';
import {
  Coffee,
  Sparkles,
  Wrench,
  Compass,
  CheckCircle,
  Plus,
  Send
} from 'lucide-react';

export const GuestServicesPage: React.FC = () => {
  const { services, submitServiceRequest } = useHotel();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const [activeTab, setActiveTab] = useState<'catalog' | 'history'>('catalog');
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType>('room_service');

  // Form state
  const [formOpen, setFormOpen] = useState(false);
  const [guestName, setGuestName] = useState(user?.name || 'Eleanor Vance');
  const [roomNumber, setRoomNumber] = useState('101');
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [priority, setPriority] = useState<ServicePriority>('medium');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const serviceCategories = [
    {
      type: 'room_service' as ServiceType,
      title: 'Artisanal Dining',
      desc: 'In-suite breakfast, tapas & wine pairings',
      icon: Coffee,
      bg: 'var(--color-bridal-blue)'
    },
    {
      type: 'housekeeping' as ServiceType,
      title: 'Turndown & Linens',
      desc: 'Fresh towels, pillows & organic bath amenities',
      icon: Sparkles,
      bg: 'var(--color-petal-light)'
    },
    {
      type: 'assistance' as ServiceType,
      title: 'Concierge & Excursions',
      desc: 'Chauffeur transfers & coastal itineraries',
      icon: Compass,
      bg: 'var(--color-bridal-blue)'
    },
    {
      type: 'maintenance' as ServiceType,
      title: 'Suite Maintenance',
      desc: 'Climate recalibration & technical assistance',
      icon: Wrench,
      bg: 'var(--color-petal-light)'
    }
  ];

  const handleOpenForm = (type: ServiceType, defaultTitle: string) => {
    setSelectedServiceType(type);
    setServiceTitle(defaultTitle);
    setFormOpen(true);
    setSubmitSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle || !serviceDescription) return;

    submitServiceRequest({
      guestName,
      roomNumber,
      serviceType: selectedServiceType,
      title: serviceTitle,
      description: serviceDescription,
      priority
    });

    addNotification({
      category: 'service',
      title: 'Service Order Dispatched',
      message: `Your request "${serviceTitle}" for Room ${roomNumber} has been dispatched.`
    });

    setSubmitSuccess(true);
    setServiceDescription('');
    setTimeout(() => {
      setFormOpen(false);
      setSubmitSuccess(false);
      setActiveTab('history');
    }, 1200);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="badge badge-warning">Pending</span>;
      case 'in_progress':
        return <span className="badge badge-sapphire">In Progress</span>;
      case 'completed':
        return <span className="badge badge-success">Completed</span>;
      default:
        return <span className="badge badge-petal">{status}</span>;
    }
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Minimal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.2rem',
            marginBottom: '2.5rem'
          }}
        >
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
              HOSPITALITY
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--color-midnight)', margin: 0, fontWeight: 700 }}>
              Guest Services
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`btn btn-sm ${activeTab === 'catalog' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Menu
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`btn btn-sm ${activeTab === 'history' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Active ({services.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Catalog */}
        {activeTab === 'catalog' && (
          <div>
            <div
              className="services-catalog-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.75rem'
              }}
            >
              {serviceCategories.map((cat, idx) => {
                const CatIcon = cat.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      padding: '2rem',
                      border: '1px solid rgba(11, 25, 87, 0.08)',
                      boxShadow: '0 4px 14px rgba(11, 25, 87, 0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          backgroundColor: cat.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1.2rem'
                        }}
                      >
                        <CatIcon size={22} color="var(--color-sapphire)" />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--color-midnight)', marginBottom: '0.35rem', fontWeight: 700 }}>
                        {cat.title}
                      </h3>
                      <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', margin: '0 0 1.5rem 0' }}>
                        {cat.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenForm(cat.type, cat.title)}
                      className="btn btn-secondary btn-sm"
                      style={{ alignSelf: 'flex-start' }}
                    >
                      <Plus size={14} />
                      <span>Request</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Active Requests History */}
        {activeTab === 'history' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {services.length === 0 ? (
                <div style={{ backgroundColor: '#FFFFFF', padding: '3.5rem 2rem', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(11, 25, 87, 0.08)' }}>
                  <h3 style={{ margin: '0 0 0.4rem 0', color: 'var(--color-midnight)' }}>No Active Requests</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', margin: 0 }}>
                    Select a service from the menu to place an order.
                  </p>
                </div>
              ) : (
                services.map(srv => (
                  <div
                    key={srv.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '1.4rem 1.6rem',
                      border: '1px solid rgba(11, 25, 87, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                        {getStatusBadge(srv.status)}
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                          Room {srv.roomNumber}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.1rem', color: 'var(--color-midnight)', margin: '0 0 0.2rem 0' }}>
                        {srv.title}
                      </h3>
                      <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                        {srv.description}
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>
                        {srv.priority} Priority
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Service Request Modal */}
        {formOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(11, 25, 87, 0.5)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1rem'
            }}
          >
            <div
              className="lumora-modal-content"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '2rem',
                maxWidth: '460px',
                width: '100%',
                boxShadow: '0 24px 60px rgba(11, 25, 87, 0.2)',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(11, 25, 87, 0.08)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-midnight)', margin: 0 }}>
                  Order Service
                </h3>
                <button onClick={() => setFormOpen(false)} style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>✕</button>
              </div>

              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.8rem' }}>
                    <CheckCircle size={28} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Dispatched</h4>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Service</label>
                    <input
                      type="text"
                      className="form-input"
                      value={serviceTitle}
                      onChange={e => setServiceTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="modal-two-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Room</label>
                      <input
                        type="text"
                        className="form-input"
                        value={roomNumber}
                        onChange={e => setRoomNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Priority</label>
                      <select
                        className="form-select"
                        value={priority}
                        onChange={e => setPriority(e.target.value as any)}
                      >
                        <option value="low">Standard</option>
                        <option value="medium">Prompt</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Special Instructions</label>
                    <textarea
                      className="form-textarea"
                      rows={2}
                      value={serviceDescription}
                      onChange={e => setServiceDescription(e.target.value)}
                      placeholder="e.g. Extra pillows, sparkling water"
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
                    <button
                      type="button"
                      onClick={() => setFormOpen(false)}
                      className="btn btn-secondary"
                      style={{ flex: 1 }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                    >
                      <Send size={14} />
                      <span>Submit</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
