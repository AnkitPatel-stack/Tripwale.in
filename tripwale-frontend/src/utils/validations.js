import * as Yup from 'yup';

// User registration validation
export const registerValidation = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid Indian phone number')
    .required('Phone number is required'),
});

// User login validation
export const loginValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

// Trip validation
export const tripValidation = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .max(200, 'Title cannot exceed 200 characters'),
  shortDescription: Yup.string()
    .required('Short description is required')
    .max(300, 'Short description cannot exceed 300 characters'),
  description: Yup.string()
    .required('Description is required'),
  category: Yup.string()
    .required('Category is required'),
  type: Yup.string()
    .required('Type is required')
    .oneOf(['domestic', 'international', 'religious', 'corporate', 'student', 'weekend', 'oneday']),
  'duration.days': Yup.number()
    .required('Days is required')
    .min(1, 'Minimum 1 day'),
  'duration.nights': Yup.number()
    .required('Nights is required')
    .min(0, 'Cannot be negative'),
  'price.perPerson': Yup.number()
    .required('Price is required')
    .min(0, 'Price cannot be negative'),
  'price.childDiscount': Yup.number()
    .min(0, 'Discount cannot be negative'),
  'price.seniorDiscount': Yup.number()
    .min(0, 'Discount cannot be negative'),
  startDate: Yup.date()
    .required('Start date is required')
    .min(new Date(), 'Start date cannot be in past'),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date must be after start date'),
  maxPeople: Yup.number()
    .required('Maximum people is required')
    .min(1, 'Minimum 1 person'),
  availableSeats: Yup.number()
    .required('Available seats is required')
    .min(0, 'Cannot be negative')
    .max(Yup.ref('maxPeople'), 'Available seats cannot exceed maximum people'),
});

// Inquiry validation
export const inquiryValidation = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid Indian phone number')
    .required('Phone number is required'),
  subject: Yup.string()
    .required('Subject is required'),
  message: Yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters'),
});

// Booking validation
export const bookingValidation = Yup.object({
  travelDate: Yup.date()
    .required('Travel date is required')
    .min(new Date(), 'Travel date cannot be in past'),
  adults: Yup.number()
    .required('Number of adults is required')
    .min(1, 'At least 1 adult is required')
    .max(20, 'Maximum 20 adults'),
  children: Yup.number()
    .min(0, 'Cannot be negative')
    .max(10, 'Maximum 10 children'),
  seniors: Yup.number()
    .min(0, 'Cannot be negative')
    .max(10, 'Maximum 10 seniors'),
});

// Category validation
export const categoryValidation = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .max(50, 'Name cannot exceed 50 characters'),
  description: Yup.string()
    .required('Description is required'),
  order: Yup.number()
    .required('Order is required')
    .min(0, 'Order cannot be negative'),
});

// Profile update validation
export const profileValidation = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid Indian phone number')
    .required('Phone number is required'),
});

// Password change validation
export const passwordValidation = Yup.object({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required')
    .notOneOf([Yup.ref('currentPassword')], 'New password must be different from current password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});