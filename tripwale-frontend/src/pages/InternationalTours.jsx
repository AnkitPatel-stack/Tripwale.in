import React, { useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Rating,
  Skeleton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  LocationOn,
  CalendarToday,
  Flight,
  Public,
} from '@mui/icons-material'

const InternationalTours = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  
  const [destinationFilter, setDestinationFilter] = useState('')
  const [durationFilter, setDurationFilter] = useState('')

  const internationalTours = [
    {
      id: 1,
      title: 'Bali Romantic Getaway',
      description: 'Beaches, temples and cultural experiences',
      location: 'Bali, Indonesia',
      duration: '8 Days',
      price: '₹45,999',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&auto=format&fit=crop',
      category: 'asia',
      flightIncluded: true,
      // Bestseller: true
    },
    {
      id: 2,
      title: 'Adman, Nicobar Islands',
      description: 'Tropical paradise with pristine beaches',
      location: 'Andaman & Nicobar Islands, India',
      duration: '6 Days',
      price: '₹35,999',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1552465011-b4e30bf7349d?w-800&auto=format&fit=crop',
      category: 'asia',
      flightIncluded: true,
      // Bestseller: false
    },
    {
      id: 3,
      title: 'Thailand Beach Holiday',
      description: 'Islands, night markets and Thai massage',
      location: 'Phuket, Bangkok, Pattaya',
      duration: '7 Days',
      price: '₹38,999',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop',
      category: 'asia',
      flightIncluded: true,
      // Bestseller: true
    },
    {
      id: 4,
      title: 'Dubai Luxury Tour',
      description: 'Desert safari, Burj Khalifa and shopping',
      location: 'Dubai, Abu Dhabi',
      duration: '6 Days',
      price: '₹52,999',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
      category: 'middle-east',
      flightIncluded: true,
      // Bestseller: false
    },
    {
      id: 5,
      title: 'Singapore-Malaysia',
      description: 'City lights and cultural diversity',
      location: 'Singapore, Kuala Lumpur',
      duration: '7 Days',
      price: '₹49,999',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800&auto=format&fit=crop',
      category: 'asia',
      flightIncluded: true,
      // Bestseller: true
    },
    {
      id: 6,
      title: 'Japan Cherry Blossom',
      description: 'Cherry blossoms and traditional culture',
      location: 'Tokyo, Kyoto, Osaka',
      duration: '10 Days',
      price: '₹89,999',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop',
      category: 'asia',
      flightIncluded: true,
      // Bestseller: false
    },
    {
      id: 7,
      title: 'Vietnam Discovery',
      description: 'Ancient towns and stunning landscapes',
      location: 'Hanoi, Halong Bay, Ho Chi Minh',
      duration: '8 Days',
      price: '₹41,999',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop',
      category: 'asia',
      flightIncluded: true,
      // Bestseller: false
    },
    {
      id: 8,
      title: 'Nepal Adventure',
      description: 'Himalayan views and cultural heritage',
      location: 'Kathmandu, Pokhara, Chitwan',
      duration: '7 Days',
      price: '₹28,999',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=800&auto=format&fit=crop',
      category: 'asia',
      flightIncluded: true,
      // Bestseller: true
    },
    {
      id: 9,
      title: 'Bhutan Happiness Tour',
      description: 'Land of happiness and ancient monasteries',
      location: 'Paro, Thimphu, Punakha',
      duration: '6 Days',
      price: '₹39,999',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4c6?w=800&auto=format&fit=crop',
      category: 'asia',
      flightIncluded: true,
      // Bestseller: false
    },
    {
      id: 10,
      title: 'Maldives Paradise',
      description: 'Overwater villas and crystal clear waters',
      location: 'Male, Various Islands',
      duration: '5 Days',
      price: '₹65,999',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop',
      category: 'asia',
      flightIncluded: true,
      // Bestseller: true
    },
    {
      id: 11,
      title: 'Sri Lanka Cultural Tour',
      description: 'Ancient cities and beautiful beaches',
      location: 'Colombo, Kandy, Galle',
      duration: '8 Days',
      price: '₹37,999',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1552465011-b4e30bf7349d?w=800&auto=format&fit=crop',
      category: 'asia',
      flightIncluded: true,
      // Bestseller: false
    },
    {
      id: 12,
      title: 'Europe Highlights',
      description: 'Multiple countries in one amazing tour',
      location: 'France, Switzerland, Italy',
      duration: '12 Days',
      price: '₹1,25,999',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop',
      category: 'europe',
      flightIncluded: true,
      // Bestseller: true
    },
  ]

  const handleBookNow = (tourTitle, tourDuration, tourPrice) => {
    const phoneNumber = '916266203629'
    const message = `Hi, I'm interested in booking the "${tourTitle}" international tour (${tourDuration}, ${tourPrice}). Please provide me with more information about visa requirements and package details.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappURL, '_blank')
  }

  const handleVisaAssistance = () => {
    const phoneNumber = '916266203629'
    const message = "Hi, I need visa assistance for an international trip. Can you help me with the documentation process?"
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappURL, '_blank')
  }

  const filteredTours = internationalTours.filter(tour => {
    if (destinationFilter && tour.category !== destinationFilter) return false
    if (durationFilter) {
      const days = parseInt(tour.duration)
      if (durationFilter === 'short' && (days < 3 || days > 7)) return false
      if (durationFilter === 'medium' && (days < 8 || days > 12)) return false
      if (durationFilter === 'long' && days < 13) return false
    }
    return true
  })

  const getColumns = () => {
    if (isMobile) return 12
    if (isTablet) return 6
    return 4
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
      {/* Header Section */}
      <Box sx={{ 
        mb: { xs: 4, md: 6 }, 
        textAlign: 'center',
        px: { xs: 1, sm: 2 }
      }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }, 
            mb: 2,
            fontWeight: 'bold',
            color: '#1e3a8a'
          }}
        >
          International Tours
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ 
            fontSize: { xs: '1rem', md: '1.25rem' },
            maxWidth: 800,
            mx: 'auto'
          }}
        >
          Explore the world with our premium international tour packages
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 2, 
        flexWrap: 'wrap',
        px: { xs: 1, sm: 2 }
      }}>
        <FormControl sx={{ 
          minWidth: { xs: '100%', sm: 200 },
          mb: { xs: 1, sm: 0 }
        }}>
          <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Destination</InputLabel>
          <Select 
            label="Destination" 
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
            size={isMobile ? 'small' : 'medium'}
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            <MenuItem value="">All Destinations</MenuItem>
            <MenuItem value="asia">Asia</MenuItem>
            <MenuItem value="europe">Europe</MenuItem>
            <MenuItem value="middle-east">Middle East</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ 
          minWidth: { xs: '100%', sm: 200 },
          mb: { xs: 1, sm: 0 }
        }}>
          <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Duration</InputLabel>
          <Select 
            label="Duration" 
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            size={isMobile ? 'small' : 'medium'}
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            <MenuItem value="">Any Duration</MenuItem>
            <MenuItem value="short">3-7 Days</MenuItem>
            <MenuItem value="medium">8-12 Days</MenuItem>
            <MenuItem value="long">13+ Days</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Tour Cards */}
      <Grid container spacing={3}>
        {filteredTours.map((tour) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={tour.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 6
              }
            }}>
              {/* Image with Bestseller Badge */}
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={tour.image}
                  alt={tour.title}
                  sx={{
                    objectFit: 'cover',
                    aspectRatio: '16/9'
                  }}
                />
                {tour.Bestseller && (
                  <Chip
                    label="Bestseller"
                    color="primary"
                    size="small"
                    sx={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 10, 
                      zIndex: 1,
                      fontWeight: 'bold'
                    }}
                  />
                )}
              </Box>
              
              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="h2"
                  sx={{ 
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    fontWeight: 'bold',
                    lineHeight: 1.3
                  }}
                >
                  {tour.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    lineHeight: 1.4
                  }}
                >
                  {tour.description}
                </Typography>
                
                {/* Location */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn fontSize="small" sx={{ mr: 0.5, color: '#666' }} />
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    {tour.location}
                  </Typography>
                </Box>
                
                {/* Duration & Rating */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  mb: 2,
                  flexWrap: 'wrap',
                  gap: 1
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday fontSize="small" sx={{ mr: 0.5, color: '#666' }} />
                    <Typography 
                      variant="body2"
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                      {tour.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating 
                      value={tour.rating} 
                      precision={0.1} 
                      size="small" 
                      readOnly 
                    />
                    <Typography 
                      variant="body2"
                      sx={{ 
                        ml: 0.5,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}
                    >
                      ({tour.rating})
                    </Typography>
                  </Box>
                </Box>
                
                {/* Flight Included */}
                {tour.flightIncluded && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Flight fontSize="small" sx={{ mr: 0.5, color: '#1e3a8a' }} />
                    <Typography 
                      variant="body2" 
                      color="primary"
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 'bold'
                      }}
                    >
                      Flight Included
                    </Typography>
                  </Box>
                )}
                
                {/* Price */}
                <Typography 
                  variant="h6" 
                  color="primary" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    mt: 'auto'
                  }}
                >
                  {tour.price}
                </Typography>
              </CardContent>
              
              <CardActions sx={{ p: { xs: 1, sm: 2 }, pt: 0 }}>
                <Button 
                  fullWidth 
                  variant="contained"
                  onClick={() => handleBookNow(tour.title, tour.duration, tour.price)}
                  size={isMobile ? 'small' : 'medium'}
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    py: { xs: 0.5, sm: 1 }
                  }}
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Visa Assistance Section */}
      

      {/* Features Section */}
      {/* <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4, 
            fontWeight: 'bold', 
            color: '#1e3a8a',
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' }
          }}
        >
          Why Travel With Us?
        </Typography>
        <Grid container spacing={3}>
          {[
            { 
              icon: <Flight fontSize="large" />, 
              title: 'Flight Included', 
              desc: 'All packages include return flights' 
            },
            { 
              icon: <Public fontSize="large" />, 
              title: 'Global Coverage', 
              desc: '50+ destinations worldwide' 
            },
            { 
              icon: '🏨', 
              title: 'Premium Hotels', 
              desc: '4-5 star accommodations' 
            },
            { 
              icon: '📋', 
              title: 'Visa Support', 
              desc: 'End-to-end visa assistance' 
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ 
                p: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <Box sx={{ 
                  color: '#1e3a8a', 
                  mb: 2,
                  fontSize: '2.5rem'
                }}>
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 1, 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.875rem', sm: '0.9rem' } }}
                >
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box> */}
    </Container>
  )
}

export default InternationalTours