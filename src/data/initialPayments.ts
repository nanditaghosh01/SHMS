import { PaymentRecord } from '../types';

export const initialPayments: PaymentRecord[] = [
  {
    id: 'pay-1001',
    bookingId: 'bkg-1001',
    bookingReference: 'LUM-8829-41',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.vance@example.com',
    amount: 1075.20,
    paymentMethod: 'Credit Card (•••• 4242)',
    status: 'successful',
    transactionRef: 'TXN-LUM-9912048',
    invoiceNumber: 'INV-2026-1001',
    gatewayResponse: 'APPROVED - Authorization Code #994821',
    paidAt: '2026-10-10T14:32:00Z',
    breakdown: {
      roomCharge: 960.00,
      taxes: 115.20,
      serviceFees: 0
    }
  },
  {
    id: 'pay-1002',
    bookingId: 'bkg-1002',
    bookingReference: 'LUM-7731-09',
    guestName: 'Julian Sterling',
    guestEmail: 'julian.sterling@luxurytravel.com',
    amount: 3864.00,
    paymentMethod: 'Amex Platinum (•••• 1009)',
    status: 'successful',
    transactionRef: 'TXN-LUM-9911950',
    invoiceNumber: 'INV-2026-1002',
    gatewayResponse: 'APPROVED - Authorization Code #108823',
    paidAt: '2026-10-05T09:18:00Z',
    breakdown: {
      roomCharge: 3450.00,
      taxes: 414.00,
      serviceFees: 0
    }
  },
  {
    id: 'pay-1003',
    bookingId: 'bkg-1003',
    bookingReference: 'LUM-6612-88',
    guestName: 'Dr. Marcus Thorne',
    guestEmail: 'm.thorne@biomed.org',
    amount: 1612.80,
    paymentMethod: 'Corporate Visa (•••• 9831)',
    status: 'successful',
    transactionRef: 'TXN-LUM-9908412',
    invoiceNumber: 'INV-2026-1003',
    gatewayResponse: 'APPROVED - Authorization Code #331298',
    paidAt: '2026-09-28T11:04:00Z',
    breakdown: {
      roomCharge: 1440.00,
      taxes: 172.80,
      serviceFees: 0
    }
  },
  {
    id: 'pay-1004',
    bookingId: 'bkg-1004',
    bookingReference: 'LUM-5590-23',
    guestName: 'Sophia Lorenza',
    guestEmail: 'sophia.l@designatelier.io',
    amount: 436.80,
    paymentMethod: 'Apple Pay (Mastercard)',
    status: 'successful',
    transactionRef: 'TXN-LUM-9913100',
    invoiceNumber: 'INV-2026-1004',
    gatewayResponse: 'APPROVED - Tokenized Device Pay #ApplePay441',
    paidAt: '2026-10-11T16:47:00Z',
    breakdown: {
      roomCharge: 390.00,
      taxes: 46.80,
      serviceFees: 0
    }
  }
];
