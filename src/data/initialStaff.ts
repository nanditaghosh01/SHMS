import { StaffMember } from '../types';

export const initialStaff: StaffMember[] = [
  {
    id: 'stf-admin-1',
    name: 'Alexander Sterling',
    role: 'admin',
    email: 'alexander.s@lumorahotels.com',
    phone: '+1 (555) 901-2001',
    shift: 'morning',
    status: 'active'
  },
  {
    id: 'stf-rec-1',
    name: 'Mia Chen',
    role: 'receptionist',
    email: 'mia.chen@lumorahotels.com',
    phone: '+1 (555) 901-2002',
    shift: 'morning',
    status: 'active',
    tasksCompletedToday: 18
  },
  {
    id: 'stf-rec-2',
    name: 'Julian Ross',
    role: 'receptionist',
    email: 'julian.ross@lumorahotels.com',
    phone: '+1 (555) 901-2003',
    shift: 'evening',
    status: 'active',
    tasksCompletedToday: 12
  },
  {
    id: 'stf-hk-1',
    name: 'Elena Rostova',
    role: 'housekeeping',
    email: 'elena.r@lumorahotels.com',
    phone: '+1 (555) 901-2004',
    shift: 'morning',
    status: 'active',
    tasksCompletedToday: 6
  },
  {
    id: 'stf-hk-2',
    name: 'Carlos Mendoza',
    role: 'housekeeping',
    email: 'carlos.m@lumorahotels.com',
    phone: '+1 (555) 901-2005',
    shift: 'morning',
    status: 'on_break',
    tasksCompletedToday: 4
  },
  {
    id: 'stf-mgr-1',
    name: 'Victoria Kensington',
    role: 'manager',
    email: 'v.kensington@lumorahotels.com',
    phone: '+1 (555) 901-2006',
    shift: 'morning',
    status: 'active'
  }
];
