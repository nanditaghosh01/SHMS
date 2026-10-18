import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Room,
  Booking,
  HousekeepingTask,
  InventoryItem,
  StaffMember,
  ServiceRequest,
  SearchCriteria,
  RoomStatus,
  BookingStatus,
  TaskStatus,
  ServiceStatus,
  PaymentRecord,
  PaymentStatus,
  GuestFeedback,
  MaintenanceReport
} from '../types';
import { initialRooms } from '../data/initialRooms';
import { initialBookings } from '../data/initialBookings';
import { initialTasks } from '../data/initialTasks';
import { initialInventory } from '../data/initialInventory';
import { initialStaff } from '../data/initialStaff';
import { initialServices } from '../data/initialServices';
import { initialPayments } from '../data/initialPayments';
import { initialFeedback } from '../data/initialFeedback';
import { initialMaintenance } from '../data/initialMaintenance';

interface HotelContextType {
  // Rooms (Room Database)
  rooms: Room[];
  addRoom: (room: Omit<Room, 'id'>) => Room;
  updateRoom: (id: string, updates: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  setRoomStatus: (roomId: string, status: RoomStatus) => void;

  // Bookings (Booking Database)
  bookings: Booking[];
  createBooking: (newBooking: Omit<Booking, 'id' | 'bookingReference' | 'createdAt' | 'qrPassCode'>) => { success: boolean; booking?: Booking; error?: string };
  cancelBooking: (bookingId: string) => boolean;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  findBookingByRefOrQr: (query: string) => Booking | undefined;
  checkInGuest: (bookingId: string) => { success: boolean; message: string };
  checkOutGuest: (bookingId: string) => { success: boolean; message: string };

  // Payments (DFD Module 3: Payment Database & Gateway)
  payments: PaymentRecord[];
  recordPayment: (payment: Omit<PaymentRecord, 'id' | 'paidAt' | 'invoiceNumber'>) => PaymentRecord;
  verifyPayment: (refOrId: string) => PaymentRecord | undefined;
  updatePaymentStatus: (paymentId: string, status: PaymentStatus) => void;

  // Housekeeping & Tasks (DFD Module 4: Task & Maintenance Database)
  tasks: HousekeepingTask[];
  addTask: (task: Omit<HousekeepingTask, 'id' | 'assignedAt'>) => HousekeepingTask;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  reportIssue: (roomNumber: string, issue: string, priority: 'urgent' | 'high' | 'medium') => void;
  maintenanceReports: MaintenanceReport[];
  resolveMaintenanceReport: (id: string, notes?: string) => void;

  // Inventory (Task & Maintenance Database)
  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'lastRestocked'>) => void;
  updateInventoryStock: (itemId: string, delta: number) => void;
  deleteInventoryItem: (itemId: string) => void;

  // Staff (User Database)
  staff: StaffMember[];
  addStaffMember: (member: Omit<StaffMember, 'id'>) => void;
  updateStaff: (id: string, updates: Partial<StaffMember>) => void;

  // Services & Feedback (DFD Module 5: Service Request Database)
  services: ServiceRequest[];
  submitServiceRequest: (request: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>) => ServiceRequest;
  updateServiceStatus: (serviceId: string, status: ServiceStatus) => void;
  feedbackList: GuestFeedback[];
  submitFeedback: (feedback: Omit<GuestFeedback, 'id' | 'createdAt'>) => GuestFeedback;

  // Search Criteria
  searchCriteria: SearchCriteria;
  setSearchCriteria: React.Dispatch<React.SetStateAction<SearchCriteria>>;

  // DFD Module 6: Cross-Database Data Synthesis Pipeline
  getDatabaseStats: () => {
    userCount: number;
    roomCount: number;
    bookingCount: number;
    paymentCount: number;
    taskCount: number;
    serviceCount: number;
    feedbackCount: number;
    maintenanceCount: number;
    totalRevenue: number;
    occupancyPercent: number;
  };
}

