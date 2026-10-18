import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { StatCard } from '../../components/cards/StatCard';
import { Room, Booking, StaffMember, InventoryItem, RoomStatus, BookingStatus } from '../../types';
import {
  BedDouble,
  CalendarDays,
  Users,
  Boxes,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  CheckCircle,
  X,
  Edit,
  Trash2,
  Download,
  ShieldCheck,
  ClipboardList
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    rooms,
    addRoom,
    updateRoom,
    deleteRoom,
    setRoomStatus,
    bookings,
    cancelBooking,
    updateBookingStatus,
    staff,
    addStaffMember,
    inventory,
    updateInventoryStock,
    tasks
  } = useHotel();

  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'bookings' | 'staff' | 'inventory' | 'reports'>('overview');

  // Modal States
  const [addRoomModalOpen, setAddRoomModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [addStaffModalOpen, setAddStaffModalOpen] = useState(false);

  // Search queries
  const [roomSearch, setRoomSearch] = useState('');
  const [bookingSearch, setBookingSearch] = useState('');

  // Form states for New Room
  const [newRoomNum, setNewRoomNum] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomCategory, setNewRoomCategory] = useState<'Standard' | 'Deluxe' | 'Executive' | 'Suite' | 'Presidential'>('Deluxe');
  const [newRoomPrice, setNewRoomPrice] = useState(350);
  const [newRoomBed, setNewRoomBed] = useState<'King Bed' | 'Queen Bed' | 'Twin Beds' | 'Super King'>('King Bed');
  const [newRoomAdults, setNewRoomAdults] = useState(2);
  const [newRoomSqFt, setNewRoomSqFt] = useState(550);
  const [newRoomFloor, setNewRoomFloor] = useState(2);

  // Form state for New Staff
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffRole, setStaffRole] = useState<'admin' | 'receptionist' | 'housekeeping' | 'manager'>('receptionist');
  const [staffPhone, setStaffPhone] = useState('+1 (555) 901-2099');

  // KPI calculations
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const cleaningRooms = rooms.filter(r => r.status === 'cleaning').length;
  const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const totalRevenue = bookings
    .filter(b => b.paymentStatus === 'successful')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length;
  const lowStockItems = inventory.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock');

  // Handle Add Room
  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomNum || !newRoomName) return;

    addRoom({
      roomNumber: newRoomNum,
      name: newRoomName,
      category: newRoomCategory,
      description: 'Newly configured contemporary suite with bespoke organic furnishings and smart ambient automation.',
      pricePerNight: Number(newRoomPrice),
      capacity: { adults: Number(newRoomAdults), children: 1 },
      bedType: newRoomBed,
      amenities: ['High-speed Wi-Fi', 'Smart Climate Control', 'Rainforest Shower', 'Nespresso Atelier', 'Private Balcony'],
      status: 'available',
      rating: 5.0,
      reviewsCount: 1,
      images: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      ],
      floor: Number(newRoomFloor),
      sizeSqFt: Number(newRoomSqFt),
      features: ['Acoustic soundproofing', 'Italian marble ensuite']
    });

    setAddRoomModalOpen(false);
    setNewRoomNum('');
    setNewRoomName('');
  };

  // Handle Add Staff
  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffName || !staffEmail) return;

    addStaffMember({
      name: staffName,
      email: staffEmail,
      role: staffRole,
      phone: staffPhone,
      shift: 'morning',
      status: 'active'
    });

    setAddStaffModalOpen(false);
    setStaffName('');
    setStaffEmail('');
  };

  // Export report
  const exportReportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ rooms, bookings, staff, inventory }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `lumora_hotel_operations_report_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div>
      {/* Top Controls & Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
          {[
            { id: 'overview', label: 'Operations Overview' },
            { id: 'rooms', label: `Rooms (${rooms.length})` },
            { id: 'bookings', label: `Reservations (${bookings.length})` },
            { id: 'staff', label: `Staff Roster (${staff.length})` },
            { id: 'inventory', label: `Inventory (${inventory.length})` },
            { id: 'reports', label: 'Export & Reports' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: activeTab === tab.id ? 700 : 500,
                backgroundColor: activeTab === tab.id ? 'var(--color-midnight)' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={() => setAddRoomModalOpen(true)}
            className="btn btn-primary btn-sm"
          >
            <Plus size={15} />
            <span>Add New Room</span>
          </button>
          <button
            onClick={exportReportData}
            className="btn btn-secondary btn-sm"
          >
            <Download size={15} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* KPI Stat Cards Grid */}
          <div className="grid-4">
            <StatCard
              title="Total Capacity"
              value={totalRooms}
              subValue="sanctuaries"
              change="+2 suites added"
              trend="up"
              icon={BedDouble}
              bgVariant="white"
            />
            <StatCard
              title="Available Now"
              value={availableRooms}
              subValue={`(${totalRooms - availableRooms} active)`}
              change={`${occupancyRate}% occupancy`}
              trend="up"
              icon={CheckCircle}
              iconColor="#10B981"
              bgVariant="bridal"
            />
            <StatCard
              title="Gross Room Revenue"
              value={`$${totalRevenue.toLocaleString()}`}
              subValue="settled"
              change="+14.2%"
              trend="up"
              icon={DollarSign}
              iconColor="var(--color-sapphire)"
              bgVariant="white"
            />
            <StatCard
              title="Pending Operations"
              value={pendingTasks}
              subValue="tasks queued"
              change={lowStockItems.length > 0 ? `${lowStockItems.length} low stock alerts` : 'Stock nominal'}
              trend={lowStockItems.length > 0 ? 'down' : 'neutral'}
              icon={AlertTriangle}
              iconColor={lowStockItems.length > 0 ? '#F59E0B' : '#10B981'}
              bgVariant={lowStockItems.length > 0 ? 'petal' : 'white'}
            />
          </div>

          {/* Quick Room Status Snapshot Grid */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-midnight)', margin: 0 }}>
                  Live Estate Room Allocation Grid
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Click any room pill to toggle status between Available, Occupied, Cleaning, or Maintenance.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.75rem', fontWeight: 600 }}>
                <span style={{ color: '#10B981' }}>● Available ({availableRooms})</span>
                <span style={{ color: '#EF4444' }}>● Occupied ({occupiedRooms})</span>
                <span style={{ color: '#F59E0B' }}>● Cleaning ({cleaningRooms})</span>
                <span style={{ color: '#6B7280' }}>● Maintenance ({maintenanceRooms})</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.9rem' }}>
              {rooms.map(room => {
                const getBorderColor = () => {
                  switch (room.status) {
                    case 'available': return '#10B981';
                    case 'occupied': return '#EF4444';
                    case 'cleaning': return '#F59E0B';
                    default: return '#6B7280';
                  }
                };

                const getBgColor = () => {
                  switch (room.status) {
                    case 'available': return '#ECFDF5';
                    case 'occupied': return '#FEF2F2';
                    case 'cleaning': return '#FFFBEB';
                    default: return '#F3F4F6';
                  }
                };

                return (
                  <div
                    key={room.id}
                    onClick={() => {
                      const nextStatus: Record<RoomStatus, RoomStatus> = {
                        available: 'occupied',
                        occupied: 'cleaning',
                        cleaning: 'available',
                        maintenance: 'available'
                      };
                      setRoomStatus(room.id, nextStatus[room.status]);
                    }}
                    style={{
                      padding: '0.9rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: getBgColor(),
                      border: `1.5px solid ${getBorderColor()}`,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'transform 0.15s'
                    }}
                    title="Click to advance room operational status"
                  >
                    <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-midnight)' }}>
                      #{room.roomNumber}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {room.category}
                    </div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, marginTop: '0.3rem', textTransform: 'capitalize', color: getBorderColor() }}>
                      {room.status}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Reservations Table */}
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
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-midnight)', margin: 0 }}>
                Recent Bookings Ledger
              </h3>
              <button onClick={() => setActiveTab('bookings')} className="btn btn-secondary btn-sm">
                View All ({bookings.length})
              </button>
            </div>

            <div className="lumora-table-wrapper">
              <table className="lumora-table">
                <thead>
                  <tr>
                    <th>Ref & QR</th>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Dates</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map(b => (
                    <tr key={b.id}>
                      <td>
                        <strong style={{ color: 'var(--color-midnight)' }}>{b.bookingReference}</strong>
                        <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{b.qrPassCode}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{b.guestName}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{b.guestEmail}</div>
                      </td>
                      <td>
                        <div>Room {b.roomNumber}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{b.roomCategory}</div>
                      </td>
                      <td>
                        <div>{b.checkInDate} → {b.checkOutDate}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{b.nights} nights</div>
                      </td>
                      <td>
                        <strong>${b.totalPrice}</strong>
                      </td>
                      <td>
                        <span className={`badge ${b.status === 'confirmed' ? 'badge-sapphire' : b.status === 'checked_in' ? 'badge-success' : 'badge-petal'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="form-select"
                          value={b.status}
                          onChange={e => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem', width: 'auto' }}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="checked_in">Checked In</option>
                          <option value="checked_out">Checked Out</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ROOMS MANAGEMENT */}
      {activeTab === 'rooms' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', maxWidth: '340px', width: '100%' }}>
              <input
                type="text"
                placeholder="Search rooms by number, name, category..."
                value={roomSearch}
                onChange={e => setRoomSearch(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '15px' }} />
            </div>

            <button onClick={() => setAddRoomModalOpen(true)} className="btn btn-primary btn-sm">
              <Plus size={15} /> Add New Room
            </button>
          </div>

          <div className="lumora-table-wrapper">
            <table className="lumora-table">
              <thead>
                <tr>
                  <th>Room #</th>
                  <th>Sanctuary Name</th>
                  <th>Category</th>
                  <th>Bed & Capacity</th>
                  <th>Rate / Night</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms
                  .filter(r => r.roomNumber.includes(roomSearch) || r.name.toLowerCase().includes(roomSearch.toLowerCase()) || r.category.toLowerCase().includes(roomSearch.toLowerCase()))
                  .map(room => (
                    <tr key={room.id}>
                      <td><strong style={{ color: 'var(--color-midnight)' }}>#{room.roomNumber}</strong></td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{room.name}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Floor {room.floor} • {room.sizeSqFt} sq ft</div>
                      </td>
                      <td><span className="badge badge-sapphire">{room.category}</span></td>
                      <td>
                        <div>{room.bedType}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Max {room.capacity.adults + room.capacity.children} guests</div>
                      </td>
                      <td><strong>${room.pricePerNight}</strong></td>
                      <td>
                        <select
                          className="form-select"
                          value={room.status}
                          onChange={e => setRoomStatus(room.id, e.target.value as RoomStatus)}
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem', width: 'auto' }}
                        >
                          <option value="available">Available</option>
                          <option value="occupied">Occupied</option>
                          <option value="cleaning">Cleaning</option>
                          <option value="maintenance">Maintenance</option>
                        </select>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            onClick={() => {
                              const newPrice = prompt(`Update nightly price for Room ${room.roomNumber}:`, room.pricePerNight.toString());
                              if (newPrice && !isNaN(Number(newPrice))) {
                                updateRoom(room.id, { pricePerNight: Number(newPrice) });
                              }
                            }}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.25rem 0.5rem' }}
                            title="Edit Room Price"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete Room ${room.roomNumber}?`)) {
                                deleteRoom(room.id);
                              }
                            }}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.25rem 0.5rem', color: 'var(--color-danger)' }}
                            title="Delete Room"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: BOOKINGS MANAGEMENT */}
      {activeTab === 'bookings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ position: 'relative', maxWidth: '340px', width: '100%' }}>
            <input
              type="text"
              placeholder="Search by reference, guest, room #..."
              value={bookingSearch}
              onChange={e => setBookingSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '15px' }} />
          </div>

          <div className="lumora-table-wrapper">
            <table className="lumora-table">
              <thead>
                <tr>
                  <th>Booking Reference</th>
                  <th>Guest Name</th>
                  <th>Room</th>
                  <th>Dates</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings
                  .filter(b => b.bookingReference.toLowerCase().includes(bookingSearch.toLowerCase()) || b.guestName.toLowerCase().includes(bookingSearch.toLowerCase()) || b.roomNumber.includes(bookingSearch))
                  .map(b => (
                    <tr key={b.id}>
                      <td><strong>{b.bookingReference}</strong></td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{b.guestName}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{b.guestPhone}</div>
                      </td>
                      <td>Room {b.roomNumber} ({b.roomCategory})</td>
                      <td>{b.checkInDate} → {b.checkOutDate}</td>
                      <td><strong>${b.totalPrice}</strong></td>
                      <td>
                        <span className="badge badge-success">{b.paymentStatus}</span>
                      </td>
                      <td>
                        <span className={`badge ${b.status === 'confirmed' ? 'badge-sapphire' : b.status === 'checked_in' ? 'badge-success' : 'badge-petal'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          {b.status === 'confirmed' && (
                            <button
                              onClick={() => cancelBooking(b.id)}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '0.25rem 0.6rem', color: 'var(--color-danger)', fontSize: '0.75rem' }}
                            >
                              Cancel
                            </button>
                          )}
                          <select
                            className="form-select"
                            value={b.status}
                            onChange={e => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', width: 'auto' }}
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="checked_in">Checked In</option>
                            <option value="checked_out">Checked Out</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: STAFF DIRECTORY */}
      {activeTab === 'staff' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-midnight)', margin: 0 }}>Staff Roster & Role Assignments</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Manage hotel associates, access roles, and assigned shifts.</p>
            </div>
            <button onClick={() => setAddStaffModalOpen(true)} className="btn btn-primary btn-sm">
              <Plus size={15} /> Add Staff Member
            </button>
          </div>

          <div className="lumora-table-wrapper">
            <table className="lumora-table">
              <thead>
                <tr>
                  <th>Associate Name</th>
                  <th>Assigned Role</th>
                  <th>Email & Contact</th>
                  <th>Shift</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {staff.map(s => (
                  <tr key={s.id}>
                    <td><strong style={{ color: 'var(--color-midnight)' }}>{s.name}</strong></td>
                    <td><span className="badge badge-sapphire" style={{ textTransform: 'capitalize' }}>{s.role}</span></td>
                    <td>
                      <div>{s.email}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{s.phone}</div>
                    </td>
                    <td><span style={{ textTransform: 'capitalize' }}>{s.shift} Shift</span></td>
                    <td>
                      <span className={`badge ${s.status === 'active' ? 'badge-success' : 'badge-petal'}`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: INVENTORY */}
      {activeTab === 'inventory' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-midnight)', margin: 0 }}>Estate Supplies & Linen Inventory</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Live stock tracking with automatic low-threshold alerts.</p>
            </div>
          </div>

          <div className="lumora-table-wrapper">
            <table className="lumora-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Min Alert Threshold</th>
                  <th>Stock Status</th>
                  <th>Adjust Quantity</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.id}>
                    <td><strong style={{ color: 'var(--color-midnight)' }}>{item.name}</strong></td>
                    <td><span className="badge badge-petal" style={{ textTransform: 'capitalize' }}>{item.category}</span></td>
                    <td><strong>{item.quantity} {item.unit}</strong></td>
                    <td>{item.minThreshold} {item.unit}</td>
                    <td>
                      <span className={`badge ${item.status === 'in_stock' ? 'badge-success' : item.status === 'low_stock' ? 'badge-warning' : 'badge-danger'}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          onClick={() => updateInventoryStock(item.id, 10)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                        >
                          +10
                        </button>
                        <button
                          onClick={() => updateInventoryStock(item.id, -5)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                        >
                          -5
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: REPORTS */}
      {activeTab === 'reports' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-midnight)', marginBottom: '0.5rem' }}>
              Executive Operations Data Export
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Download complete structured JSON logs containing all current rooms, active bookings, guest service logs, and supply counts for external auditing.
            </p>
            <button onClick={exportReportData} className="btn btn-primary">
              <Download size={16} />
              <span>Download Complete System Audit Report</span>
            </button>
          </div>
        </div>
      )}

      {/* ADD ROOM MODAL */}
      {addRoomModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(11, 25, 87, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              maxWidth: '540px',
              width: '100%',
              boxShadow: 'var(--shadow-xl)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.8rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-midnight)', margin: 0 }}>Add Room to Inventory</h3>
              <button onClick={() => setAddRoomModalOpen(false)} style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>✕</button>
            </div>

            <form onSubmit={handleSaveRoom}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Room Number</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="305"
                    value={newRoomNum}
                    onChange={e => setNewRoomNum(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={newRoomCategory}
                    onChange={e => setNewRoomCategory(e.target.value as any)}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Executive">Executive</option>
                    <option value="Suite">Suite</option>
                    <option value="Presidential">Presidential</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Sanctuary Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="E.g., Pacific Horizon Terrace"
                  value={newRoomName}
                  onChange={e => setNewRoomName(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Price per Night ($)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newRoomPrice}
                    onChange={e => setNewRoomPrice(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Bed Type</label>
                  <select
                    className="form-select"
                    value={newRoomBed}
                    onChange={e => setNewRoomBed(e.target.value as any)}
                  >
                    <option value="King Bed">King Bed</option>
                    <option value="Queen Bed">Queen Bed</option>
                    <option value="Twin Beds">Twin Beds</option>
                    <option value="Super King">Super King</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Max Adults</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newRoomAdults}
                    onChange={e => setNewRoomAdults(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Sq Ft</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newRoomSqFt}
                    onChange={e => setNewRoomSqFt(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Floor</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newRoomFloor}
                    onChange={e => setNewRoomFloor(Number(e.target.value))}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setAddRoomModalOpen(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Add Room</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD STAFF MODAL */}
      {addStaffModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(11, 25, 87, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              maxWidth: '480px',
              width: '100%',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.8rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-midnight)', margin: 0 }}>Add Staff Associate</h3>
              <button onClick={() => setAddStaffModalOpen(false)} style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>✕</button>
            </div>

            <form onSubmit={handleSaveStaff}>
              <div className="form-group">
                <label className="form-label">Associate Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="E.g., Marcus Vance"
                  value={staffName}
                  onChange={e => setStaffName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="m.vance@lumorahotels.com"
                  value={staffEmail}
                  onChange={e => setStaffEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">System Role</label>
                <select
                  className="form-select"
                  value={staffRole}
                  onChange={e => setStaffRole(e.target.value as any)}
                >
                  <option value="receptionist">Receptionist (Front Desk)</option>
                  <option value="housekeeping">Housekeeping Staff</option>
                  <option value="admin">System Administrator</option>
                  <option value="manager">Hotel General Manager</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Direct Contact Number</label>
                <input
                  type="tel"
                  className="form-input"
                  value={staffPhone}
                  onChange={e => setStaffPhone(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setAddStaffModalOpen(false)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Create Associate Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
