// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Chip,
  Paper,
  Fade,
  Grow,
  Zoom,
  Avatar,
  Rating,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  LocationOn,
  Star,
  CalendarToday,
  ArrowForward,
  East,
  West,
  FlightTakeoff,
  Hotel,
  DirectionsBus,
  Restaurant,
  TempleHindu,
  Hiking,
  BeachAccess,
  Castle,
  Terrain,
  LocalOffer,
  Phone,
  Groups,
  Security,
  FormatQuote,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { keyframes } from '@emotion/react'

// Import EditButton component
import EditButton from '../pages/admin/EditButton'

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

const slideAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const continuousSlide = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`

const Home = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const [currentSlide, setCurrentSlide] = useState(0)
  const reviewsContainerRef = useRef(null)
  const [featuredTours, setFeaturedTours] = useState([])
  const [toursLoading, setToursLoading] = useState(true)

  // ───── Load featured tours from backend API ─────
  useEffect(() => {
    const loadTours = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || '/api'}/tours?active=true&limit=8`
        )
        const data = await res.json()
        if (data.success && data.tours?.length > 0) {
          setFeaturedTours(data.tours)
        }
      } catch { /* stays empty if offline */ }
      finally { setToursLoading(false) }
    }
    loadTours()
  }, [])

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Experience Incredible India',
      subtitle: 'Discover diverse cultures, heritage & landscapes'
    },
    {
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Spiritual Journeys Await',
      subtitle: 'Divine destinations across the country'
    },
    {
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Adventure in Himalayas',
      subtitle: 'Trekking and outdoor adventures'
    },
    {
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Beach & Mountain Escapes',
      subtitle: 'Perfect getaways for every season'
    }
  ]



  const categories = [
    { icon: <FlightTakeoff />, title: 'Flight Tours', desc: 'Air packages' },
    { icon: <Hotel />, title: 'Hotel Stays', desc: 'Luxury & budget' },
    { icon: <DirectionsBus />, title: 'Bus Tours', desc: 'Road trips' },
    { icon: <TempleHindu />, title: 'Religious Tours', desc: 'Pilgrimages' },
    { icon: <Hiking />, title: 'Trekking', desc: 'Adventure trips' },
    { icon: <BeachAccess />, title: 'Beach Tours', desc: 'Coastal getaways' },
    { icon: <Castle />, title: 'Heritage Tours', desc: 'Historical sites' },
    { icon: <Terrain />, title: 'Hill Stations', desc: 'Mountain retreats' },
  ]

  const stats = [
    { value: '500+', label: 'Happy Travelers' },
    { value: '50+', label: 'Destinations' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '100+', label: 'Tours Organized' },
  ]

  const features = [
    { icon: <LocalOffer />, title: 'Best Price', desc: 'Guaranteed lowest prices' },
    { icon: <Security />, title: 'Safe Travel', desc: 'Verified hotels & transport' },
    { icon: <Groups />, title: 'Group Tours', desc: 'Friendly group travels' },
    { icon: <Phone />, title: '24/7 Support', desc: 'Always available for you' },
  ]

  // Customer Reviews Data
  const customerReviews = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      location: 'Mumbai',
      rating: 5,
      date: '2 weeks ago',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      comment: 'The Kashmir tour was absolutely magical! The houseboat stay and shikara ride were unforgettable. TripWale.in made everything seamless.',
      tour: 'Kashmir Paradise Tour'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'Delhi',
      rating: 4.5,
      date: '1 month ago',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      comment: 'Excellent service! Our family had a wonderful time in Kerala. The backwater cruise was the highlight. Highly recommended!',
      tour: 'Kerala Backwaters'
    },
    {
      id: 3,
      name: 'Amit Verma',
      location: 'Bangalore',
      rating: 5,
      date: '3 weeks ago',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      comment: 'Best travel experience ever! Rajasthan tour was perfectly organized. Hotels, food, and sightseeing were all top-notch.',
      tour: 'Rajasthan Heritage Tour'
    },
    {
      id: 4,
      name: 'Sunita Mehta',
      location: 'Chennai',
      rating: 4.8,
      date: '2 months ago',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      comment: 'The Char Dham Yatra was spiritually enriching. Everything was well arranged. Will definitely travel with TripWale again.',
      tour: 'Char Dham Yatra'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      location: 'Pune',
      rating: 4.7,
      date: '1 week ago',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      comment: 'Goa trip was fantastic! Great hotels, amazing beaches, and excellent coordination. Perfect for our group of friends.',
      tour: 'Goa Beach Holiday'
    },
    {
      id: 6,
      name: 'Neha Patel',
      location: 'Ahmedabad',
      rating: 5,
      date: '3 days ago',
      avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
      comment: 'Ladakh road trip was an adventure of a lifetime! Well-planned itinerary and excellent support throughout.',
      tour: 'Ladakh Road Trip'
    },
    {
      id: 7,
      name: 'Sanjay Gupta',
      location: 'Hyderabad',
      rating: 4.9,
      date: '1 month ago',
      avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
      comment: 'South India temple tour was culturally enriching. The guide was knowledgeable and hotels were comfortable.',
      tour: 'South India Temple Tour'
    },
    {
      id: 8,
      name: 'Anjali Desai',
      location: 'Kolkata',
      rating: 4.6,
      date: '2 weeks ago',
      avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
      comment: 'Himalayan trek was challenging but rewarding. Safety was their priority. Great for adventure lovers!',
      tour: 'Himalayan Adventure Trek'
    },
    {
      id: 9,
      name: 'Rahul Nair',
      location: 'Kochi',
      rating: 4.8,
      date: '5 days ago',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      comment: 'Excellent value for money! The entire trip was hassle-free. Special thanks to the customer support team.',
      tour: 'Kashmir Paradise Tour'
    },
    {
      id: 10,
      name: 'Meera Reddy',
      location: 'Jaipur',
      rating: 5,
      date: '3 weeks ago',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      comment: 'Our honeymoon in Kashmir was perfect thanks to TripWale. They customized everything as per our preferences.',
      tour: 'Kashmir Paradise Tour'
    }
  ]

  // Duplicate reviews for seamless infinite scroll
  const allReviews = [...customerReviews, ...customerReviews]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  // Review Card Component
  const ReviewCard = ({ review, index }) => (
    <Card sx={{
      minWidth: 320,
      maxWidth: 380,
      height: '100%',
      mx: 2,
      p: 3,
      borderRadius: 3,
      border: '1px solid rgba(30, 55, 153, 0.1)',
      backgroundColor: '#ffffff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      animation: `${fadeIn} 0.5s ease ${index * 0.1}s both`,
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 15px 40px rgba(30, 55, 153, 0.15)',
        borderColor: 'rgba(255, 107, 107, 0.3)',
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          src={review.avatar}
          alt={review.name}
          sx={{ width: 56, height: 56, mr: 2, border: '3px solid #1e3799' }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e3799' }}>
            {review.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            {review.location} • {review.date}
          </Typography>
        </Box>
        <FormatQuote sx={{ ml: 'auto', color: '#FF6B6B', fontSize: 40, opacity: 0.3 }} />
      </Box>

      <Rating
        value={review.rating}
        precision={0.5}
        readOnly
        sx={{ mb: 2, color: '#FFB300' }}
      />

      <Typography variant="body1" sx={{ 
        mb: 2, 
        color: '#444',
        lineHeight: 1.7,
        fontStyle: 'italic',
        '&:before': {
          content: '"\\201C"',
          fontSize: '2rem',
          color: '#FF6B6B',
          mr: 1
        },
        '&:after': {
          content: '"\\201D"',
          fontSize: '2rem',
          color: '#FF6B6B',
          ml: 1
        }
      }}>
        {review.comment}
      </Typography>

      <Chip
        label={review.tour}
        size="small"
        sx={{
          backgroundColor: 'rgba(30, 55, 153, 0.1)',
          color: '#1e3799',
          fontWeight: 600,
          fontSize: '0.75rem'
        }}
      />
    </Card>
  )

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Edit Button - Sirf admin logged in hone par dikhega */}
      <EditButton page="home" />
      
      {/* Hero Section with Slider */}
      <Box sx={{
        position: 'relative',
        height: { xs: '60vh', sm: '70vh', md: '85vh', lg: '90vh' },
        overflow: 'hidden'
      }}>
        {heroSlides.map((slide, index) => (
          <Fade key={index} in={currentSlide === index} timeout={800}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: { xs: 'scroll', md: 'fixed' },
                display: currentSlide === index ? 'block' : 'none',
                animation: `${fadeIn} 1s ease-out`,
              }}
            >
              <Container sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                px: { xs: 2, sm: 3, md: 4 }
              }}>
                <Box sx={{
                  maxWidth: { xs: '100%', md: 800 },
                  color: 'white',
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
                      fontWeight: 800,
                      mb: { xs: 1, sm: 2 },
                      textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                      lineHeight: { xs: 1.2, sm: 1.3 },
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: { xs: 3, sm: 4 },
                      opacity: 0.9,
                      fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                      maxWidth: 600
                    }}
                  >
                    {slide.subtitle}
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/domestic-tours')}
                      endIcon={<ArrowForward />}
                      sx={{
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1, sm: 1.5 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        backgroundColor: '#FF6B6B',
                        borderRadius: '50px',
                        '&:hover': {
                          backgroundColor: '#FF5252',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 10px 20px rgba(255, 107, 107, 0.3)',
                          transition: 'all 0.3s ease'
                        }
                      }}
                    >
                      Explore All Tours
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/contact')}
                      sx={{
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1, sm: 1.5 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        borderColor: 'white',
                        color: 'white',
                        borderRadius: '50px',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          borderColor: 'white',
                          transform: 'translateY(-3px)',
                          transition: 'all 0.3s ease'
                        }
                      }}
                    >
                      Get Free Quote
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Fade>
        ))}

        {/* Slider Navigation */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: 'absolute',
            left: { xs: 10, sm: 20 },
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            display: { xs: 'none', sm: 'flex' },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.3)',
              transform: 'translateY(-50%) scale(1.1)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          <West />
        </IconButton>
        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            right: { xs: 10, sm: 20 },
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            display: { xs: 'none', sm: 'flex' },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.3)',
              transform: 'translateY(-50%) scale(1.1)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          <East />
        </IconButton>

        {/* Slider Dots */}
        <Box sx={{
          position: 'absolute',
          bottom: { xs: 20, sm: 30 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1
        }}>
          {heroSlides.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: { xs: 8, sm: 12 },
                height: { xs: 8, sm: 12 },
                borderRadius: '50%',
                backgroundColor: currentSlide === index ? '#FF6B6B' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: currentSlide === index ? '#FF6B6B' : 'rgba(255,255,255,0.8)',
                  transform: 'scale(1.2)'
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Stats Section */}
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 6 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Grow in timeout={800 + index * 200}>
                <Box sx={{
                  textAlign: 'center',
                  p: { xs: 2, sm: 3 },
                  backgroundColor: '#f8f9fa',
                  borderRadius: 2,
                  border: '1px solid #e9ecef',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    backgroundColor: 'white',
                    borderColor: '#FF8E53'
                  }
                }}>
                  <Typography variant="h3" sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    color: '#1e3799',
                    fontSize: { xs: '1.8rem', sm: '2.5rem' }
                  }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: '#666',
                    fontWeight: 500,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Features */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: { xs: 3, sm: 4, md: 5 },
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#1e3799'
            }}
          >
            Why Choose TripWale.in?
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in timeout={1000 + index * 200}>
                  <Card sx={{
                    textAlign: 'center',
                    p: { xs: 2, sm: 3 },
                    height: '100%',
                    border: '1px solid #e9ecef',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 30px rgba(255, 142, 83, 0.15)',
                      borderColor: '#FF8E53',
                    }
                  }}>
                    <Box sx={{
                      color: '#FF8E53',
                      fontSize: { xs: '2.5rem', sm: '3rem' },
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      animation: `${floatAnimation} 3s ease-in-out infinite ${index * 0.2}s`
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{
                      mb: 1,
                      fontWeight: 700,
                      color: '#1e3799',
                      fontSize: { xs: '1.1rem', sm: '1.2rem' }
                    }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{
                      color: '#666',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' }
                    }}>
                      {feature.desc}
                    </Typography>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Customer Reviews Section */}
      <Box sx={{ 
        backgroundColor: '#f8f9fa', 
        py: { xs: 6, sm: 8, md: 10 },
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Container>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              fontWeight: 800,
              color: '#1e3799'
            }}
          >
            What Our Travelers Say
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: { xs: 4, sm: 6, md: 8 },
              color: '#666',
              fontSize: { xs: '1rem', sm: '1.2rem' },
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Real stories from our happy customers who traveled with us
          </Typography>

          {/* Infinite Auto-Sliding Reviews */}
          <Box sx={{ 
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 100,
              background: 'linear-gradient(90deg, #f8f9fa 0%, transparent 100%)',
              zIndex: 2
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 100,
              background: 'linear-gradient(270deg, #f8f9fa 0%, transparent 100%)',
              zIndex: 2
            }
          }}>
            <Box
              ref={reviewsContainerRef}
              sx={{
                display: 'flex',
                animation: `${continuousSlide} 60s linear infinite`,
                '&:hover': {
                  animationPlayState: 'paused'
                }
              }}
            >
              {allReviews.map((review, index) => (
                <ReviewCard key={`${review.id}-${index}`} review={review} index={index} />
              ))}
            </Box>
          </Box>

          {/* Review Stats */}
          <Box sx={{ 
            mt: { xs: 6, sm: 8 },
            backgroundColor: 'white',
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            textAlign: 'center',
            border: '1px solid rgba(30, 55, 153, 0.1)'
          }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 800,
                    color: '#1e3799',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    mb: 1
                  }}>
                    4.8/5
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                    Average Rating
                  </Typography>
                  <Rating value={4.8} precision={0.1} readOnly sx={{ mt: 1, color: '#FFB300' }} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 800,
                    color: '#1e3799',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    mb: 1
                  }}>
                    98%
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                    Customer Satisfaction
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                    ★ Would recommend to friends
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 800,
                    color: '#1e3799',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    mb: 1
                  }}>
                    500+
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                    Happy Travelers
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    and counting...
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Categories */}
      <Box sx={{ backgroundColor: '#ffffff', py: { xs: 4, sm: 6, md: 8 } }}>
        <Container>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: { xs: 3, sm: 4, md: 5 },
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#1e3799'
            }}
          >
            Travel By Category
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {categories.map((category, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Grow in timeout={800 + index * 100}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: { xs: 1.5, sm: 2.5 },
                      height: '100%',
                      cursor: 'pointer',
                      border: '1px solid #e9ecef',
                      backgroundColor: 'white',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                        backgroundColor: '#fff9f5',
                        borderColor: '#FF8E53',
                      }
                    }}
                    onClick={() => navigate(`/${category.title.toLowerCase().replace(' ', '-')}`)}
                  >
                    <Box sx={{
                      color: '#1e3799',
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                      mb: { xs: 1, sm: 2 },
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                      {category.icon}
                    </Box>
                    <Typography variant="h6" sx={{
                      mb: 0.5,
                      fontWeight: 700,
                      color: '#1e3799',
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}>
                      {category.title}
                    </Typography>
                    <Typography variant="caption" sx={{
                      color: '#666',
                      fontSize: { xs: '0.8rem', sm: '0.85rem' }
                    }}>
                      {category.desc}
                    </Typography>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Tours */}
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: { xs: 3, sm: 4, md: 5 },
          gap: { xs: 2, sm: 0 }
        }}>
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                fontWeight: 700,
                color: '#1e3799',
                mb: 1
              }}
            >
              Popular Tour Packages
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#666',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 400
              }}
            >
              Handpicked experiences for unforgettable journeys
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => navigate('/domestic-tours')}
            endIcon={<ArrowForward />}
            sx={{
              borderColor: '#1e3799',
              color: '#1e3799',
              fontWeight: 600,
              borderRadius: '50px',
              px: { xs: 3, sm: 4 },
              '&:hover': {
                borderColor: '#0c2461',
                backgroundColor: 'rgba(30, 55, 153, 0.04)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            View All Tours
          </Button>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {featuredTours.map((tour, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tour.id}>
              <Zoom in timeout={1000 + index * 150}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid #e9ecef',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    '& .tour-image': {
                      transform: 'scale(1.1)',
                    }
                  }
                }}>
                  {/* Tag */}
                  {tour.tag && (
                    <Chip
                      label={tour.tag}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: '#FF6B6B',
                        color: 'white',
                        fontWeight: 600,
                        zIndex: 1,
                        fontSize: { xs: '0.7rem', sm: '0.75rem' }
                      }}
                    />
                  )}

                  <Box sx={{ overflow: 'hidden' }}>
                    <CardMedia
                      className="tour-image"
                      component="img"
                      height="180"
                      image={tour.image}
                      alt={tour.title}
                      sx={{
                        transition: 'transform 0.5s ease',
                        width: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5 } }}>
                    <Typography gutterBottom variant="h6" component="h2" sx={{
                      fontWeight: 700,
                      color: '#1e3799',
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      mb: 1,
                      lineHeight: 1.3
                    }}>
                      {tour.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn fontSize="small" sx={{ mr: 1, color: '#666', flexShrink: 0 }} />
                      <Typography variant="body2" color="text.secondary" sx={{
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                        lineHeight: 1.4
                      }}>
                        {tour.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarToday fontSize="small" sx={{ mr: 1, color: '#666' }} />
                        <Typography variant="body2" sx={{
                          fontWeight: 500,
                          fontSize: { xs: '0.8rem', sm: '0.85rem' }
                        }}>
                          {tour.duration}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star fontSize="small" sx={{ color: '#FFB300', mr: 0.5 }} />
                        <Typography variant="body2" sx={{
                          fontWeight: 600,
                          fontSize: { xs: '0.8rem', sm: '0.85rem' }
                        }}>
                          {tour.rating}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mt: 2,
                      pt: 2,
                      borderTop: '1px dashed #e0e0e0'
                    }}>
                      <Typography variant="h6" sx={{
                        color: '#FF6B6B',
                        fontWeight: 700,
                        fontSize: { xs: '1rem', sm: '1.1rem' }
                      }}>
                        {tour.price}
                      </Typography>
                      <Typography variant="caption" sx={{
                        color: '#666',
                        fontSize: { xs: '0.75rem', sm: '0.8rem' }
                      }}>
                        per person
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: { xs: 2, sm: 2.5 }, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => navigate(`/tour/${tour._id || tour.id}`)}
                      size="small"
                      sx={{
                        backgroundColor: '#1e3799',
                        borderRadius: '50px',
                        py: 1,
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                        '&:hover': {
                          backgroundColor: '#0c2461',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 20px rgba(30, 55, 153, 0.3)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Special Offers Banner */}
      <Container sx={{ pb: { xs: 4, sm: 6, md: 8 } }}>
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #FF8E53 0%, #FF6B6B 100%)',
            color: 'white',
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 2,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Typography variant="h3" sx={{
            mb: 2,
            fontWeight: 800,
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
          }}>
            🎉 Special Summer Offers
          </Typography>
          <Typography variant="h6" sx={{
            mb: 3,
            opacity: 0.9,
            fontSize: { xs: '1rem', sm: '1.2rem' },
            maxWidth: 600,
            mx: 'auto'
          }}>
            Get up to 30% off on selected tour packages. Limited period offer!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/offers')}
            sx={{
              px: { xs: 4, sm: 5 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              backgroundColor: 'white',
              color: '#FF6B6B',
              borderRadius: '50px',
              fontWeight: 700,
              '&:hover': {
                backgroundColor: '#f5f5f5',
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            Check Offers
          </Button>
        </Paper>
      </Container>

      {/* Final CTA */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1e3799 0%, #0c2461 100%)',
        color: 'white',
        py: { xs: 6, sm: 8, md: 10 }
      }}>
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{
            mb: 3,
            fontWeight: 800,
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
          }}>
            Ready for Your Next Adventure?
          </Typography>
          <Typography variant="h6" sx={{
            mb: { xs: 4, sm: 5 },
            opacity: 0.9,
            fontSize: { xs: '1rem', sm: '1.2rem' },
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6
          }}>
            Contact our travel experts to plan your perfect holiday package with customized itineraries.
          </Typography>
          <Box sx={{
            display: 'flex',
            gap: { xs: 2, sm: 3 },
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/contact')}
              startIcon={<Phone />}
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                backgroundColor: '#FF6B6B',
                borderRadius: '50px',
                '&:hover': {
                  backgroundColor: '#FF5252',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 10px 25px rgba(255, 107, 107, 0.3)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              Call Now: 6266203629
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/domestic-tours')}
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                borderColor: 'white',
                color: 'white',
                borderRadius: '50px',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-3px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              Browse All Packages
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home