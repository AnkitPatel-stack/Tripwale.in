require('dotenv').config()
const mongoose = require('mongoose')
const Admin = require('../models/Admin')
const Tour = require('../models/Tour')
const SiteSettings = require('../models/SiteSettings')

const sampleTours = [
  {
    title: 'Kashmir Paradise Tour', description: 'Experience heaven on earth with Dal Lake, Gulmarg & Pahalgam.', location: 'Srinagar, Gulmarg, Pahalgam', duration: '6 Nights / 7 Days', price: '₹25,999', originalPrice: '₹32,999', discount: '21% OFF', rating: 4.8,
    image: 'https://images.unsplash.com/photo-1593693397695-36243b84f70b?w=800', category: 'hill-station', tag: 'Most Popular', pageType: 'domestic', active: true, featured: true,
    highlights: ['Houseboat stay on Dal Lake', 'Gondola ride in Gulmarg', 'Shikara ride', 'Betaab Valley visit', 'Mughal Gardens tour'],
    inclusions: ['3-star accommodation', 'Daily breakfast & dinner', 'AC transfers', 'All sightseeing', 'Gondola ride'],
    exclusions: ['Air/train tickets', 'Lunch', 'Personal expenses', 'Travel insurance'],
    difficulty: 'Easy', bestTime: 'April to October', groupSize: '2-15 people',
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar', description: 'Airport pickup. Shikara ride on Dal Lake evening.' },
      { day: 2, title: 'Srinagar Sightseeing', description: 'Mughal Gardens, Hazratbal Shrine, local markets.' },
      { day: 3, title: 'Gulmarg Day Trip', description: 'Gondola ride. Snow activities in winter.' },
      { day: 4, title: 'Pahalgam', description: 'Betaab Valley, Aru Valley, Lidder River.' },
      { day: 5, title: 'Pahalgam Explore', description: 'Valley walks and waterfalls.' },
      { day: 6, title: 'Return to Srinagar', description: 'Shopping and return drive.' },
      { day: 7, title: 'Departure', description: 'Airport drop and farewell.' }
    ]
  },
  {
    title: 'Kerala Backwaters', description: 'Serene backwaters of Kerala with houseboat stay and tea gardens.', location: 'Alleppey, Munnar, Thekkady', duration: '5 Nights / 6 Days', price: '₹21,499', originalPrice: '₹28,499', discount: '25% OFF', rating: 4.7,
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800', category: 'backwater', tag: 'Best Seller', pageType: 'domestic', active: true, featured: true,
    highlights: ['Houseboat cruise', 'Munnar tea gardens', 'Periyar Wildlife Sanctuary', 'Kathakali show'], difficulty: 'Easy', bestTime: 'October to March',
  },
  {
    title: 'Rajasthan Royal Tour', description: 'Explore royal forts, palaces and vibrant culture of Rajasthan.', location: 'Jaipur, Jodhpur, Udaipur, Jaisalmer', duration: '7 Nights / 8 Days', price: '₹28,999', originalPrice: '₹38,999', discount: '26% OFF', rating: 4.9,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800', category: 'heritage', tag: 'Premium', pageType: 'domestic', active: true, featured: true,
    highlights: ['Amber Fort Jaipur', 'Mehrangarh Fort Jodhpur', 'Lake Palace Udaipur', 'Desert Safari Jaisalmer'], difficulty: 'Easy', bestTime: 'October to March',
  },
  {
    title: 'Manali Adventure', description: 'Snow-capped mountains, Rohtang Pass and adventure sports in Manali.', location: 'Delhi, Manali, Rohtang', duration: '5 Nights / 6 Days', price: '₹15,999', originalPrice: '₹21,999', discount: '27% OFF', rating: 4.6,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', category: 'adventure', tag: 'Adventure', pageType: 'domestic', active: true, featured: false,
    highlights: ['Rohtang Pass', 'Solang Valley', 'Paragliding', 'River Rafting', 'Hadimba Temple'], difficulty: 'Moderate', bestTime: 'May to June, Oct',
  },
  {
    title: 'Char Dham Yatra', description: 'Sacred pilgrimage to Yamunotri, Gangotri, Kedarnath and Badrinath.', location: 'Uttarakhand - Char Dham Circuit', duration: '11 Nights / 12 Days', price: '₹35,999', originalPrice: '₹45,999', discount: '22% OFF', rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', category: 'religious', tag: 'Divine', pageType: 'religious', active: true, featured: true,
    highlights: ['Yamunotri Temple', 'Gangotri Glacier', 'Kedarnath by helicopter', 'Badrinath Darshan'], difficulty: 'Moderate', bestTime: 'May to June, Oct',
  },
  {
    title: 'Tirupati Balaji Tour', description: 'Darshan of Lord Venkateshwara at the holy Tirupati Balaji temple.', location: 'Tirupati, Tirumala', duration: '2 Nights / 3 Days', price: '₹8,999', originalPrice: '₹12,999', discount: '31% OFF', rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800', category: 'religious', tag: 'Spiritual', pageType: 'religious', active: true,
    highlights: ['Tirumala Temple Darshan', 'TTD Queue Darshan ticket', 'Akasa Ganga', 'Silathoranam'], difficulty: 'Easy', bestTime: 'Year Round',
  },
  {
    title: 'Bali International Tour', description: 'Tropical paradise with temples, rice terraces and stunning beaches.', location: 'Denpasar, Ubud, Seminyak, Kuta', duration: '5 Nights / 6 Days', price: '₹45,999', originalPrice: '₹59,999', discount: '23% OFF', rating: 4.8,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', category: 'international', tag: 'International', pageType: 'international', active: true, featured: true,
    highlights: ['Tanah Lot Temple', 'Ubud Rice Terraces', 'Kuta Beach', 'Uluwatu Sunset', 'Tegalalang'], difficulty: 'Easy', bestTime: 'April to October',
  },
  {
    title: 'Thailand Grand Tour', description: 'Bangkok temples, Chiang Mai mountains and Phuket beaches.', location: 'Bangkok, Phuket, Chiang Mai', duration: '6 Nights / 7 Days', price: '₹39,999', originalPrice: '₹52,999', discount: '25% OFF', rating: 4.7,
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800', category: 'international', tag: 'Best Seller', pageType: 'international', active: true, featured: true,
    highlights: ['Grand Palace Bangkok', 'Phi Phi Islands', 'Elephant Sanctuary', 'Doi Suthep Temple'], difficulty: 'Easy', bestTime: 'November to April',
  },
  {
    title: 'Rishikesh White Water Rafting', description: 'Adventure rafting on Ganga River with yoga and bungee jumping.', location: 'Rishikesh, Haridwar', duration: '2 Days / 1 Night', price: '₹3,999', originalPrice: '₹5,999', discount: '33% OFF', rating: 4.7,
    image: 'https://images.unsplash.com/photo-1530866494941-86d45e0c55f9?w=800', category: 'adventure', tag: 'Adventure', pageType: 'one-day', active: true,
    highlights: ['Grade 3-4 Rafting', 'Bungee Jumping option', 'Ganga Aarti', 'Camp on Riverside'], difficulty: 'Moderate', bestTime: 'September to June',
  },
  {
    title: 'Valley of Flowers Trek', description: 'UNESCO World Heritage Site with 300+ flower species in Himalayan meadows.', location: 'Uttarakhand - Valley of Flowers', duration: '6 Nights / 7 Days', price: '₹18,999', originalPrice: '₹24,999', discount: '24% OFF', rating: 4.9,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', category: 'trekking', tag: 'UNESCO', pageType: 'trekking', active: true, featured: true,
    highlights: ['300+ flower species', 'Hemkund Sahib', 'Ghangaria base camp', 'Pushpawati river'], difficulty: 'Moderate', bestTime: 'July to September',
  },
]

