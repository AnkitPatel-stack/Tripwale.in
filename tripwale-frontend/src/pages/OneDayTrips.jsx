import React, { useState } from 'react'
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
  Skeleton,
} from '@mui/material'
import {
  LocationOn,
  AccessTime,
  DirectionsCar,
  LocalOffer,
  WhatsApp,
  Groups,
  Restaurant,
  Guide,
} from '@mui/icons-material'

const OneDayTrips = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const [filter, setFilter] = useState('all')

  const trips = [
    {
      id: 1,
      title: 'Maheshwar Darshan',
      description: 'Experience the spiritual bliss of Maheshwar - temple town on Narmada river banks',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop',
      duration: '12 Hours',
      distance: '90 km from Indore',
      price: '₹1,499',
      originalPrice: '₹2,499',
      rating: 4.5,
      category: 'spiritual',
      highlights: ['Ahilya Fort', 'Narmada Ghat', 'Ancient Temples', 'River Cruise'],
      departure: '6:00 AM',
      inclusions: ['Transport', 'Guide', 'Breakfast', 'Entry Tickets']
    },
    {
      id: 2,
      title: 'Mandav Hills Exploration',
      description: 'Discover historic ruins and beautiful architecture of Mandu fort city',
      image: 'https://images.unsplash.com/photo-1593693399746-4c0514be15c5?w=800&auto=format&fit=crop',
      duration: '14 Hours',
      distance: '100 km from Indore',
      price: '₹1,799',
      originalPrice: '₹2,999',
      rating: 4.7,
      category: 'historical',
      highlights: ['Jahaz Mahal', 'Hindola Mahal', 'Baz Bahadur Palace', 'Scenic Views'],
      departure: '5:30 AM',
      inclusions: ['Transport', 'Guide', 'Lunch', 'All Entries']
    },
    {
      id: 3,
      title: 'Ralamandal Trek Adventure',
      description: 'Perfect trekking adventure in Ralamandal Wildlife Sanctuary',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop',
      duration: '8 Hours',
      distance: '25 km from Indore',
      price: '₹999',
      originalPrice: '₹1,599',
      rating: 4.3,
      category: 'adventure',
      highlights: ['Trekking Trail', 'Wildlife Spotting', 'Nature Walk', 'Bird Watching'],
      departure: '7:00 AM',
      inclusions: ['Transport', 'Guide', 'Breakfast', 'Safety Gear']
    },
    {
      id: 4,
      title: 'Gokliya Kund & Waterfalls',
      description: 'Serene waterfalls and natural pools in lush green surroundings',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
      duration: '10 Hours',
      distance: '60 km from Indore',
      price: '₹1,299',
      originalPrice: '₹1,999',
      rating: 4.4,
      category: 'nature',
      highlights: ['Waterfalls', 'Natural Pool', 'Scenic Beauty', 'Picnic Spot'],
      departure: '6:30 AM',
      inclusions: ['Transport', 'Guide', 'Breakfast', 'Photography']
    },
    {
      id: 5,
      title: 'Kila Kund Forest Trek',
      description: 'Explore dense forests and natural springs of Kila Kund',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop',
      duration: '9 Hours',
      distance: '40 km from Indore',
      price: '₹1,199',
      originalPrice: '₹1,899',
      rating: 4.2,
      category: 'adventure',
      highlights: ['Forest Trek', 'Natural Springs', 'Bird Watching', 'Adventure'],
      departure: '7:30 AM',
      inclusions: ['Transport', 'Guide', 'Snacks', 'First Aid']
    },
    {
      id: 6,
      title: 'Indore City Highlights',
      description: 'Best of Indore - historical sites to modern attractions',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&auto=format&fit=crop',
      duration: '8 Hours',
      distance: 'Within Indore',
      price: '₹899',
      originalPrice: '₹1,499',
      rating: 4.6,
      category: 'city',
      highlights: ['Rajwada Palace', 'Lal Bagh', 'Local Markets', 'Food Tour'],
      departure: '9:00 AM',
      inclusions: ['Transport', 'Guide', 'Snacks', 'Entry Fees']
    },
    {
      id: 7,
      title: 'Omkareshwar Pilgrimage',
      description: 'Spiritual journey to Omkareshwar Jyotirlinga',
      image: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4c6?w=800&auto=format&fit=crop',
      duration: '15 Hours',
      distance: '80 km from Indore',
      price: '₹1,699',
      originalPrice: '₹2,799',
      rating: 4.8,
      category: 'spiritual',
      highlights: ['Jyotirlinga', 'Narmada Aarti', 'Ancient Temples', 'Spiritual'],
      departure: '5:00 AM',
      inclusions: ['Transport', 'Guide', 'Meals', 'Special Darshan']
    },
    {
      id: 8,
      title: 'Ujjain Mahakal Darshan',
      description: 'Visit Mahakaleshwar Temple with special darshan arrangements',
      image: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=800&auto=format&fit=crop',
      duration: '12 Hours',
      distance: '55 km from Indore',
      price: '₹1,599',
      originalPrice: '₹2,599',
      rating: 4.9,
      category: 'spiritual',
      highlights: ['Mahakaleshwar', 'Bhasma Aarti', 'Temples', 'Religious'],
      departure: '5:30 AM',
      inclusions: ['Transport', 'Guide', 'Breakfast', 'VIP Darshan']
    },
    {
      id: 9,
      title: 'Patalpani Waterfalls',
      description: 'Majestic waterfalls and surrounding natural beauty',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop',
      duration: '7 Hours',
      distance: '35 km from Indore',
      price: '₹1,099',
      originalPrice: '₹1,799',
      rating: 4.5,
      category: 'nature',
      highlights: ['Waterfall View', 'Nature Walk', 'Photography', 'Monsoon Magic'],
      departure: '8:00 AM',
      inclusions: ['Transport', 'Guide', 'Snacks', 'Safety']
    },
    {
      id: 10,
      title: 'Tincha Falls Adventure',
      description: 'Beautiful waterfalls with adventure activities',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
      duration: '8 Hours',
      distance: '30 km from Indore',
      price: '₹1,249',
      originalPrice: '₹1,999',
      rating: 4.4,
      category: 'adventure',
      highlights: ['Waterfall Trek', 'Adventure Sports', 'Nature', 'Photography'],
      departure: '7:30 AM',
      inclusions: ['Transport', 'Guide', 'Breakfast', 'Safety Gear']
    },
  ]

  const filteredTrips = trips.filter(trip => 
    filter === 'all' || trip.category === filter
  )

  const handleBookNow = (tripTitle, tripDuration, tripPrice) => {
    const phoneNumber = '916266203629'
    const message = `Hi, I'm interested in booking the "${tripTitle}" one-day trip (${tripDuration}, ${tripPrice}). Please provide me with more information about departure timings and inclusions.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappURL, '_blank')
  }

  const handleCustomTrip = () => {
    const phoneNumber = '916266203629'
    const message = "Hi, I'm looking for a custom one-day trip package from Indore. Can you help me plan according to my preferences?"
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappURL, '_blank')
  }

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter)
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 }, px: { xs: 1, sm: 2 } }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#1e3a8a',
            mb: 2,
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }
          }}
        >
          One Day Trips from Indore
        </Typography>
        <Typography 
          variant="h6" 
          color="textSecondary" 
          sx={{ 
            maxWidth: 800, 
            mx: 'auto', 
            mb: 3,
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          Perfect weekend getaways! Explore beautiful destinations around Indore with our curated one-day trip packages
        </Typography>
        
        {/* Filters */}
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          aria-label="trip category"
          sx={{ 
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1,
            mb: 3
          }}
        >
          <ToggleButton 
            value="all" 
            size={isMobile ? 'small' : 'medium'}
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              borderRadius: '20px !important'
            }}
          >
            All Trips
          </ToggleButton>
          <ToggleButton 
            value="spiritual" 
            size={isMobile ? 'small' : 'medium'}
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              borderRadius: '20px !important'
            }}
          >
            Spiritual
          </ToggleButton>
          <ToggleButton 
            value="historical" 
            size={isMobile ? 'small' : 'medium'}
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              borderRadius: '20px !important'
            }}
          >
            Historical
          </ToggleButton>
          <ToggleButton 
            value="nature" 
            size={isMobile ? 'small' : 'medium'}
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              borderRadius: '20px !important'
            }}
          >
            Nature
          </ToggleButton>
          <ToggleButton 
            value="adventure" 
            size={isMobile ? 'small' : 'medium'}
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              borderRadius: '20px !important'
            }}
          >
            Adventure
          </ToggleButton>
          <ToggleButton 
            value="city" 
            size={isMobile ? 'small' : 'medium'}
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              borderRadius: '20px !important'
            }}
          >
            City Tours
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Trip Cards */}
      <Grid container spacing={3}>
        {filteredTrips.map((trip) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={trip.id}>
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
              {/* Discount Badge */}
              <Box sx={{ position: 'relative' }}>
                <Chip
                  label={`${Math.round((1 - parseInt(trip.price.replace('₹', '').replace(',', '')) / parseInt(trip.originalPrice.replace('₹', '').replace(',', ''))) * 100)}% OFF`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    bgcolor: '#ff3d00',
                    color: 'white',
                    fontWeight: 'bold',
                    zIndex: 1,
                    fontSize: { xs: '0.7rem', sm: '0.75rem' }
                  }}
                />
                <CardMedia
                  component="img"
                  height="200"
                  image={trip.image}
                  alt={trip.title}
                  sx={{
                    objectFit: 'cover',
                    aspectRatio: '16/9'
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5 } }}>
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    lineHeight: 1.3,
                    mb: 1
                  }}
                >
                  {trip.title}
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
                  {trip.description}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating 
                    value={trip.rating} 
                    precision={0.5} 
                    size="small" 
                    readOnly 
                  />
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      ml: 1,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
                    ({trip.rating}/5)
                  </Typography>
                </Box>

                {/* Trip Details */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTime 
                      fontSize="small" 
                      sx={{ mr: 1, color: '#666' }} 
                    />
                    <Typography 
                      variant="body2"
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                      <strong>Duration:</strong> {trip.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn 
                      fontSize="small" 
                      sx={{ mr: 1, color: '#666' }} 
                    />
                    <Typography 
                      variant="body2"
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                      <strong>Distance:</strong> {trip.distance}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTime 
                      fontSize="small" 
                      sx={{ mr: 1, color: '#666' }} 
                    />
                    <Typography 
                      variant="body2"
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                      <strong>Departure:</strong> {trip.departure}
                    </Typography>
                  </Box>
                </Box>

                {/* Highlights */}
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    variant="body2" 
                    fontWeight="bold" 
                    sx={{ 
                      mb: 1,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
                    Highlights:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {trip.highlights.slice(0, 3).map((highlight, index) => (
                      <Chip
                        key={index}
                        label={highlight}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          fontSize: '0.7rem',
                          height: 24
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Inclusions */}
                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="body2" 
                    fontWeight="bold" 
                    sx={{ 
                      mb: 1,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
                    Includes:
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }
                    }}
                  >
                    {trip.inclusions.join(' • ')}
                  </Typography>
                </Box>

                {/* Price and Booking */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-end',
                  mt: 'auto'
                }}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      color="#1e3a8a" 
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                    >
                      {trip.price}
                      <Typography 
                        component="span" 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ ml: 0.5, fontSize: '0.75rem' }}
                      >
                        /person
                      </Typography>
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        textDecoration: 'line-through',
                        fontSize: '0.75rem'
                      }}
                    >
                      {trip.originalPrice}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    size={isMobile ? 'small' : 'medium'}
                    onClick={() => handleBookNow(trip.title, trip.duration, trip.price)}
                    sx={{
                      bgcolor: '#25D366',
                      '&:hover': { 
                        bgcolor: '#128C7E'
                      },
                      fontWeight: 'bold',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      px: { xs: 1.5, sm: 2 }
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Features Section */}
      <Box sx={{ mt: 8, textAlign: 'center', px: { xs: 1, sm: 2 } }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4, 
            fontWeight: 'bold', 
            color: '#1e3a8a',
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' }
          }}
        >
          Why Choose Our One Day Trips?
        </Typography>
        <Grid container spacing={3}>
          {[
            { 
              icon: <DirectionsCar fontSize={isMobile ? "medium" : "large"} />, 
              title: 'Comfort Transport', 
              desc: 'AC vehicles with experienced drivers' 
            },
            { 
              icon: <Guide fontSize={isMobile ? "medium" : "large"} />, 
              title: 'Expert Guides', 
              desc: 'Knowledgeable local guides' 
            },
            { 
              icon: <Restaurant fontSize={isMobile ? "medium" : "large"} />, 
              title: 'Meals Included', 
              desc: 'Delicious breakfast/snacks' 
            },
            { 
              icon: <Groups fontSize={isMobile ? "medium" : "large"} />, 
              title: 'Group Discounts', 
              desc: 'Special rates for groups & families' 
            },
            { 
              icon: <AccessTime fontSize={isMobile ? "medium" : "large"} />, 
              title: 'Flexible Timing', 
              desc: 'Customizable departure times' 
            },
            { 
              icon: <LocalOffer fontSize={isMobile ? "medium" : "large"} />, 
              title: 'Best Price', 
              desc: 'Lowest prices with quality service' 
            },
          ].map((feature, index) => (
            <Grid item xs={6} md={4} lg={2} key={index}>
              <Box sx={{ 
                p: 2,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <Box sx={{ 
                  color: '#1e3a8a', 
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: isMobile ? '2rem' : '2.5rem'
                }}>
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 1, 
                    fontWeight: 'bold',
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        mt: 8, 
        p: { xs: 3, md: 4 }, 
        bgcolor: '#f0f9ff', 
        borderRadius: 2,
        textAlign: 'center',
        boxShadow: 2,
        mx: { xs: 1, sm: 0 }
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2, 
            fontWeight: 'bold', 
            color: '#1e3a8a',
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
          }}
        >
          Custom Trip Requirements?
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3, 
            maxWidth: 600, 
            mx: 'auto',
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          We can create personalized one-day trips based on your preferences, group size, and budget
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleCustomTrip}
          sx={{
            bgcolor: '#1e3a8a',
            '&:hover': { 
              bgcolor: '#0f2d6b',
              transform: 'scale(1.05)'
            },
            fontWeight: 'bold',
            px: { xs: 3, md: 4 },
            py: { xs: 1, md: 1.5 },
            transition: 'all 0.3s',
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Request Custom Trip
        </Button>
      </Box>
    </Container>
  )
}

export default OneDayTrips