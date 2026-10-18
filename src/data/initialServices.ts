import { ServiceRequest } from '../types';

export const initialServices: ServiceRequest[] = [
  {
    id: 'srv-101',
    guestName: 'Eleanor Vance',
    roomNumber: '101',
    serviceType: 'room_service',
    title: 'Gourmet Artisanal Breakfast in Bed',
    description: 'Poached eggs on toasted brioche, avocado carpaccio, fresh squeezed blood orange juice and flat white coffee.',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2026-10-12T07:45:00Z'
  },
  {
    id: 'srv-102',
    guestName: 'Julian Sterling',
    roomNumber: '308',
    serviceType: 'assistance',
    title: 'Sommelier Wine Tasting in Penthouse',
    description: 'Private 5-course sommelier pairing consultation for this evening at 7:30 PM.',
    priority: 'high',
    status: 'pending',
    createdAt: '2026-10-12T09:20:00Z'
  },
  {
    id: 'srv-103',
    guestName: 'Sophia Lorenza',
    roomNumber: '102',
    serviceType: 'housekeeping',
    title: 'Extra Hypoallergenic Bedding & Bathrobe',
    description: 'Requested 2 additional goose feather pillows and one large plush velour bath robe.',
    priority: 'low',
    status: 'completed',
    createdAt: '2026-10-11T19:00:00Z',
    resolvedAt: '2026-10-11T19:25:00Z'
  },
  {
    id: 'srv-104',
    guestName: 'Lucas Davenport',
    roomNumber: '301',
    serviceType: 'maintenance',
    title: 'Balcony Dimmer Switch Calibration',
    description: 'Balcony terrace ambience lights flickering intermittently when set to low intensity.',
    priority: 'medium',
    status: 'pending',
    createdAt: '2026-10-12T10:05:00Z'
  }
];
