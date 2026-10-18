import { Room } from '../types';

export const initialRooms: Room[] = [
  {
    id: 'room-101',
    roomNumber: '101',
    name: 'Horizon Deluxe Sanctuary',
    category: 'Deluxe',
    description: 'An expansive open-plan haven flooded with soft natural daylight, bespoke linen bedding, architectural oak furnishings, and a private floor-to-ceiling glass balcony overlooking serene gardens.',
    pricePerNight: 320,
    capacity: { adults: 2, children: 1 },
    bedType: 'King Bed',
    amenities: ['High-speed Wi-Fi', 'Smart Climate Control', 'Nespresso Atelier', 'Rainforest Shower', 'Bose Sound System', 'Private Balcony', '24/7 Room Service'],
    status: 'available',
    rating: 4.9,
    reviewsCount: 128,
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 1,
    sizeSqFt: 520,
    features: ['Panoramic garden vistas', 'Italian marble bath', 'Acoustic soundproofing']
  },
  {
    id: 'room-204',
    roomNumber: '204',
    name: 'Grand Azure Executive Suite',
    category: 'Executive',
    description: 'Sophisticated executive sanctuary crafted for work and elevated relaxation. Features a separate lounge, bespoke marble workstation, deep soaking tub, and access to the Lumora Executive Club.',
    pricePerNight: 480,
    capacity: { adults: 3, children: 1 },
    bedType: 'King Bed',
    amenities: ['Club Lounge Access', 'Ultra-fast Fiber', 'Dedicated Work Atelier', 'Deep Soaking Tub', 'Pillow Menu', 'Cocktail Bar Counter', 'Valet Pressing'],
    status: 'available',
    rating: 4.95,
    reviewsCount: 94,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 2,
    sizeSqFt: 780,
    features: ['Executive Club privileges', 'Separate private parlor', 'Dual vanity marble ensuite']
  },
  {
    id: 'room-308',
    roomNumber: '308',
    name: 'Lumora Presidential Penthouse',
    category: 'Presidential',
    description: 'The pinnacle of architectural luxury. An ultra-private 1,600 sq ft penthouse with 180° horizon sunset views, private rooftop dip pool, personal butler service, and handcrafted designer furnishings.',
    pricePerNight: 1150,
    capacity: { adults: 4, children: 2 },
    bedType: 'Super King',
    amenities: ['Private Rooftop Pool', 'Dedicated 24/7 Butler', 'Chauffeur Airport Transfer', 'Private Wine Cellar', 'Chef Kitchenette', 'Steam Bath & Sauna', 'B&O Acoustic System'],
    status: 'occupied',
    rating: 5.0,
    reviewsCount: 62,
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507038772120-7ffe76f79d04?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 3,
    sizeSqFt: 1650,
    features: ['Private plunge pool', 'Dedicated butler staff', 'Complete skyline panorama']
  },
  {
    id: 'room-102',
    roomNumber: '102',
    name: 'Botanical Standard Queen',
    category: 'Standard',
    description: 'A thoughtfully appointed boutique retreat with minimalist aesthetic, premium eco-cotton linens, quiet courtyard terrace views, and modern smart room amenities.',
    pricePerNight: 195,
    capacity: { adults: 2, children: 0 },
    bedType: 'Queen Bed',
    amenities: ['Wi-Fi 6', 'Smart TV with Streaming', 'Organic Tea & Coffee Bar', 'Walk-in Rain Shower', 'In-room Safe', 'Plush Robes & Slippers'],
    status: 'available',
    rating: 4.8,
    reviewsCount: 156,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 1,
    sizeSqFt: 380,
    features: ['Courtyard view', 'Ultra-quiet acoustic glazing', 'Curated organic amenities']
  },
  {
    id: 'room-205',
    roomNumber: '205',
    name: 'Pavilion Twin Suite',
    category: 'Suite',
    description: 'Spacious and versatile layout featuring dual plush beds, an elegant reading corner with curated art books, marble bathroom with double rain showers, and sunset balcony.',
    pricePerNight: 390,
    capacity: { adults: 2, children: 2 },
    bedType: 'Twin Beds',
    amenities: ['High-speed Wi-Fi', 'Balcony Sunset View', 'Double Rain Showers', 'Dyson Supersonic Dryer', 'Espresso Machine', 'Mini Bar Selection'],
    status: 'cleaning',
    rating: 4.88,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 2,
    sizeSqFt: 640,
    features: ['Twin plush mattresses', 'Expansive veranda', 'Integrated smart lighting']
  },
  {
    id: 'room-301',
    roomNumber: '301',
    name: 'Skyline Terrace Suite',
    category: 'Suite',
    description: 'Perched on the upper tier with sprawling terrace views across the city skyline. Features an intimate fireplace, standalone soaking bathtub, and bespoke sommelier-curated minibar.',
    pricePerNight: 550,
    capacity: { adults: 2, children: 1 },
    bedType: 'King Bed',
    amenities: ['Skyline Terrace', 'Outdoor Daybed', 'Deep Soaking Stone Bath', 'Bespoke Bar', 'Smart Entertainment Hub', 'Complimentary Breakfast'],
    status: 'available',
    rating: 4.96,
    reviewsCount: 110,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 3,
    sizeSqFt: 850,
    features: ['Outdoor daybed on terrace', 'Freestanding stone tub', 'Smart temperature memory']
  },
  {
    id: 'room-105',
    roomNumber: '105',
    name: 'Serenade Garden Deluxe',
    category: 'Deluxe',
    description: 'Ground-floor luxury opening straight into private botanical gardens. Features a tranquil stone patio, morning espresso station, and soothing neutral earth-tone interiors.',
    pricePerNight: 340,
    capacity: { adults: 2, children: 1 },
    bedType: 'King Bed',
    amenities: ['Direct Garden Access', 'Private Patio', 'Bose Sound Dock', 'Smart Tablet Concierge', 'Artisan Coffee Roasters', 'Walk-in Closet'],
    status: 'maintenance',
    rating: 4.85,
    reviewsCount: 74,
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 1,
    sizeSqFt: 540,
    features: ['Private botanical patio', 'Direct lawn access', 'Ambient soundscapes']
  },
  {
    id: 'room-210',
    roomNumber: '210',
    name: 'Atelier Classic Queen',
    category: 'Standard',
    description: 'Designed for the discerning modern traveler seeking understated elegance and serene quiet. High ceilings, warm oak accents, and ergonomic seating.',
    pricePerNight: 210,
    capacity: { adults: 2, children: 0 },
    bedType: 'Queen Bed',
    amenities: ['High-speed Wi-Fi', 'Smart TV', 'Rain Shower', 'Espresso Pods', 'Feather Down Pillows', 'Blackout Automated Curtains'],
    status: 'available',
    rating: 4.82,
    reviewsCount: 92,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 2,
    sizeSqFt: 410,
    features: ['Automated blackout curtains', 'Ergonomic armchair', 'Local artisan tea kit']
  },
  {
    id: 'room-402',
    roomNumber: '402',
    name: 'Celestial Royal Grand Suite',
    category: 'Presidential',
    description: 'An extraordinary dual-level residence framed by wrap-around acoustic glass and breathtaking ocean sunsets. Includes a private infinity hydrotherapy spa, bespoke tasting salon, master marble bathroom with steam room, and around-the-clock private culinary team.',
    pricePerNight: 1450,
    capacity: { adults: 4, children: 2 },
    bedType: 'Super King',
    amenities: [
      'Private Hydrotherapy Spa',
      'Private In-Suite Chef Tasting',
      'Dedicated 24/7 Butler',
      'Chauffeur Airport Transfer',
      'Sonos Architectural Sound',
      'Wine & Champagne Cellar',
      'Bespoke Cashmere Linens',
      'Deep Soaking Tub',
      'Private Balcony'
    ],
    status: 'available',
    rating: 5.0,
    reviewsCount: 48,
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 4,
    sizeSqFt: 1850,
    features: ['Wraparound oceanfront terrace', 'Dual-level marble architecture', 'Private biometric elevator']
  },
  {
    id: 'room-305',
    roomNumber: '305',
    name: 'Mirador Oceanfront Villa Suite',
    category: 'Suite',
    description: 'Immerse yourself in panoramic maritime vistas. Features a sunken cantilevered living lounge, outdoor Japanese soaking tub on a cedar deck, firepit table, and handcrafted oak finishes.',
    pricePerNight: 620,
    capacity: { adults: 3, children: 1 },
    bedType: 'King Bed',
    amenities: [
      'Cedar Deck Soaking Tub',
      'Outdoor Firepit Lounge',
      'Dyson Airwrap & Styling Kit',
      'Specialty Matcha & Espresso Bar',
      'Curated Vinyl Collection',
      'Pillow Concierge',
      'Private Balcony',
      'Rainforest Shower'
    ],
    status: 'available',
    rating: 4.97,
    reviewsCount: 84,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 3,
    sizeSqFt: 920,
    features: ['Sunken cantilevered lounge', 'Japanese cedar bath', 'Panoramic sunset alignment']
  },
  {
    id: 'room-208',
    roomNumber: '208',
    name: 'Lumora Diplomatic Executive Suite',
    category: 'Executive',
    description: 'Designed for distinguished business leaders and discerning explorers. Features an acoustically treated boardroom alcove, motorized Herman Miller ergonomic workstation, custom cocktail credenza, and marble bath.',
    pricePerNight: 520,
    capacity: { adults: 2, children: 1 },
    bedType: 'King Bed',
    amenities: [
      'Executive Boardroom Alcove',
      'Ultra-fast 2Gbps Fiber',
      'Bowers & Wilkins Audio',
      'Valet Garment Care',
      'Club Lounge Access',
      'Nespresso Creatista Pro',
      'Deep Soaking Tub'
    ],
    status: 'available',
    rating: 4.93,
    reviewsCount: 67,
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 2,
    sizeSqFt: 810,
    features: ['Acoustically isolated workspace', 'Custom marble credenza bar', 'Smart conference display']
  },
  {
    id: 'room-112',
    roomNumber: '112',
    name: 'Veranda Garden Spa Suite',
    category: 'Suite',
    description: 'A secluded ground-floor sanctuary enclosed by fragrant citrus and eucalyptus gardens. Features an indoor-outdoor limestone rain shower, private sun lounger garden terrace, and in-suite aroma diffuser.',
    pricePerNight: 440,
    capacity: { adults: 2, children: 1 },
    bedType: 'King Bed',
    amenities: [
      'Private Citrus Garden',
      'Indoor-Outdoor Stone Shower',
      'Rainforest Shower',
      'Aromatherapy Menu',
      'Organic Linen Bathrobes',
      'Smart Garden Lighting',
      'Artisan Breakfast Basket',
      'Private Balcony'
    ],
    status: 'available',
    rating: 4.91,
    reviewsCount: 53,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 1,
    sizeSqFt: 710,
    features: ['Enclosed botanical sun terrace', 'Limestone rainfall ensuite', 'Direct secret garden gate']
  },
  {
    id: 'room-215',
    roomNumber: '215',
    name: 'Solarium Coastal Deluxe Suite',
    category: 'Deluxe',
    description: 'Bathed in luminous coastal light through triple-glazed solarium glass. Features custom bleached oak carpentry, plush bouclé daybed, sculptural freestanding bathtub, and curated local wines.',
    pricePerNight: 360,
    capacity: { adults: 2, children: 1 },
    bedType: 'King Bed',
    amenities: [
      'Solarium Sunlit Nook',
      'Freestanding Sculptural Tub',
      'Deep Soaking Tub',
      'Curated Cellar Bottles',
      'Hi-Fi Audio Streaming',
      'Down Feather Topper',
      '24/7 Room Delivery',
      'Rainforest Shower'
    ],
    status: 'available',
    rating: 4.89,
    reviewsCount: 78,
    images: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 2,
    sizeSqFt: 590,
    features: ['Floor-to-ceiling solarium bay', 'Bouclé reading lounge', 'Italian terrazzo bath']
  },
  {
    id: 'room-314',
    roomNumber: '314',
    name: 'The Monadnock Family Penthouse Suite',
    category: 'Suite',
    description: 'Generously proportioned for luxury family travel. Boasts two interconnecting bedroom wings, full marble living room, children’s bespoke amenity kit, gaming parlor, and double balconies.',
    pricePerNight: 680,
    capacity: { adults: 4, children: 2 },
    bedType: 'Two Double Beds',
    amenities: [
      'Two Interconnecting Wings',
      'Dual Sunset Balconies',
      'Curated Family Library & Gaming',
      'Double Marble Ensuites',
      'Kitchenette with Sub-Zero Fridge',
      'Family Butler Service',
      'Private Balcony',
      'Deep Soaking Tub'
    ],
    status: 'available',
    rating: 4.94,
    reviewsCount: 96,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 3,
    sizeSqFt: 1120,
    features: ['Twin private balconies', 'Dedicated kids lounge wing', 'Sub-Zero gourmet pantry']
  },
  {
    id: 'room-108',
    roomNumber: '108',
    name: 'Nordic Timber Standard King',
    category: 'Standard',
    description: 'Rooted in Scandinavian warmth with light ash timber walls, heated stone bathroom floors, minimalist wool textiles, and private courtyard greenery.',
    pricePerNight: 225,
    capacity: { adults: 2, children: 0 },
    bedType: 'King Bed',
    amenities: ['Heated Stone Floors', 'High-speed Wi-Fi', 'Pour-Over Coffee Atelier', 'Walk-in Rain Shower', 'Wool Throw Blankets', 'Acoustic Soundproofing'],
    status: 'available',
    rating: 4.84,
    reviewsCount: 76,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 1,
    sizeSqFt: 420,
    features: ['Heated limestone flooring', 'Nordic ashwood wall paneling', 'Courtyard flora view']
  },
  {
    id: 'room-116',
    roomNumber: '116',
    name: 'Zen Garden Studio',
    category: 'Standard',
    description: 'Designed for serene mindfulness, featuring shoji-inspired screens, a private meditation bench beside a gravel rock garden, and organic green tea brewing setup.',
    pricePerNight: 240,
    capacity: { adults: 2, children: 0 },
    bedType: 'Queen Bed',
    amenities: ['Meditation Garden Bench', 'Organic Matcha Ceremony Kit', 'Smart Ambient Lighting', 'Minimalist Rain Ensuite', 'Cotton Kimono Robes'],
    status: 'available',
    rating: 4.88,
    reviewsCount: 64,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 1,
    sizeSqFt: 440,
    features: ['Private rock garden view', 'Tatami lounge nook', 'Cedar aroma system']
  },
  {
    id: 'room-218',
    roomNumber: '218',
    name: 'Pacific Cliffside Deluxe',
    category: 'Deluxe',
    description: 'Unrivaled coastal acoustics. Watch morning fog roll over rugged Pacific cliffs from your private furnished timber balcony. Includes a wet bar and deep rainforest shower.',
    pricePerNight: 375,
    capacity: { adults: 2, children: 1 },
    bedType: 'King Bed',
    amenities: ['Private Balcony', 'Ocean Cliff Panorama', 'Rainforest Shower', 'Artisan Cocktail Cabinet', 'Binoculars for Whale Watching', 'Bose Sound Speaker'],
    status: 'available',
    rating: 4.92,
    reviewsCount: 112,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 2,
    sizeSqFt: 560,
    features: ['Cliffside direct sunset line', 'Furnished cedar balcony', 'Marine-grade acoustic glazing']
  },
  {
    id: 'room-222',
    roomNumber: '222',
    name: 'Olive Grove Two Double Deluxe',
    category: 'Deluxe',
    description: 'Ideal for traveling companions or small families. Two plush double beds framed by arched doorways, overlooking historic olive groves with artisanal ceramic bath accents.',
    pricePerNight: 385,
    capacity: { adults: 4, children: 2 },
    bedType: 'Two Double Beds',
    amenities: ['Dual Double Beds', 'Olive Grove Views', 'Double Vanity Sinks', 'Nespresso Atelier', 'Smart Streaming Entertainment', 'Deep Soaking Tub'],
    status: 'available',
    rating: 4.87,
    reviewsCount: 89,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 2,
    sizeSqFt: 600,
    features: ['Arched Mediterranean architecture', 'Dual double mattresses', 'Artisan ceramic tile ensuite']
  },
  {
    id: 'room-228',
    roomNumber: '228',
    name: 'Regent Studio Executive',
    category: 'Executive',
    description: 'Tailored for extended stays and mobile professionals. Features a dedicated media console, private meeting settee, walk-in dressing wardrobe, and daily garment steam service.',
    pricePerNight: 460,
    capacity: { adults: 2, children: 1 },
    bedType: 'King Bed',
    amenities: ['Club Lounge Access', 'High-Speed Workstation', 'Valet Pressing Service', 'Walk-in Wardrobe', 'Nespresso Creatista', 'Rainforest Shower'],
    status: 'cleaning',
    rating: 4.93,
    reviewsCount: 73,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 2,
    sizeSqFt: 720,
    features: ['Walk-in illuminated wardrobe', 'Private briefing settee', 'Executive pantry perks']
  },
  {
    id: 'room-312',
    roomNumber: '312',
    name: 'Alpine Cedar Luxury Suite',
    category: 'Suite',
    description: 'Warm, aromatic cedar interior with a modern ethanol hearth, custom sheepskin loungers, standalone limestone bath tub, and sunset vistas over coastal pine canopies.',
    pricePerNight: 590,
    capacity: { adults: 2, children: 1 },
    bedType: 'King Bed',
    amenities: ['Ethanol Fireplace', 'Freestanding Limestone Tub', 'Deep Soaking Tub', 'Private Balcony', 'Dyson Haircare Suite', 'Sommelier Cellar Selection'],
    status: 'available',
    rating: 4.95,
    reviewsCount: 91,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 3,
    sizeSqFt: 890,
    features: ['Linear ethanol fireplace', 'Hand-carved limestone tub', 'Fragrant cedar timber paneling']
  },
  {
    id: 'room-320',
    roomNumber: '320',
    name: 'Azure Horizon Ocean Suite',
    category: 'Suite',
    description: 'Perched high above the shoreline with sweeping 220° ocean perspectives. Features an expansive open-concept living pavilion, custom bar, and deep soaking tub overlooking the sea.',
    pricePerNight: 650,
    capacity: { adults: 3, children: 1 },
    bedType: 'Super King',
    amenities: ['220° Horizon Vista', 'Private Wrap Balcony', 'Deep Soaking Tub', 'Rainforest Shower', 'Dedicated Concierge', 'Complimentary Champagne'],
    status: 'available',
    rating: 4.98,
    reviewsCount: 104,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 3,
    sizeSqFt: 980,
    features: ['Panoramic glass ocean pavilion', 'Freestanding ocean-facing bathtub', 'Sub-Zero private bar']
  },
  {
    id: 'room-405',
    roomNumber: '405',
    name: 'The Lumora Royal Imperial Estate',
    category: 'Presidential',
    description: 'The crowning jewel of the estate. A sprawling private residence with private heated rooftop pool, 12-person dining salon, grand piano, dual master ensuites, and dedicated team of 3 butlers and private chauffeur.',
    pricePerNight: 1650,
    capacity: { adults: 6, children: 2 },
    bedType: 'Super King',
    amenities: [
      'Private Heated Rooftop Pool',
      'Dedicated 24/7 Butler',
      'Private Chauffeur & Maybach',
      '12-Person Grand Dining Salon',
      'Dual Master Ensuites',
      'Private Balcony',
      'Deep Soaking Tub',
      'Private Wine Cellar'
    ],
    status: 'available',
    rating: 5.0,
    reviewsCount: 39,
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 4,
    sizeSqFt: 2100,
    features: ['Heated rooftop horizon pool', 'Dual master marble wings', 'Private security & chauffeur']
  },
  {
    id: 'room-118',
    roomNumber: '118',
    name: 'Cedar Haven Garden Deluxe',
    category: 'Deluxe',
    description: 'An intimate ground-level hideaway featuring cedarwood louvers opening onto a private botanical patio, an open-concept travertine rain shower, and a curated artisan vinyl collection.',
    pricePerNight: 355,
    capacity: { adults: 2, children: 1 },
    bedType: 'King Bed',
    amenities: [
      'Private Botanical Patio',
      'Travertine Rain Shower',
      'Rainforest Shower',
      'Vinyl Turntable & Record Stash',
      'Nespresso Atelier',
      'Heated Bathroom Tiles',
      'Feather Pillow Menu'
    ],
    status: 'available',
    rating: 4.88,
    reviewsCount: 58,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 1,
    sizeSqFt: 580,
    features: ['Aromatic cedar wall accents', 'Private outdoor sun lounger', 'Travertine double vanity']
  },
  {
    id: 'room-225',
    roomNumber: '225',
    name: 'Atelier Loft Executive',
    category: 'Executive',
    description: 'An architecturally curated double-height corner studio bathed in morning northern light. Boasts a dedicated drafting workstation, custom Italian leather settee, and Lumora Club Lounge privileges.',
    pricePerNight: 495,
    capacity: { adults: 2, children: 1 },
    bedType: 'King Bed',
    amenities: [
      'Club Lounge Access',
      'High-Speed Drafting Desk',
      'Italian Leather Daybed',
      'Walk-in Marble Shower',
      'Deep Soaking Tub',
      'Complimentary Evening Canapés'
    ],
    status: 'available',
    rating: 4.94,
    reviewsCount: 82,
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 2,
    sizeSqFt: 750,
    features: ['Double-height acoustic ceilings', 'Corner panoramic daylight glazing', 'Executive wet bar']
  },
  {
    id: 'room-325',
    roomNumber: '325',
    name: 'The Starlight Observatory Suite',
    category: 'Suite',
    description: 'A romantic crown suite featuring a retractable glass stargazing skylight directly above the master bed, a private brass telescope, wrap-around sunset deck, and a free-standing copper soaking tub.',
    pricePerNight: 720,
    capacity: { adults: 2, children: 1 },
    bedType: 'Super King',
    amenities: [
      'Retractable Glass Skylight',
      'Brass Celestron Telescope',
      'Copper Soaking Bath',
      'Deep Soaking Tub',
      'Private Balcony',
      'Chilled Champagne Bar',
      'Sonos Surround System'
    ],
    status: 'available',
    rating: 4.99,
    reviewsCount: 115,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 3,
    sizeSqFt: 1050,
    features: ['Motorized stargazing skylight ceiling', 'Handcrafted copper bath', 'Wraparound horizon terrace']
  },
  {
    id: 'room-212',
    roomNumber: '212',
    name: 'Cypress Ridge Deluxe Queen',
    category: 'Deluxe',
    description: 'Overlooking Monterey cypress hillsides with fragrant maritime breezes. Features an arched reading alcove, artisan terracotta tile ensuite, cast-iron tea pot, and motorized linen privacy shades.',
    pricePerNight: 335,
    capacity: { adults: 2, children: 1 },
    bedType: 'Queen Bed',
    amenities: [
      'Cypress Hillside Balcony',
      'Terracotta Tile Ensuite',
      'Rainforest Shower',
      'Cast-Iron Tea Atelier',
      'Feather Down Quilt',
      'Marshall Bluetooth Audio',
      'Private Balcony'
    ],
    status: 'available',
    rating: 4.89,
    reviewsCount: 68,
    images: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 2,
    sizeSqFt: 530,
    features: ['Arched hillside reading alcove', 'Handmade terracotta flooring', 'Private sunset balcony']
  },
  {
    id: 'room-318',
    roomNumber: '318',
    name: 'Seraphim Sunset Panorama Suite',
    category: 'Suite',
    description: 'A westerly facing sunset suite framed by curved architectural glass. Features a private cedar wood wet sauna, open-flame ambient bio-fireplace, cocktail bar cart, and panoramic ocean vistas.',
    pricePerNight: 610,
    capacity: { adults: 2, children: 1 },
    bedType: 'King Bed',
    amenities: [
      'In-Suite Cedar Wet Sauna',
      'Curved Panoramic Glass Deck',
      'Deep Soaking Tub',
      'Bio-Ethanol Fireplace',
      'Private Balcony',
      'Sommelier Wine Collection',
      'Rainforest Shower'
    ],
    status: 'available',
    rating: 4.96,
    reviewsCount: 87,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'
    ],
    floor: 3,
    sizeSqFt: 910,
    features: ['Private cedar dry/wet sauna', '270° western sunset curve', 'Curated cocktail mixology bar']
  }
];
