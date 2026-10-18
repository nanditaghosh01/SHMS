import { InventoryItem } from '../types';

export const initialInventory: InventoryItem[] = [
  {
    id: 'inv-01',
    name: 'Egyptian Cotton King Sheet Sets (600 TC)',
    category: 'linens',
    quantity: 42,
    minThreshold: 20,
    unit: 'sets',
    status: 'in_stock',
    lastRestocked: '2026-10-08'
  },
  {
    id: 'inv-02',
    name: 'Lumora Signature Bath Robes (Plush Velour)',
    category: 'linens',
    quantity: 14,
    minThreshold: 25,
    unit: 'pieces',
    status: 'low_stock',
    lastRestocked: '2026-09-24'
  },
  {
    id: 'inv-03',
    name: 'Artisan Botanical Shampoo & Conditioner (250ml)',
    category: 'toiletries',
    quantity: 180,
    minThreshold: 50,
    unit: 'bottles',
    status: 'in_stock',
    lastRestocked: '2026-10-02'
  },
  {
    id: 'inv-04',
    name: 'Lavender Mineral Bath Crystals',
    category: 'toiletries',
    quantity: 8,
    minThreshold: 20,
    unit: 'jars',
    status: 'low_stock',
    lastRestocked: '2026-09-18'
  },
  {
    id: 'inv-05',
    name: 'Nespresso Master Origin Pods (Assorted 100s)',
    category: 'beverages',
    quantity: 65,
    minThreshold: 30,
    unit: 'boxes',
    status: 'in_stock',
    lastRestocked: '2026-10-10'
  },
  {
    id: 'inv-06',
    name: 'Sparkling Mineral Water (Acqua Panna Glass 750ml)',
    category: 'beverages',
    quantity: 5,
    minThreshold: 24,
    unit: 'crates',
    status: 'low_stock',
    lastRestocked: '2026-09-30'
  },
  {
    id: 'inv-07',
    name: 'Hospitality Eco Disinfectant Concentrate',
    category: 'cleaning',
    quantity: 18,
    minThreshold: 10,
    unit: 'canisters',
    status: 'in_stock',
    lastRestocked: '2026-10-05'
  },
  {
    id: 'inv-08',
    name: 'Smart RFID Room Keycards (Lumora Encrypted)',
    category: 'amenities',
    quantity: 210,
    minThreshold: 100,
    unit: 'cards',
    status: 'in_stock',
    lastRestocked: '2026-10-01'
  }
];
