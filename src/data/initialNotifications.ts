import { NotificationItem } from '../types';

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-01',
    category: 'booking',
    title: 'Reservation Confirmed',
    message: 'Booking LUM-8829-41 for Horizon Deluxe Sanctuary is confirmed for Oct 14–17, 2026.',
    timestamp: '2 hours ago',
    read: false,
    link: '/my-bookings'
  },
  {
    id: 'notif-02',
    category: 'checkin',
    title: 'Digital Key Ready',
    message: 'Your contactless QR Check-In Pass is ready for seamless self-service front-desk arrival.',
    timestamp: '4 hours ago',
    read: false,
    link: '/qr-pass/bkg-1001'
  },
  {
    id: 'notif-03',
    category: 'service',
    title: 'Service Order Update',
    message: 'Artisanal Breakfast in Bed is being prepared by Chef Marco. Delivery estimate: 20 mins.',
    timestamp: '5 hours ago',
    read: true,
    link: '/services'
  },
  {
    id: 'notif-04',
    category: 'system',
    title: 'Welcome to Lumora',
    message: 'We look forward to hosting your stay. Explore curated hotel experiences in our concierge app.',
    timestamp: '1 day ago',
    read: true,
    link: '/about'
  }
];
