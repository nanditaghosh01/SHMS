import { GuestFeedback } from '../types';

export const initialFeedback: GuestFeedback[] = [
  {
    id: 'fbk-101',
    bookingReference: 'LUM-8829-41',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.vance@example.com',
    rating: 5,
    category: 'overall',
    roomNumber: '101',
    comments: 'The acoustic stillness and organic linen were breathtaking. Contactless QR arrival was flawless.',
    sentiment: 'positive',
    createdAt: '2026-10-12T14:00:00Z'
  },
  {
    id: 'fbk-102',
    bookingReference: 'LUM-7731-09',
    guestName: 'Julian Sterling',
    guestEmail: 'julian.sterling@luxurytravel.com',
    rating: 5,
    category: 'amenities',
    roomNumber: '308',
    comments: 'Penthouse views and dedicated VIP butler briefing surpassed expectations. Outstanding sommelier pairings.',
    sentiment: 'positive',
    createdAt: '2026-10-13T10:30:00Z'
  },
  {
    id: 'fbk-103',
    bookingReference: 'LUM-6612-88',
    guestName: 'Dr. Marcus Thorne',
    guestEmail: 'm.thorne@biomed.org',
    rating: 4,
    category: 'cleanliness',
    roomNumber: '204',
    comments: 'Executive suite was immaculate. Ergonomic workstation made remote consultations seamless.',
    sentiment: 'positive',
    createdAt: '2026-10-11T12:00:00Z'
  },
  {
    id: 'fbk-104',
    bookingReference: 'LUM-5590-23',
    guestName: 'Sophia Lorenza',
    guestEmail: 'sophia.l@designatelier.io',
    rating: 5,
    category: 'dining',
    roomNumber: '102',
    comments: 'In-suite breakfast was artisanal perfection. Poached eggs and blood orange juice were delivered in 15 mins.',
    sentiment: 'positive',
    createdAt: '2026-10-12T08:50:00Z'
  }
];