function safeParse<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item || item === 'undefined' || item === 'null') return fallback;
    const parsed = JSON.parse(item);
    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
    return parsed ?? fallback;
  } catch (err) {
    console.warn(`[LUMORA] Failed to parse localStorage key: ${key}`, err);
    return fallback;
  }
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage hydrated states with safe parse fallback & automatic schema upgrade
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = safeParse<Room[]>('lumora_rooms', initialRooms);
    const existingIds = new Set(saved.map(r => r.id));
    const missing = initialRooms.filter(r => !existingIds.has(r.id));
    return missing.length > 0 ? [...saved, ...missing] : saved;
  });
  const [bookings, setBookings] = useState<Booking[]>(() => safeParse('lumora_bookings', initialBookings));
  const [tasks, setTasks] = useState<HousekeepingTask[]>(() => safeParse('lumora_tasks', initialTasks));
  const [inventory, setInventory] = useState<InventoryItem[]>(() => safeParse('lumora_inventory', initialInventory));
  const [staff, setStaff] = useState<StaffMember[]>(() => safeParse('lumora_staff', initialStaff));
  const [services, setServices] = useState<ServiceRequest[]>(() => safeParse('lumora_services', initialServices));

  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    destination: 'Lumora Coastal Estate, Monterey',
    checkIn: '2026-10-14',
    checkOut: '2026-10-17',
    adults: 2,
    children: 0,
    rooms: 1,
    category: 'all'
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('lumora_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('lumora_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('lumora_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('lumora_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('lumora_staff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem('lumora_services', JSON.stringify(services));
  }, [services]);

  // Rooms CRUD
  const addRoom = (newRoomData: Omit<Room, 'id'>): Room => {
    const newRoom: Room = {
      ...newRoomData,
      id: `room-${Date.now()}`
    };
    setRooms(prev => [newRoom, ...prev]);
    return newRoom;
  };

  const updateRoom = (id: string, updates: Partial<Room>) => {
    setRooms(prev => prev.map(r => (r.id === id ? { ...r, ...updates } : r)));
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(r => r.id !== id));
  };

  const setRoomStatus = (roomId: string, status: RoomStatus) => {
    setRooms(prev => prev.map(r => (r.id === roomId ? { ...r, status } : r)));
  };

  // Booking logic with double-booking collision prevention
  const createBooking = (newBookingData: Omit<Booking, 'id' | 'bookingReference' | 'createdAt' | 'qrPassCode'>) => {
    // Check conflicting bookings for the same room
    const targetRoom = rooms.find(r => r.id === newBookingData.roomId);
    if (!targetRoom) {
      return { success: false, error: 'Selected room not found.' };
    }

    const checkIn = new Date(newBookingData.checkInDate).getTime();
    const checkOut = new Date(newBookingData.checkOutDate).getTime();

    if (checkOut <= checkIn) {
      return { success: false, error: 'Check-out date must be after check-in date.' };
    }

    // Check overlaps among active bookings
    const hasConflict = bookings.some(b => {
      if (b.roomId !== newBookingData.roomId) return false;
      if (b.status === 'cancelled' || b.status === 'checked_out') return false;
      const existingIn = new Date(b.checkInDate).getTime();
      const existingOut = new Date(b.checkOutDate).getTime();
      return Math.max(checkIn, existingIn) < Math.min(checkOut, existingOut);
    });

    if (hasConflict) {
      return {
        success: false,
        error: `Room ${targetRoom.roomNumber} (${targetRoom.name}) is already reserved for the selected dates. Please select alternative dates or suites.`
      };
    }

    const randomRefNum = Math.floor(1000 + Math.random() * 9000);
    const randomSuffix = Math.floor(10 + Math.random() * 89);
    const bookingRef = `LUM-${randomRefNum}-${randomSuffix}`;
    const qrPass = `LUM-PASS-${randomRefNum}${randomSuffix}`;

    const created: Booking = {
      ...newBookingData,
      id: `bkg-${Date.now()}`,
      bookingReference: bookingRef,
      qrPassCode: qrPass,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [created, ...prev]);

    // Update room status if checkIn is today
    const today = new Date().toISOString().split('T')[0];
    if (newBookingData.checkInDate === today) {
      setRoomStatus(newBookingData.roomId, 'occupied');
    }

    return { success: true, booking: created };
  };

  const cancelBooking = (bookingId: string): boolean => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'cancelled' as BookingStatus } : b))
    );
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setRoomStatus(booking.roomId, 'available');
    }
    return true;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const findBookingByRefOrQr = (query: string): Booking | undefined => {
    const clean = query.trim().toUpperCase();
    return bookings.find(
      b =>
        b.bookingReference.toUpperCase() === clean ||
        b.qrPassCode.toUpperCase() === clean ||
        b.roomNumber === clean ||
        b.guestName.toUpperCase().includes(clean)
    );
  };

  const checkInGuest = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: 'Reservation not found' };
    if (booking.status === 'cancelled') return { success: false, message: 'Cannot check in a cancelled reservation.' };
    if (booking.status === 'checked_in') return { success: false, message: 'Guest is already checked in.' };

    updateBookingStatus(bookingId, 'checked_in');
    setRoomStatus(booking.roomId, 'occupied');
    return { success: true, message: `Checked in ${booking.guestName} into Room ${booking.roomNumber}. Keycard & digital pass activated.` };
  };

  const checkOutGuest = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: 'Reservation not found' };

    updateBookingStatus(bookingId, 'checked_out');
    setRoomStatus(booking.roomId, 'cleaning');

    // Automatically generate turnover cleaning task for housekeeping
    addTask({
      roomNumber: booking.roomNumber,
      roomType: booking.roomCategory,
      priority: 'high',
      status: 'pending',
      instructions: `Post check-out turnover for guest ${booking.guestName}. Sanitize room, change 600TC linens, restock signature minibar and amenities.`,
      assignedStaff: 'Elena Rostova',
      assignedStaffId: 'stf-hk-1'
    });

    return { success: true, message: `Guest ${booking.guestName} checked out successfully. Room ${booking.roomNumber} marked for cleaning.` };
  };

  // Housekeeping & Tasks
  const addTask = (taskData: Omit<HousekeepingTask, 'id' | 'assignedAt'>): HousekeepingTask => {
    const newTask: HousekeepingTask = {
      ...taskData,
      id: `tsk-${Date.now()}`,
      assignedAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const updated = {
            ...t,
            status,
            completedAt: status === 'completed' ? new Date().toISOString() : t.completedAt
          };
          if (status === 'completed') {
            const targetRoom = rooms.find(r => r.roomNumber === t.roomNumber);
            if (targetRoom && targetRoom.status === 'cleaning') {
              setRoomStatus(targetRoom.id, 'available');
            }
          }
          return updated;
        }
        return t;
      })
    );
  };

  const reportIssue = (roomNumber: string, issue: string, priority: 'urgent' | 'high' | 'medium') => {
    const targetRoom = rooms.find(r => r.roomNumber === roomNumber);
    if (targetRoom) {
      setRoomStatus(targetRoom.id, 'maintenance');
    }
    addTask({
      roomNumber,
      roomType: targetRoom ? targetRoom.category : 'Deluxe',
      priority,
      status: 'pending',
      instructions: `MAINTENANCE REPORT: ${issue}`,
      assignedStaff: 'Facilities Engineering',
      assignedStaffId: 'stf-eng'
    });
  };

  // Inventory
  const addInventoryItem = (itemData: Omit<InventoryItem, 'id' | 'lastRestocked'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: `inv-${Date.now()}`,
      lastRestocked: new Date().toISOString().split('T')[0]
    };
    setInventory(prev => [newItem, ...prev]);
  };

  const updateInventoryStock = (itemId: string, delta: number) => {
    setInventory(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const newQty = Math.max(0, item.quantity + delta);
          let newStatus: InventoryItem['status'] = 'in_stock';
          if (newQty === 0) newStatus = 'out_of_stock';
          else if (newQty <= item.minThreshold) newStatus = 'low_stock';
          return {
            ...item,
            quantity: newQty,
            status: newStatus,
            lastRestocked: delta > 0 ? new Date().toISOString().split('T')[0] : item.lastRestocked
          };
        }
        return item;
      })
    );
  };

  const deleteInventoryItem = (itemId: string) => {
    setInventory(prev => prev.filter(i => i.id !== itemId));
  };

  // Staff
  const addStaffMember = (memberData: Omit<StaffMember, 'id'>) => {
    const newStaff: StaffMember = {
      ...memberData,
      id: `stf-${Date.now()}`,
      tasksCompletedToday: 0
    };
    setStaff(prev => [...prev, newStaff]);
  };

  const updateStaff = (id: string, updates: Partial<StaffMember>) => {
    setStaff(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  // Services
  const submitServiceRequest = (requestData: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>) => {
    const newRequest: ServiceRequest = {
      ...requestData,
      id: `srv-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setServices(prev => [newRequest, ...prev]);
    return newRequest;
  };

  const updateServiceStatus = (serviceId: string, status: ServiceStatus) => {
    setServices(prev =>
      prev.map(s => (s.id === serviceId ? { ...s, status, resolvedAt: status === 'completed' ? new Date().toISOString() : s.resolvedAt } : s))
    );
  };

  return (
    <HotelContext.Provider
      value={{
        rooms,
        addRoom,
        updateRoom,
        deleteRoom,
        setRoomStatus,
        bookings,
        createBooking,
        cancelBooking,
        updateBookingStatus,
        findBookingByRefOrQr,
        checkInGuest,
        checkOutGuest,
        tasks,
        addTask,
        updateTaskStatus,
        reportIssue,
        inventory,
        addInventoryItem,
        updateInventoryStock,
        deleteInventoryItem,
        staff,
        addStaffMember,
        updateStaff,
        services,
        submitServiceRequest,
        updateServiceStatus,
        searchCriteria,
        setSearchCriteria
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
