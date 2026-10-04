export const hotel = {
  name: 'JK Hotel',
  tagline: 'Your Himalayan Retreat in Dharamshala',
  phone: '+91 98050 96956',
  phoneRaw: '919805096956',
  email: 'marketingplutotours@gmail.com',
  address: 'Sokani Da Kot, Mohli, Khaniyara, Dharamshala, Himachal Pradesh 176057',
  lat: 32.21108,
  lng: 76.370964,
  checkIn: '12:00 PM',
  checkOut: '11:00 AM',
  rating: 4.0,
  reviewCount: 10,
}

export const rooms = [
  {
    id: '12353',
    name: 'Deluxe Room',
    price: 2075,
    tax: 125,
    size: '100 sq.ft',
    bed: '1 King Bed',
    guests: 'Up to 3 guests',
    maxGuests: 3,
    view: 'Mountain / Hill view',
    description:
      'Stylish decor, comfortable furnishings and a private balcony with beautiful mountain views for an enjoyable stay.',
    amenities: ['Air conditioning', 'Private bathroom', 'Shower', 'Balcony', 'Sofa seating', 'Free toiletries', 'Towels', 'Bottled water'],
    images: [1, 2, 3].map((i) => `/images/rooms/12353-${i}.webp`),
  },
  {
    id: '12354',
    name: 'Super Deluxe Room',
    price: null,
    size: 'Spacious layout',
    bed: 'Double Bed',
    guests: 'Up to 4 guests',
    maxGuests: 4,
    view: 'Mountain / Hill view',
    description:
      'Spacious layouts, high-end amenities and breathtaking views for a more relaxed, lavish stay in the hills.',
    amenities: ['Air conditioning', 'Flat-screen TV', 'Private bathroom', 'Shower', 'Sofa seating', 'Free toiletries', 'Towels', 'Bottled water'],
    images: [1, 2, 3].map((i) => `/images/rooms/12354-${i}.webp`),
  },
  {
    id: '12355',
    name: 'Family Suite',
    price: 4150,
    tax: 250,
    size: '120 sq.ft',
    bed: '2 Beds',
    guests: 'Up to 4 guests',
    maxGuests: 4,
    view: 'Mountain / Hill view',
    description:
      'Generous space with multiple beds, modern amenities and a cozy atmosphere - perfect for a family getaway.',
    amenities: ['Air conditioning', 'Flat-screen TV', 'Private bathroom', 'Balcony', 'Free toiletries', 'Towels', 'Bottled water', 'Seating area'],
    images: [1, 2, 3].map((i) => `/images/rooms/12355-${i}.webp`),
  },
]

export const mealPlans = [
  { id: 'EP', label: 'Room Only (EP)' },
  { id: 'CP', label: 'Room + Breakfast (CP)' },
  { id: 'MAP', label: 'Breakfast + Lunch or Dinner (MAP)' },
  { id: 'AP', label: 'All Meals (AP)' },
]

export const amenities = [
  { icon: 'Wifi', title: 'Free Wi-Fi', text: 'Stay connected across the property.' },
  { icon: 'Car', title: 'Free Parking', text: 'On-premise parking for your vehicle.' },
  { icon: 'UtensilsCrossed', title: 'Restaurant & Bar', text: 'Local and international dishes, plus a relaxed bar.' },
  { icon: 'ConciergeBell', title: 'Room Service', text: 'Meals and essentials delivered to your door.' },
  { icon: 'Clock', title: '24-hour Front Desk', text: 'Someone is always there to help.' },
  { icon: 'Zap', title: '24h Power Backup', text: 'Uninterrupted electricity, always.' },
  { icon: 'Snowflake', title: 'Air Conditioning', text: 'Centralized air conditioning for comfort.' },
  { icon: 'ShieldCheck', title: 'Safe & Secure', text: 'CCTV in common areas and fire extinguishers.' },
  { icon: 'Plane', title: 'Airport Transfers', text: 'Kangra Airport pick-up and car rental on request.' },
  { icon: 'Map', title: 'Tour Desk', text: 'Help planning treks, temples and sightseeing.' },
  { icon: 'Users', title: 'Family Rooms', text: 'Spacious suites with multiple beds.' },
  { icon: 'Ban', title: 'Non-smoking Rooms', text: 'Fresh, clean-air rooms for everyone.' },
]

export const attractions = [
  { name: 'Triund Hill Trek', distance: '≈ 6 km', text: 'The most loved day trek in Dharamshala with Dhauladhar views.' },
  { name: 'Kangra Airport', distance: '≈ 10 km', text: 'Nearest airport - transfers available on request.' },
  { name: 'HPCA Cricket Stadium', distance: '≈ 9 km', text: 'One of the most scenic cricket grounds in the world.' },
  { name: 'Dalai Lama Temple, McLeod Ganj', distance: '≈ 10 km', text: 'Tibetan culture, monasteries, cafes and markets.' },
  { name: 'Bhagsunag Waterfall', distance: '≈ 11 km', text: 'A cool waterfall and the ancient Bhagsunag temple.' },
  { name: 'Aghanjar Mahadev Temple', distance: 'Nearby', text: 'A peaceful local temple close to the hotel.' },
]

export const reviews = [
  { name: 'Anil Rastogi', rating: 5, text: 'Best stay! The staff was very good, guided me to local places and helped with everything. The food was very good too.' },
  { name: 'Mohit Choudhary', rating: 4, text: "Didn't get the toiletries, otherwise the rooms were clean." },
]

export const gallery = Array.from({ length: 9 }, (_, i) => `/images/hotel-${i + 1}.webp`)

export const money = (n) => '₹' + n.toLocaleString('en-IN')
