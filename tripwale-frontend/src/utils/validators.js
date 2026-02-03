// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  // Password validation
  export const isValidPassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return passwordRegex.test(password)
  }
  
  // Phone number validation
  export const isValidPhone = (phone) => {
    // Basic phone validation - 10 digits, optional country code
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone.replace(/\D/g, ''))
  }
  
  // URL validation
  export const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  
  // Date validation
  export const isValidDate = (dateString) => {
    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date)
  }
  
  // Credit card validation (Luhn algorithm)
  export const isValidCreditCard = (cardNumber) => {
    const cleaned = cardNumber.replace(/\D/g, '')
    let sum = 0
    let shouldDouble = false
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i))
      
      if (shouldDouble) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      
      sum += digit
      shouldDouble = !shouldDouble
    }
    
    return sum % 10 === 0
  }
  
  // Credit card type detection
  export const getCreditCardType = (cardNumber) => {
    const patterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    }
    
    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(cardNumber.replace(/\D/g, ''))) {
        return type
      }
    }
    
    return 'unknown'
  }
  
  // Validate Indian PAN card
  export const isValidPan = (pan) => {
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/
    return panRegex.test(pan.toUpperCase())
  }
  
  // Validate Indian Aadhaar card
  export const isValidAadhaar = (aadhaar) => {
    const cleaned = aadhaar.replace(/\s|-/g, '')
    return /^\d{12}$/.test(cleaned)
  }
  
  // Validate GST number
  export const isValidGST = (gst) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    return gstRegex.test(gst.toUpperCase())
  }
  
  // Required field validation
  export const isRequired = (value) => {
    if (value === undefined || value === null) return false
    if (typeof value === 'string') return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    return true
  }
  
  // Min length validation
  export const hasMinLength = (value, min) => {
    if (!value) return false
    return String(value).length >= min
  }
  
  // Max length validation
  export const hasMaxLength = (value, max) => {
    if (!value) return true
    return String(value).length <= max
  }
  
  // Exact length validation
  export const hasExactLength = (value, length) => {
    if (!value) return false
    return String(value).length === length
  }
  
  // Number range validation
  export const isInRange = (value, min, max) => {
    const num = parseFloat(value)
    if (isNaN(num)) return false
    return num >= min && num <= max
  }
  
  // Future date validation
  export const isFutureDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date > today
  }
  
  // Past date validation
  export const isPastDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }
  
  // Minimum age validation
  export const isMinimumAge = (birthDate, minAge) => {
    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age >= minAge
  }
  
  // Validate file type
  export const isValidFileType = (file, allowedTypes) => {
    if (!file || !allowedTypes || !Array.isArray(allowedTypes)) return false
    
    const fileType = file.type || file.name.split('.').pop().toLowerCase()
    return allowedTypes.some(type => {
      if (type.startsWith('.')) {
        return fileType === type.slice(1)
      }
      return fileType.includes(type)
    })
  }
  
  // Validate file size
  export const isValidFileSize = (file, maxSizeMB) => {
    if (!file) return false
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    return file.size <= maxSizeBytes
  }
  
  // Validate image dimensions
  export const isValidImageDimensions = (file, minWidth, minHeight, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      if (!file || !file.type.includes('image')) {
        resolve(false)
        return
      }
      
      const img = new Image()
      img.onload = () => {
        const validWidth = (!minWidth || img.width >= minWidth) && (!maxWidth || img.width <= maxWidth)
        const validHeight = (!minHeight || img.height >= minHeight) && (!maxHeight || img.height <= maxHeight)
        resolve(validWidth && validHeight)
      }
      img.onerror = () => resolve(false)
      img.src = URL.createObjectURL(file)
    })
  }
  
  // Validate OTP
  export const isValidOTP = (otp, length = 6) => {
    const otpRegex = new RegExp(`^\\d{${length}}$`)
    return otpRegex.test(otp)
  }
  
  // Validate Pincode (Indian)
  export const isValidPincode = (pincode) => {
    const pincodeRegex = /^[1-9][0-9]{5}$/
    return pincodeRegex.test(pincode)
  }
  
  // Validate IFSC code
  export const isValidIFSC = (ifsc) => {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/
    return ifscRegex.test(ifsc.toUpperCase())
  }
  
  // Validate UPI ID
  export const isValidUPI = (upi) => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/
    return upiRegex.test(upi)
  }
  
  // Validate password strength
  export const getPasswordStrength = (password) => {
    if (!password) return 0
    
    let strength = 0
    
    // Length check
    if (password.length >= 8) strength += 1
    if (password.length >= 12) strength += 1
    
    // Character type checks
    if (/[a-z]/.test(password)) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    
    return Math.min(strength, 5) // Max 5
  }
  
  // Password strength description
  export const getPasswordStrengthText = (strength) => {
    const levels = [
      'Very Weak',
      'Weak',
      'Fair',
      'Good',
      'Strong',
      'Very Strong'
    ]
    return levels[Math.min(strength, 5)]
  }
  
  // Validate form fields
  export const validateForm = (formData, validationRules) => {
    const errors = {}
    
    for (const [field, rules] of Object.entries(validationRules)) {
      const value = formData[field]
      
      for (const rule of rules) {
        if (rule.required && !isRequired(value)) {
          errors[field] = rule.message || `${field} is required`
          break
        }
        
        if (rule.minLength && !hasMinLength(value, rule.minLength)) {
          errors[field] = rule.message || `${field} must be at least ${rule.minLength} characters`
          break
        }
        
        if (rule.maxLength && !hasMaxLength(value, rule.maxLength)) {
          errors[field] = rule.message || `${field} must be at most ${rule.maxLength} characters`
          break
        }
        
        if (rule.email && value && !isValidEmail(value)) {
          errors[field] = rule.message || 'Please enter a valid email address'
          break
        }
        
        if (rule.phone && value && !isValidPhone(value)) {
          errors[field] = rule.message || 'Please enter a valid phone number'
          break
        }
        
        if (rule.password && value && !isValidPassword(value)) {
          errors[field] = rule.message || 'Password must be at least 8 characters with uppercase, lowercase, and number'
          break
        }
        
        if (rule.match && value !== formData[rule.match]) {
          errors[field] = rule.message || 'Values do not match'
          break
        }
        
        if (rule.custom && value && !rule.validator(value, formData)) {
          errors[field] = rule.message || 'Invalid value'
          break
        }
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
  
  // Sanitize input
  export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input
    
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }
  
  // Trim and sanitize object values
  export const sanitizeObject = (obj) => {
    const sanitized = {}
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = value.trim()
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map(item => 
          typeof item === 'string' ? item.trim() : item
        )
      } else {
        sanitized[key] = value
      }
    }
    
    return sanitized
  }
  
  // Validate booking dates
  export const validateBookingDates = (checkIn, checkOut, minStay = 1) => {
    if (!checkIn || !checkOut) return false
    
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return false
    
    // Check if check-in is today or in future
    if (start < today) return false
    
    // Check if check-out is after check-in
    if (end <= start) return false
    
    // Check minimum stay
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    if (nights < minStay) return false
    
    return true
  }
  
  // Validate travel group size
  export const validateGroupSize = (adults, children = 0, infants = 0, maxGroupSize = 10) => {
    const total = adults + children + infants
    return total > 0 && total <= maxGroupSize && adults >= 1
  }
  
  export default {
    isValidEmail,
    isValidPassword,
    isValidPhone,
    isValidUrl,
    isValidDate,
    isValidCreditCard,
    getCreditCardType,
    isValidPan,
    isValidAadhaar,
    isValidGST,
    isRequired,
    hasMinLength,
    hasMaxLength,
    hasExactLength,
    isInRange,
    isFutureDate,
    isPastDate,
    isMinimumAge,
    isValidFileType,
    isValidFileSize,
    isValidImageDimensions,
    isValidOTP,
    isValidPincode,
    isValidIFSC,
    isValidUPI,
    getPasswordStrength,
    getPasswordStrengthText,
    validateForm,
    sanitizeInput,
    sanitizeObject,
    validateBookingDates,
    validateGroupSize,
  }