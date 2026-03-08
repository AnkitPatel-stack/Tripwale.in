require('dotenv').config()
const mongoose = require('mongoose')
const AdminUser = require('../models/AdminUser')
const Tour = require('../models/Tour')
const ThemeSettings = require('../models/ThemeSettings')

const TOURS_DATA = [
  {
    title: 'Kashmir Paradise Tour',
    description: 'Experience the heaven on earth with our comprehensive Kashmir tour package. From the beautiful Dal Lake to the snow-capped mountains of Gulmarg.',
    location: 'Srinagar, Gulmarg, Pahalgam',
    duration: '6 Nights / 7 Days',
    rating: 4.8,
    price: '₹25,999',
    originalPrice: '₹32,999',
    discount: '21% OFF',
    image: 'https://images.unsplash.com/photo-1593693397695-36243b84f70b?auto=format&fit=crop&w=1200&q=80',
    category: 'hill-station',
    tag: 'Most Popular',
    pageType: 'domestic',
    isFeatured: true,
    sortOrder: 1,
    highlights: ['Stay in houseboat on Dal Lake', 'Gondola ride in Gulmarg', 'Shikara ride', 'Betaab Valley', 'Mughal Gardens'],
    inclusions: ['3-star hotels', 'Daily breakfast & dinner', 'AC vehicle', 'All sightseeing', 'Gondola ride'],
    exclusions: ['Airfare', 'Lunch', 'Personal expenses'],
    bestTime: 'April to October',
    groupSize: '2-15 people',
    difficulty: 'Easy',
    gallery: ['https://images.unsplash.com/photo-1593693397695-36243b84f70b?auto=format&fit=crop&w=800&q=80'],
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar', description: 'Airport pickup and houseboat check-in. Evening Shikara ride.' },
      { day: 2, title: 'Srinagar Sightseeing', description: 'Mughal Gardens, Hazratbal Shrine, local markets.' },
      { day: 3, title: 'Srinagar to Gulmarg', description: 'Gondola ride and snow activities.' },
      { day: 4, title: 'Gulmarg to Pahalgam', description: 'Betaab Valley, Aru Valley, Lidder River.' },
      { day: 5, title: 'Pahalgam Exploration', description: 'Full day exploring valleys and waterfalls.' },
      { day: 6, title: 'Return to Srinagar', description: 'Return drive with shopping.' },
      { day: 7, title: 'Departure', description: 'Airport drop.' },
    ],
  },
  {
    title: 'Kerala Backwaters',
    description: 'Experience the serene backwaters of Kerala with houseboat stay, tea gardens, and cultural shows.',
    location: 'Alleppey, Munnar, Thekkady',
    duration: '5 Nights / 6 Days',
    rating: 4.7,
    price: '₹21,499',
    originalPrice: '₹28,499',
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1200&q=80',
    category: 'backwater',
    tag: 'Best Seller',
    pageType: 'domestic',
    isFeatured: true,
    sortOrder: 2,
    highlights: ['Houseboat stay in Alleppey', 'Tea plantation visit in Munnar', 'Spice garden tour', 'Kathakali show', 'Wildlife safari'],
    inclusions: ['Houseboat accommodation', 'Hotel stays', 'All meals on houseboat', 'Sightseeing', 'Kathakali show tickets'],
    exclusions: ['Airfare', 'Optional activities', 'Personal expenses'],
    bestTime: 'October to March',
    groupSize: '2-12 people',
    difficulty: 'Easy',
    gallery: ['https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80'],
    itinerary: [
      { day: 1, title: 'Arrive Cochin', description: 'Fort Kochi sightseeing, Kathakali show.' },
      { day: 2, title: 'Munnar', description: 'Tea plantations, Eravikulam National Park.' },
      { day: 3, title: 'Thekkady', description: 'Periyar Wildlife Sanctuary boat ride.' },
      { day: 4, title: 'Alleppey', description: 'Check-in houseboat, backwater cruise.' },
      { day: 5, title: 'Alleppey to Kovalam', description: 'Beach time, Ayurvedic spa.' },
      { day: 6, title: 'Departure', description: 'Transfer to Trivandrum airport.' },
    ],
  },
  {
    title: 'Rajasthan Royal Tour',
    description: 'Explore the land of kings with magnificent palaces, forts, and vibrant culture.',
    location: 'Jaipur, Jodhpur, Jaisalmer, Udaipur',
    duration: '8 Nights / 9 Days',
    rating: 4.9,
    price: '₹28,999',
    originalPrice: '₹38,999',
    discount: '26% OFF',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    category: 'heritage',
    tag: 'Royal Experience',
    pageType: 'domestic',
    isFeatured: true,
    sortOrder: 3,
    highlights: ['Amber Fort Jaipur', 'Mehrangarh Fort', 'Jaisalmer Desert Safari', 'Lake Pichola boat ride', 'Heritage hotel stays'],
    inclusions: ['Heritage hotels', 'Breakfast & dinner', 'AC vehicle', 'Camel safari', 'All entry tickets'],
    exclusions: ['Airfare', 'Lunch', 'Personal expenses', 'Camera fees'],
    bestTime: 'October to March',
    groupSize: '2-20 people',
    difficulty: 'Easy',
    gallery: ['https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'],
    itinerary: [
      { day: 1, title: 'Arrive Jaipur', description: 'City Palace, Hawa Mahal.' },
      { day: 2, title: 'Jaipur Forts', description: 'Amber Fort, Nahargarh, Jaigarh.' },
      { day: 3, title: 'Jaipur to Jodhpur', description: 'En-route Ajmer Sharif.' },
      { day: 4, title: 'Jodhpur', description: 'Mehrangarh Fort, Jaswant Thada.' },
      { day: 5, title: 'Jodhpur to Jaisalmer', description: 'En-route Osian temples.' },
      { day: 6, title: 'Jaisalmer', description: 'Golden Fort, Patwon ki Haveli, camel safari.' },
      { day: 7, title: 'Jaisalmer to Udaipur', description: 'Long drive, evening at leisure.' },
      { day: 8, title: 'Udaipur', description: 'City Palace, Lake Pichola, Saheliyon ki Bari.' },
      { day: 9, title: 'Departure', description: 'Transfer to Udaipur airport.' },
    ],
  },
  {
    title: 'Char Dham Yatra',
    description: 'Complete the sacred Char Dham pilgrimage - Yamunotri, Gangotri, Kedarnath, Badrinath.',
    location: 'Uttarakhand',
    duration: '12 Nights / 13 Days',
    rating: 4.9,
    price: '₹35,999',
    originalPrice: '₹45,999',
    discount: '22% OFF',
    image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=1200&q=80',
    category: 'religious',
    tag: 'Divine Journey',
    pageType: 'religious',
    isFeatured: true,
    sortOrder: 1,
    highlights: ['Yamunotri Temple visit', 'Gangotri Temple', 'Kedarnath Helicopter', 'Badrinath Darshan', 'Mana Village'],
    inclusions: ['All accommodation', 'All meals', 'Helicopter for Kedarnath', 'All transportation', 'Guide'],
    exclusions: ['Personal expenses', 'Donations', 'Extra helicopter'],
    bestTime: 'May to June, September to October',
    groupSize: '4-30 people',
    difficulty: 'Moderate',
    gallery: ['https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=800&q=80'],
    itinerary: [
      { day: 1, title: 'Haridwar Arrival', description: 'Ganga Aarti at Har Ki Pauri.' },
      { day: 2, title: 'Haridwar to Barkot', description: 'En-route Kempty Falls, Barkot.' },
      { day: 3, title: 'Yamunotri Darshan', description: 'Trek to Yamunotri Temple.' },
      { day: 4, title: 'Barkot to Uttarkashi', description: 'Visit Vishwanath Temple.' },
      { day: 5, title: 'Gangotri Darshan', description: 'Gangotri Temple visit.' },
    ],
  },
  {
    title: 'Bali Adventure Package',
    description: 'Experience the exotic beauty of Bali with beaches, temples, rice terraces and adventure activities.',
    location: 'Bali, Indonesia',
    duration: '6 Nights / 7 Days',
    rating: 4.8,
    price: '₹62,999',
    originalPrice: '₹79,999',
    discount: '21% OFF',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1200&q=80',
    category: 'beach',
    tag: 'Trending',
    pageType: 'international',
    isFeatured: true,
    sortOrder: 1,
    highlights: ['Uluwatu Temple sunset', 'Tegalalang Rice Terraces', 'Seminyak Beach', 'Mount Batur Sunrise Trek', 'Water Palace Tirta Gangga'],
    inclusions: ['Flights', '4-star resort', 'Breakfast daily', 'Airport transfers', 'All sightseeing', 'Mount Batur trek'],
    exclusions: ['Visa on arrival', 'Lunches & dinners', 'Optional activities'],
    bestTime: 'April to October',
    groupSize: '2-15 people',
    difficulty: 'Easy',
    gallery: ['https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80'],
    itinerary: [
      { day: 1, title: 'Arrive Bali', description: 'Airport pickup, check-in resort. Kuta Beach evening.' },
      { day: 2, title: 'Ubud Day', description: 'Monkey Forest, Rice Terraces, Ubud Palace.' },
      { day: 3, title: 'Mount Batur Sunrise', description: 'Early morning volcano trek, hot springs.' },
      { day: 4, title: 'Temple Tour', description: 'Tanah Lot, Uluwatu Temple, Kecak dance.' },
      { day: 5, title: 'Water Activities', description: 'Snorkeling, surfing lessons, beach clubs.' },
      { day: 6, title: 'Shopping & Leisure', description: 'Seminyak shopping, spa day.' },
      { day: 7, title: 'Departure', description: 'Transfer to airport.' },
    ],
  },
  {
    title: 'Kedarnath Trekking',
    description: 'Trek through the majestic Himalayan trails to reach the sacred Kedarnath temple.',
    location: 'Uttarakhand, Himalayas',
    duration: '5 Nights / 6 Days',
    rating: 4.8,
    price: '₹18,999',
    originalPrice: '₹24,999',
    discount: '24% OFF',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    category: 'trekking',
    tag: 'Best Trek',
    pageType: 'trekking',
    isFeatured: true,
    sortOrder: 1,
    highlights: ['16km trek each way', 'Kedarnath Temple darshan', 'Himalayan views', 'Vasuki Tal optional', 'Experienced guides'],
    inclusions: ['Guesthouse stays', 'All meals on trek', 'Experienced guide', 'Porter service', 'First aid kit'],
    exclusions: ['Personal trekking gear', 'Helicopter ride (optional)', 'Personal expenses'],
    bestTime: 'May to June, September to October',
    groupSize: '4-20 people',
    difficulty: 'Hard',
    gallery: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'],
    itinerary: [
      { day: 1, title: 'Arrive Haridwar', description: 'Welcome, briefing, overnight bus.' },
      { day: 2, title: 'Gaurikund', description: 'Arrive Gaurikund, acclimatization.' },
      { day: 3, title: 'Trek to Kedarnath', description: '16km trek, temple darshan.' },
      { day: 4, title: 'Kedarnath to Sonprayag', description: 'Return trek, overnight.' },
      { day: 5, title: 'Return to Haridwar', description: 'Drive back, evening Ganga Aarti.' },
      { day: 6, title: 'Departure', description: 'Drop at railway station.' },
    ],
  },
  {
    title: 'Manali One Day Trip',
    description: 'A refreshing one-day trip to the mountains of Manali from Chandigarh.',
    location: 'Manali, Himachal Pradesh',
    duration: '1 Day',
    rating: 4.5,
    price: '₹2,999',
    originalPrice: '₹3,999',
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    category: 'hill-station',
    tag: 'Day Trip',
    pageType: 'one-day',
    isFeatured: false,
    sortOrder: 1,
    highlights: ['Hadimba Temple', 'Solang Valley views', 'Mall Road shopping', 'River Beas', 'Vashisht hot springs'],
    inclusions: ['AC vehicle', 'Driver', 'Fuel', 'Parking'],
    exclusions: ['Meals', 'Entry tickets', 'Activities'],
    bestTime: 'March to November',
    groupSize: '2-8 people',
    difficulty: 'Easy',
    gallery: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80'],
    itinerary: [
      { day: 1, title: 'Full Day Manali', description: 'Hadimba Temple, Old Manali, Vashisht, Mall Road.' },
    ],
  },
  {
    title: 'Dubai Extravaganza',
    description: 'Experience the ultramodern city of Dubai with desert safaris, Burj Khalifa and more.',
    location: 'Dubai, UAE',
    duration: '5 Nights / 6 Days',
    rating: 4.8,
    price: '₹69,999',
    originalPrice: '₹89,999',
    discount: '22% OFF',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    category: 'international',
    tag: 'Luxury',
    pageType: 'international',
    isFeatured: true,
    sortOrder: 2,
    highlights: ['Burj Khalifa 124th floor', 'Desert Safari with BBQ', 'Dubai Mall & Fountain show', 'Palm Jumeirah', 'Dubai Frame'],
    inclusions: ['Return flights', '4-star hotel', 'Visa', 'Desert Safari', 'Burj Khalifa ticket', 'Breakfast'],
    exclusions: ['Lunch & dinner', 'Personal shopping', 'Optional tours'],
    bestTime: 'October to April',
    groupSize: '2-20 people',
    difficulty: 'Easy',
    gallery: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'],
    itinerary: [
      { day: 1, title: 'Arrive Dubai', description: 'Airport pickup, hotel check-in, Mall of Emirates.' },
      { day: 2, title: 'Dubai City Tour', description: 'Burj Khalifa, Dubai Mall, Fountain Show.' },
      { day: 3, title: 'Desert Safari', description: 'Dune bashing, camel ride, BBQ dinner.' },
      { day: 4, title: 'Palm & Creek', description: 'Palm Jumeirah, Dubai Frame, Gold Souk.' },
      { day: 5, title: 'Theme Parks', description: 'Global Village or adventure parks.' },
      { day: 6, title: 'Departure', description: 'Shopping, airport transfer.' },
    ],
  },
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tripwale')
    console.log('Connected to MongoDB')

    // Clear existing data
    await AdminUser.deleteMany({})
    await Tour.deleteMany({})
    await ThemeSettings.deleteMany({})
    
    console.log('Cleared existing data')

    // Create admin user
    await AdminUser.create({
      name: 'TripWale Admin',
      email: process.env.ADMIN_EMAIL || 'admin@tripwale.in',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'super_admin',
    })
    console.log('✅ Admin user created')
    console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@tripwale.in'}`)
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`)

    // Create tours
    for (const tour of TOURS_DATA) {
      await Tour.create(tour)
    }
    console.log(`✅ ${TOURS_DATA.length} tours created`)

    // Create default theme
    await ThemeSettings.create({ isActive: true })
    console.log('✅ Default theme created')

    console.log('\n🎉 Database seeded successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seeding error:', err)
    process.exit(1)
  }
}

seed()
