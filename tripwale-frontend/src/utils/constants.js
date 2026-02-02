export const APP_NAME = 'TripWale.in';
export const APP_TAGLINE = 'Travel with Confidence';
export const CONTACT_EMAIL = 'info@tripwale.in';
export const CONTACT_PHONE = '+91 9876543210';
export const SUPPORT_PHONE = '+91 9876543219';

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/tripwale',
  twitter: 'https://twitter.com/tripwale',
  instagram: 'https://instagram.com/tripwale',
  youtube: 'https://youtube.com/tripwale',
  linkedin: 'https://linkedin.com/company/tripwale',
};

export const COMPANY_ADDRESS = {
  street: '123 Travel Street',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  country: 'India',
};

export const BUSINESS_HOURS = {
  weekdays: '9:00 AM - 7:00 PM',
  saturday: '10:00 AM - 5:00 PM',
  sunday: 'Closed',
};

export const NAVIGATION_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/tours', label: 'Tours' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
  { path: '/blog', label: 'Blog' },
  { path: '/offers', label: 'Offers' },
];

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Press', path: '/press' },
    { label: 'Blog', path: '/blog' },
  ],
  support: [
    { label: 'Help Center', path: '/help' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
  ],
  popular: [
    { label: 'Goa Packages', path: '/tours?destination=goa' },
    { label: 'Kerala Backwaters', path: '/tours?destination=kerala' },
    { label: 'Himalayan Treks', path: '/tours?category=trekking' },
    { label: 'Beach Holidays', path: '/tours?category=beach' },
  ],
};

export const PAYMENT_METHODS = [
  'Visa',
  'MasterCard',
  'RuPay',
  'Paytm',
  'Google Pay',
  'PhonePe',
  'UPI',
  'Net Banking',
];

export const PARTNER_AIRLINES = [
  'IndiGo',
  'Air India',
  'SpiceJet',
  'Vistara',
  'Go First',
  'AirAsia',
];

export const DURATION_OPTIONS = [
  { label: 'Short (1-5 days)', value: 'short' },
  { label: 'Medium (6-10 days)', value: 'medium' },
  { label: 'Long (10+ days)', value: 'long' },
];

export const PRICE_RANGES = [
  { label: 'Under ₹10,000', min: 0, max: 10000 },
  { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
  { label: '₹20,000 - ₹30,000', min: 20000, max: 30000 },
  { label: '₹30,000 - ₹50,000', min: 30000, max: 50000 },
  { label: 'Over ₹50,000', min: 50000, max: 100000 },
];

export const SORT_OPTIONS = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Duration: Short to Long', value: 'duration-short' },
  { label: 'Duration: Long to Short', value: 'duration-long' },
];

export const TOUR_TYPES = [
  'Beach',
  'Hill Station',
  'Heritage',
  'Adventure',
  'Wildlife',
  'Pilgrimage',
  'Luxury',
  'Budget',
  'Honeymoon',
  'Family',
];

export const INCLUSIONS = [
  'Accommodation',
  'Meals',
  'Transport',
  'Guide',
  'Activities',
  'Entries',
  'Insurance',
  'Airport Transfer',
];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const SEASONS = [
  { name: 'Summer', months: [3, 4, 5], color: 'bg-orange-100 text-orange-800' },
  { name: 'Monsoon', months: [6, 7, 8, 9], color: 'bg-blue-100 text-blue-800' },
  { name: 'Winter', months: [10, 11, 12, 0, 1, 2], color: 'bg-purple-100 text-purple-800' },
];

export const EMERGENCY_CONTACTS = [
  { type: 'Medical', number: '102' },
  { type: 'Police', number: '100' },
  { type: 'Fire', number: '101' },
  { type: 'Tourism Helpline', number: '1800-11-1363' },
];

export default {
  APP_NAME,
  APP_TAGLINE,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SOCIAL_LINKS,
  COMPANY_ADDRESS,
  BUSINESS_HOURS,
  NAVIGATION_LINKS,
  FOOTER_LINKS,
  PAYMENT_METHODS,
  PARTNER_AIRLINES,
  DURATION_OPTIONS,
  PRICE_RANGES,
  SORT_OPTIONS,
  TOUR_TYPES,
  INCLUSIONS,
  MONTHS,
  SEASONS,
  EMERGENCY_CONTACTS,
};