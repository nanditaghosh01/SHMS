import { HousekeepingTask } from '../types';

export const initialTasks: HousekeepingTask[] = [
  {
    id: 'tsk-01',
    roomNumber: '205',
    roomType: 'Suite',
    priority: 'urgent',
    status: 'in_progress',
    instructions: 'Turnover cleaning following 11 AM check-out. Restock botanical bath salts, refresh bed linens with 600-thread Egyptian cotton, and inspect balcony sliding door seal.',
    assignedStaff: 'Elena Rostova',
    assignedStaffId: 'stf-hk-1',
    assignedAt: '2026-10-12T09:30:00Z'
  },
  {
    id: 'tsk-02',
    roomNumber: '105',
    roomType: 'Deluxe',
    priority: 'high',
    status: 'pending',
    instructions: 'Deep sanitize courtyard patio pavers, change filtration on AC vent, restock organic minibar products and replace welcome orchid bouquet.',
    assignedStaff: 'Carlos Mendoza',
    assignedStaffId: 'stf-hk-2',
    assignedAt: '2026-10-12T10:15:00Z'
  },
  {
    id: 'tsk-03',
    roomNumber: '101',
    roomType: 'Deluxe',
    priority: 'normal',
    status: 'completed',
    instructions: 'Standard morning refresh. Fresh plush towels, ice bucket refill, replace morning coffee capsules and fluff duvets.',
    assignedStaff: 'Elena Rostova',
    assignedStaffId: 'stf-hk-1',
    assignedAt: '2026-10-12T08:00:00Z',
    completedAt: '2026-10-12T08:45:00Z'
  },
  {
    id: 'tsk-04',
    roomNumber: '308',
    roomType: 'Presidential',
    priority: 'urgent',
    status: 'in_progress',
    instructions: 'VIP Penthouse evening turndown service. Scent diffuser replenishment (Lumora White Tea & Bergamot), ice replenishment, silk eyemask placement.',
    assignedStaff: 'Elena Rostova',
    assignedStaffId: 'stf-hk-1',
    assignedAt: '2026-10-12T16:00:00Z'
  },
  {
    id: 'tsk-05',
    roomNumber: '210',
    roomType: 'Standard',
    priority: 'medium',
    status: 'blocked',
    instructions: 'Guest engaged "Do Not Disturb" electronic indicator. Reschedule vacuuming and linen change for afternoon window.',
    assignedStaff: 'Carlos Mendoza',
    assignedStaffId: 'stf-hk-2',
    assignedAt: '2026-10-12T10:45:00Z'
  }
];
