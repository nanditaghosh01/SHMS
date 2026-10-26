import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Booking, Room } from '../../types';
import {
  QrCode,
  CalendarCheck,
  CheckCircle,
  Clock,
  Printer,
  Search,
  KeyRound,
  ArrowRight,
  AlertCircle,
  Plus,
  BedDouble,
  UserCheck,
  CreditCard,
  Camera
} from 'lucide-react';

export const ReceptionistDashboard: React.FC = () => {
  const {
    bookings,
    rooms,
    checkInGuest,
    checkOutGuest,
    findBookingByRefOrQr,
    createBooking
  } = useHotel();

  const [activeTab, setActiveTab] = useState<'arrivals' | 'scanner' | 'walkin' | 'folio'>('arrivals');

  // Scanner state
  const [scanCode, setScanCode] = useState('LUM-PASS-882941');
  const [verifiedBooking, setVerifiedBooking] = useState<Booking | null>(null);
  const [scannerMessage, setScannerMessage] = useState('');
  const [isScanningAnimation, setIsScanningAnimation] = useState(false);

  // Walk-in form state
  const [walkinName, setWalkinName] = useState('');
  const [walkinEmail, setWalkinEmail] = useState('');
  const [walkinPhone, setWalkinPhone] = useState('+1 (555) 000-1122');
  const [walkinRoomId, setWalkinRoomId] = useState(rooms.find(r => r.status === 'available')?.id || rooms[0]?.id);
  const [walkinNights, setWalkinNights] = useState(1);
  const [walkinMessage, setWalkinMessage] = useState('');

  // Selected booking for Folio / Invoice Preview
  const [selectedFolioBooking, setSelectedFolioBooking] = useState<Booking | undefined>(() => bookings[0]);
  const activeFolioBooking = selectedFolioBooking || bookings[0];

  // Today's arrivals and departures
  const arrivals = bookings.filter(b => b.status === 'confirmed');
  const checkedInGuests = bookings.filter(b => b.status === 'checked_in');

  const handleVerifyPass = (codeToTest?: string) => {
    const code = codeToTest || scanCode;
    setIsScanningAnimation(true);
    setScannerMessage('');

    setTimeout(() => {
      setIsScanningAnimation(false);
      const found = findBookingByRefOrQr(code);
      if (found) {
        setVerifiedBooking(found);
        setScannerMessage(`✓ Verification Successful: ${found.guestName} (${found.bookingReference})`);
      } else {
        setVerifiedBooking(null);
        setScannerMessage('❌ Verification Failed: Invalid or expired QR pass / reference code.');
      }
    }, 800);
  };

  const handleConfirmCheckInFromScanner = () => {
    if (verifiedBooking) {
      const result = checkInGuest(verifiedBooking.id);
      setScannerMessage(result.message);
      // Refresh local reference
      const updated = bookings.find(b => b.id === verifiedBooking.id);
      if (updated) setVerifiedBooking(updated);
    }
  };

  const handleWalkinBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinName || !walkinEmail) return;

    const chosenRoom = rooms.find(r => r.id === walkinRoomId);
    if (!chosenRoom) return;

    const today = new Date().toISOString().split('T')[0];
    const outDateObj = new Date();
    outDateObj.setDate(outDateObj.getDate() + Number(walkinNights));
    const checkOutDate = outDateObj.toISOString().split('T')[0];

    const subtotal = chosenRoom.pricePerNight * Number(walkinNights);
    const taxes = Number((subtotal * 0.12).toFixed(2));
    const total = Number((subtotal + taxes).toFixed(2));

    const result = createBooking({
      guestName: walkinName,
      guestEmail: walkinEmail,
      guestPhone: walkinPhone,
      roomId: chosenRoom.id,
      roomNumber: chosenRoom.roomNumber,
      roomName: chosenRoom.name,
      roomCategory: chosenRoom.category,
      checkInDate: today,
      checkOutDate,
      nights: Number(walkinNights),
      adults: 2,
      children: 0,
      roomsCount: 1,
      pricePerNight: chosenRoom.pricePerNight,
      taxesAndFees: taxes,
      totalPrice: total,
      status: 'checked_in', // Immediate walk-in check-in
      paymentStatus: 'successful',
      paymentMethod: 'Credit Card at Front Desk',
      specialRequests: 'Walk-in guest registered by Receptionist'
    });

    if (result.success && result.booking) {
      setWalkinMessage(`✓ Walk-in registered and checked into Room ${chosenRoom.roomNumber}!`);
      setWalkinName('');
      setWalkinEmail('');
      setSelectedFolioBooking(result.booking);
    } else {
      setWalkinMessage(result.error || 'Failed to complete walk-in reservation.');
    }
  };

  return (
    <div>
      {/* Front Desk Tabs */}
      <div className="mobile-scroll-row" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
        {[
          { id: 'arrivals', label: `Today's Arrivals & In-House (${arrivals.length + checkedInGuests.length})` },
          { id: 'scanner', label: 'QR Pass Verification Kiosk' },
          { id: 'walkin', label: 'Walk-In Guest Registration' },
          { id: 'folio', label: 'Invoice & Folio Preview' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.86rem',
              fontWeight: activeTab === tab.id ? 700 : 500,
              backgroundColor: activeTab === tab.id ? 'var(--color-midnight)' : '#FFFFFF',
              color: activeTab === tab.id ? '#FFFFFF' : 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ARRIVALS & IN-HOUSE GUESTS */}
      {activeTab === 'arrivals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Arrivals List */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-midnight)', margin: 0 }}>
                  Scheduled Arrivals ({arrivals.length})
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Guests scheduled to arrive today. Click "Fast Check-In" to allocate keycard.
                </p>
              </div>
            </div>

            <div className="lumora-table-wrapper">
              <table className="lumora-table">
                <thead>
                  <tr>
                    <th>Ref & QR Pass</th>
                    <th>Guest Name</th>
                    <th>Room Assigned</th>
                    <th>Stay Dates</th>
                    <th>Billing</th>
                    <th>Front Desk Action</th>
                  </tr>
                </thead>
                <tbody>
                  {arrivals.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                        All scheduled arrivals have been checked in!
                      </td>
                    </tr>
                  ) : (
                    arrivals.map(b => (
                      <tr key={b.id}>
                        <td>
                          <strong>{b.bookingReference}</strong>
                          <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{b.qrPassCode}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{b.guestName}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{b.guestPhone}</div>
                        </td>
                        <td>
                          <span className="badge badge-sapphire">Room {b.roomNumber}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginLeft: '0.4rem' }}>{b.roomName}</span>
                        </td>
                        <td>{b.checkInDate} → {b.checkOutDate}</td>
                        <td>
                          <strong>${b.totalPrice}</strong>
                          <div style={{ fontSize: '0.72rem', color: '#059669' }}>{b.paymentStatus}</div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <button
                              onClick={() => {
                                checkInGuest(b.id);
                                setSelectedFolioBooking(b);
                              }}
                              className="btn btn-primary btn-sm"
                              style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem' }}
                            >
                              <UserCheck size={14} />
                              <span>Fast Check-In</span>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedFolioBooking(b);
                                setActiveTab('folio');
                              }}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '0.35rem 0.6rem' }}
                              title="Print Folio"
                            >
                              <Printer size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Currently In-House / Checked In Guests */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-midnight)', margin: 0 }}>
                  Active In-House Guests ({checkedInGuests.length})
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Guests currently occupying sanctuaries. Process checkout and release for housekeeping turnover.
                </p>
              </div>
            </div>

            <div className="lumora-table-wrapper">
              <table className="lumora-table">
                <thead>
                  <tr>
                    <th>Room #</th>
                    <th>Guest</th>
                    <th>Booking Ref</th>
                    <th>Departure Date</th>
                    <th>Settlement</th>
                    <th>Checkout Action</th>
                  </tr>
                </thead>
                <tbody>
                  {checkedInGuests.map(b => (
                    <tr key={b.id}>
                      <td>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--color-midnight)' }}>#{b.roomNumber}</strong>
                        <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{b.roomCategory}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{b.guestName}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{b.guestEmail}</div>
                      </td>
                      <td>{b.bookingReference}</td>
                      <td>{b.checkOutDate}</td>
                      <td>
                        <span className="badge badge-success">Settled (${b.totalPrice})</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            onClick={() => checkOutGuest(b.id)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem', color: 'var(--color-midnight)' }}
                          >
                            <span>Check-Out Guest</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedFolioBooking(b);
                              setActiveTab('folio');
                            }}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.35rem 0.6rem' }}
                            title="Print Folio"
                          >
                            <Printer size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QR PASS VERIFICATION KIOSK */}
      {activeTab === 'scanner' && (
        <div
          className="receptionist-split-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
        >
          {/* Scanner Viewfinder Box */}
          <div
            style={{
              backgroundColor: 'var(--color-midnight)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-xl)',
              textAlign: 'center'
            }}
          >
            <span style={{ color: 'var(--color-lavender)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Front-Desk Optical Scanner
            </span>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginTop: '0.3rem', marginBottom: '1.5rem' }}>
              Digital Pass Scanner Terminal
            </h3>

            {/* Viewfinder Graphic with Scanning Bar */}
            <div
              style={{
                width: '240px',
                height: '240px',
                margin: '0 auto 1.5rem',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                borderRadius: 'var(--radius-lg)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                overflow: 'hidden'
              }}
            >
              {/* Corner brackets */}
              <div style={{ position: 'absolute', top: '10px', left: '10px', width: '20px', height: '20px', borderTop: '3px solid #426BC2', borderLeft: '3px solid #426BC2' }} />
              <div style={{ position: 'absolute', top: '10px', right: '10px', width: '20px', height: '20px', borderTop: '3px solid #426BC2', borderRight: '3px solid #426BC2' }} />
              <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '20px', height: '20px', borderBottom: '3px solid #426BC2', borderLeft: '3px solid #426BC2' }} />
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '20px', height: '20px', borderBottom: '3px solid #426BC2', borderRight: '3px solid #426BC2' }} />

              <Camera size={48} color="rgba(255, 255, 255, 0.4)" />

              {/* Laser scan line */}
              {isScanningAnimation && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: '#10B981',
                    boxShadow: '0 0 10px #10B981',
                    animation: 'scanLine 1.5s infinite alternate'
                  }}
                />
              )}
            </div>

            <p style={{ fontSize: '0.84rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.2rem' }}>
              Hold guest smartphone with Lumora QR Pass within the targeting frame.
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Or type pass / booking ref..."
                value={scanCode}
                onChange={e => setScanCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.7rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  fontSize: '0.88rem'
                }}
              />
              <button
                type="button"
                onClick={() => handleVerifyPass()}
                className="btn btn-primary btn-sm"
              >
                Scan / Verify
              </button>
            </div>

            {/* Quick Demo Pre-fill shortcuts */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', fontSize: '0.72rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Quick test:</span>
              <button
                onClick={() => { setScanCode('LUM-PASS-882941'); handleVerifyPass('LUM-PASS-882941'); }}
                style={{ color: 'var(--color-lavender)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Eleanor (101)
              </button>
              <button
                onClick={() => { setScanCode('LUM-PASS-773109'); handleVerifyPass('LUM-PASS-773109'); }}
                style={{ color: 'var(--color-lavender)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Julian (308)
              </button>
            </div>
          </div>

          {/* Verification Result Inspection Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-midnight)', marginBottom: '1rem' }}>
              Verification Inspection Folio
            </h3>

            {scannerMessage && (
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                  backgroundColor: scannerMessage.includes('✓') ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
                  color: scannerMessage.includes('✓') ? 'var(--color-success)' : 'var(--color-danger)',
                  border: `1px solid ${scannerMessage.includes('✓') ? 'var(--color-success-border)' : 'var(--color-danger-border)'}`
                }}
              >
                {scannerMessage}
              </div>
            )}

            {verifiedBooking ? (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.2rem', marginBottom: '1.8rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Guest Name</span>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-midnight)' }}>
                      {verifiedBooking.guestName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{verifiedBooking.guestEmail}</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Suite Allocated</span>
                    <div style={{ fontWeight: 800, fontSize: '1.35rem', color: 'var(--color-sapphire)' }}>
                      Room {verifiedBooking.roomNumber}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{verifiedBooking.roomName}</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Booking Reference</span>
                    <div style={{ fontWeight: 700 }}>{verifiedBooking.bookingReference}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>QR Code: {verifiedBooking.qrPassCode}</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Current Reservation Status</span>
                    <div>
                      <span className={`badge ${verifiedBooking.status === 'checked_in' ? 'badge-success' : 'badge-sapphire'}`}>
                        {verifiedBooking.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  {verifiedBooking.status === 'confirmed' && (
                    <button
                      onClick={handleConfirmCheckInFromScanner}
                      className="btn btn-primary"
                    >
                      <UserCheck size={16} />
                      <span>Approve Check-In & Issue Keycard</span>
                    </button>
                  )}
                  {verifiedBooking.status === 'checked_in' && (
                    <button
                      onClick={() => {
                        checkOutGuest(verifiedBooking.id);
                        setScannerMessage(`Checked out ${verifiedBooking.guestName}. Room ${verifiedBooking.roomNumber} dispatched for cleaning.`);
                      }}
                      className="btn btn-secondary"
                    >
                      Process Check-Out
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedFolioBooking(verifiedBooking);
                      setActiveTab('folio');
                    }}
                    className="btn btn-secondary"
                  >
                    <Printer size={16} />
                    <span>View Folio</span>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-text-muted)' }}>
                Scan a pass or enter a reference code to preview verified guest identity and issue room access.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: WALK-IN REGISTRATION */}
      {activeTab === 'walkin' && (
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div
            className="walkin-card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-midnight)', marginBottom: '0.4rem' }}>
              Walk-In Guest Registration
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Instantly register guests arriving at the front desk without an advance booking.
            </p>

            {walkinMessage && (
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                  backgroundColor: walkinMessage.includes('✓') ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
                  color: walkinMessage.includes('✓') ? 'var(--color-success)' : 'var(--color-danger)',
                  border: `1px solid ${walkinMessage.includes('✓') ? 'var(--color-success-border)' : 'var(--color-danger-border)'}`
                }}
              >
                {walkinMessage}
              </div>
            )}

            <form onSubmit={handleWalkinBooking}>
              <div className="form-group">
                <label className="form-label">Guest Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="E.g., Charlotte Sterling"
                  value={walkinName}
                  onChange={e => setWalkinName(e.target.value)}
                  required
                />
              </div>

              <div className="modal-two-col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="guest@example.com"
                    value={walkinEmail}
                    onChange={e => setWalkinEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={walkinPhone}
                    onChange={e => setWalkinPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-two-col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Allocate Sanctuary</label>
                  <select
                    className="form-select"
                    value={walkinRoomId}
                    onChange={e => setWalkinRoomId(e.target.value)}
                  >
                    {rooms.filter(r => r.status === 'available').map(r => (
                      <option key={r.id} value={r.id}>Room {r.roomNumber} — {r.name} (${r.pricePerNight})</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Duration of Stay</label>
                  <select
                    className="form-select"
                    value={walkinNights}
                    onChange={e => setWalkinNights(Number(e.target.value))}
                  >
                    <option value={1}>1 Night</option>
                    <option value={2}>2 Nights</option>
                    <option value={3}>3 Nights</option>
                    <option value={5}>5 Nights</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary">
                  <UserCheck size={16} />
                  <span>Register & Issue Keycard</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: FOLIO & INVOICE PREVIEW */}
      {activeTab === 'folio' && (
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          {activeFolioBooking ? (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '3rem',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--color-midnight)' }}>
                    LUMORA
                  </span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                    Smart Hotel & Luxury Residences • Official Guest Folio
                  </p>
                </div>

                <button onClick={() => window.print()} className="btn btn-secondary btn-sm">
                  <Printer size={15} /> Print Official Receipt
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem', fontSize: '0.88rem' }}>
                <div>
                  <strong>Billed To:</strong>
                  <div>{activeFolioBooking.guestName}</div>
                  <div style={{ color: 'var(--color-text-secondary)' }}>{activeFolioBooking.guestEmail}</div>
                  <div style={{ color: 'var(--color-text-secondary)' }}>{activeFolioBooking.guestPhone}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div><strong>Folio Reference:</strong> {activeFolioBooking.bookingReference}</div>
                  <div><strong>Room Number:</strong> {activeFolioBooking.roomNumber} ({activeFolioBooking.roomCategory})</div>
                  <div><strong>Stay:</strong> {activeFolioBooking.checkInDate} — {activeFolioBooking.checkOutDate}</div>
                </div>
              </div>

              <div className="lumora-table-wrapper" style={{ marginBottom: '2rem' }}>
                <table className="lumora-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Rate</th>
                      <th>Qty / Nights</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Accommodation: {activeFolioBooking.roomName}</td>
                      <td>${activeFolioBooking.pricePerNight}</td>
                      <td>{activeFolioBooking.nights} Nights</td>
                      <td>${activeFolioBooking.pricePerNight * activeFolioBooking.nights}</td>
                    </tr>
                    <tr>
                      <td>Hospitality Tourism & Local State Tax (12%)</td>
                      <td>12%</td>
                      <td>1</td>
                      <td>${activeFolioBooking.taxesAndFees}</td>
                    </tr>
                    <tr style={{ fontWeight: 800, fontSize: '1.05rem', backgroundColor: 'var(--color-lace)' }}>
                      <td colSpan={3}>Total Folio Balance</td>
                      <td style={{ color: 'var(--color-midnight)' }}>${activeFolioBooking.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                <div>Status: Paid via {activeFolioBooking.paymentMethod}</div>
                <div>Thank you for choosing Lumora Coastal Estate.</div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>No reservations found to generate a guest folio.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