const defaultSettings = [
  { key: 'siteName', value: 'TripWale.in', category: 'general' },
  { key: 'siteTagline', value: 'Explore India with Us', category: 'general' },
  { key: 'contactPhone', value: '+91 6266203629', category: 'general' },
  { key: 'contactEmail', value: 'info@tripwale.in', category: 'general' },
  { key: 'contactAddress', value: 'Indore, Madhya Pradesh, India', category: 'general' },
  { key: 'whatsappNumber', value: '916266203629', category: 'integrations' },
  { key: 'primaryColor', value: '#1e3a8a', category: 'theme' },
  { key: 'secondaryColor', value: '#FF6B6B', category: 'theme' },
  { key: 'fontFamily', value: 'Poppins', category: 'theme' },
  { key: 'facebook', value: 'https://facebook.com/tripwale', category: 'social' },
  { key: 'instagram', value: 'https://instagram.com/tripwale', category: 'social' },
  { key: 'youtube', value: 'https://youtube.com/tripwale', category: 'social' },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tripwale')
  console.log('Connected to MongoDB')
  
  // Create admin
  await Admin.deleteMany({})
  await Admin.create({
    name: 'TripWale Admin',
    email: process.env.ADMIN_EMAIL || 'admin@tripwale.in',
    password: process.env.ADMIN_PASSWORD || 'Admin@123',
    role: 'super_admin',
  })
  console.log('✅ Admin created')
  
  // Import tours
  await Tour.deleteMany({})
  await Tour.insertMany(sampleTours)
  console.log(`✅ ${sampleTours.length} tours seeded`)
  
  // Settings
  await SiteSettings.deleteMany({})
  await SiteSettings.insertMany(defaultSettings)
  console.log('✅ Settings seeded')
  
  mongoose.disconnect()
  console.log('\n🎉 Database seeded successfully!')
  console.log('📧 Login: admin@tripwale.in | 🔑 Password: Admin@123')
}

seed().catch(err => { console.error(err); process.exit(1) })
