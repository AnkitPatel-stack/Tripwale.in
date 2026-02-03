import React, { useState, useEffect } from 'react'
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
  alpha,
  useTheme,
  Fade,
  Grow,
  Zoom,
} from '@mui/material'
import {
  LocationOn,
  Star,
  CalendarToday,
  ArrowForward,
  East,
  West,
  Flight,
  Hotel,
  Restaurant,
  DirectionsBus,
  TempleHindu,
  Terrain,
  BeachAccess,
  Castle,
  Forest,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { keyframes } from '@emotion/react'

// Animation keyframes
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

const Home = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
      title: 'Explore Incredible India',
      subtitle: 'Discover the rich culture and heritage'
    },
    {
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      title: 'Spiritual Journeys',
      subtitle: 'Experience divine destinations across India'
    },
    {
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b',
      title: 'Adventure Awaits',
      subtitle: 'Trekking and outdoor adventures'
    },
    {
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      title: 'Beach Getaways',
      subtitle: 'Relax at serene coastal destinations'
    }
  ]

  const featuredTours = [
    {
      id: 1,
      title: 'Kashmir Paradise',
      location: 'Srinagar, Gulmarg, Pahalgam',
      duration: '6 Nights / 7 Days',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1593693397695-36243b84f70b',
      category: 'domestic',
      icon: <Terrain />,
      tag: 'Most Popular'
    },
    {
      id: 2,
      title: 'Kerala Backwaters',
      location: 'Alleppey, Munnar, Kochi',
      duration: '5 Nights / 6 Days',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1528164344705-47542687000d',
      category: 'domestic',
      icon: <BeachAccess />,
      tag: 'Best Seller'
    },
    {
      id: 3,
      title: 'Rajasthan Royal',
      location: 'Jaipur, Udaipur, Jodhpur',
      duration: '7 Nights / 8 Days',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3',
      category: 'domestic',
      icon: <Castle />,
      tag: 'Cultural'
    },
    {
      id: 4,
      title: 'Himalayan Trek',
      location: 'Manali, Kasol, Kheerganga',
      duration: '5 Nights / 6 Days',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
      category: 'trekking',
      icon: <Terrain />,
      tag: 'Adventure'
    },
    {
      id: 5,
      title: 'Char Dham Yatra',
      location: 'Kedarnath, Badrinath, Gangotri',
      duration: '10 Nights / 11 Days',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1621265113764-2af0479b2d0b',
      category: 'religious',
      icon: <TempleHindu />,
      tag: 'Spiritual'
    },
    {
      id: 6,
      title: 'Goa Beaches',
      location: 'North Goa, South Goa',
      duration: '4 Nights / 5 Days',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
      category: 'domestic',
      icon: <BeachAccess />,
      tag: 'Relaxing'
    }
  ]

  const categories = [
    { icon: <Flight />, title: 'Flight Packages', count: '50+ Tours' },
    { icon: <Hotel />, title: 'Hotel Stays', count: '200+ Hotels' },
    { icon: <DirectionsBus />, title: 'Bus Tours', count: '30+ Routes' },
    { icon: <Restaurant />, title: 'Food Tours', count: 'Local Cuisine' },
    { icon: <TempleHindu />, title: 'Religious', count: '15+ Yatras' },
    { icon: <Terrain />, title: 'Trekking', count: '20+ Treks' },
  ]

  const affiliations = [
    { name: 'MakeMyTrip', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Make-My-Trip-Logo.png' },
    { name: 'IRCTC', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/IRCTC_Logo.svg/1200px-IRCTC_Logo.svg.png' },
    { name: 'Yatra', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Yatra.com_logo.svg/2560px-Yatra.com_logo.svg.png' },
    { name: 'EaseMyTrip', logo: 'https://www.easemytrip.com/logo.png' },
    { name: 'Goibibo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Goibibo_logo.svg/2560px-Goibibo_logo.svg.png' },
  ]

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

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section with Slider */}
      <Box sx={{ position: 'relative', height: { xs: '70vh', md: '90vh' }, overflow: 'hidden' }}>
        {heroSlides.map((slide, index) => (
          <Fade key={index} in={currentSlide === index} timeout={1000}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: currentSlide === index ? 'block' : 'none',
                animation: `${fadeIn} 1s ease-out`,
              }}
            >
              <Container sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ maxWidth: 800, color: 'white' }}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: { xs: '2.5rem', md: '4rem' }, 
                      fontWeight: 800,
                      mb: 2,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      lineHeight: 1.2
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 4, 
                      opacity: 0.9,
                      fontSize: { xs: '1.2rem', md: '1.5rem' }
                    }}
                  >
                    {slide.subtitle}
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/domestic-tours')}
                    endIcon={<ArrowForward />}
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      fontSize: '1.1rem',
                      backgroundColor: '#FF6B6B',
                      '&:hover': {
                        backgroundColor: '#FF5252',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    Explore Tours
                  </Button>
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
            left: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
          }}
        >
          <West />
        </IconButton>
        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
          }}
        >
          <East />
        </IconButton>

        {/* Slider Dots */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: 30, 
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
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: currentSlide === index ? '#FF6B6B' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: currentSlide === index ? '#FF6B6B' : 'rgba(255,255,255,0.8)',
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Mini Offers Slider */}
      <Container sx={{ py: 4 }}>
        <Box sx={{ 
          backgroundColor: '#FFF3E0',
          borderRadius: 2,
          p: 3,
          mb: 6,
          border: '2px dashed #FFB74D'
        }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#E65100', fontWeight: 600 }}>
            🎯 Current Offers
          </Typography>
          <Box sx={{ 
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            '&:before, &:after': {
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: 50,
              zIndex: 1,
              background: 'linear-gradient(90deg, #FFF3E0, transparent)'
            },
            '&:after': {
              right: 0,
              background: 'linear-gradient(270deg, #FFF3E0, transparent)'
            }
          }}>
            <Box sx={{ 
              display: 'flex',
              animation: `${slideAnimation} 20s linear infinite`,
              '&:hover': {
                animationPlayState: 'paused'
              }
            }}>
              {[
                '🏔️ Himalayan Treks Starting Soon',
                '🕌 Special Group Discounts for Religious Tours',
                '🏖️ Early Bird Offers for Beach Destinations',
                '🎫 Flexible Booking Options Available',
                '👨‍👩‍👧‍👦 Family Package Discounts',
                '📅 Last Minute Booking Offers'
              ].map((offer, index) => (
                <Chip
                  key={index}
                  label={offer}
                  sx={{
                    mx: 1,
                    backgroundColor: '#FFE0B2',
                    color: '#BF360C',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    height: 40,
                    animation: `${floatAnimation} 3s ease-in-out infinite ${index * 0.5}s`
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Categories */}
      <Container sx={{ py: 8 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 6, 
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            color: '#1A237E'
          }}
        >
          Explore by Category
        </Typography>
        
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Grow in timeout={800 + index * 100}>
                <Card 
                  sx={{ 
                    textAlign: 'center',
                    p: 2,
                    height: '100%',
                    cursor: 'pointer',
                    border: '1px solid #E3F2FD',
                    backgroundColor: '#F5F5F5',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                      backgroundColor: '#E3F2FD',
                      borderColor: '#90CAF9'
                    }
                  }}
                  onClick={() => navigate(`/${category.title.toLowerCase().replace(' ', '-')}`)}
                >
                  <Box sx={{ 
                    color: '#1A237E',
                    fontSize: '2.5rem',
                    mb: 1,
                    animation: `${floatAnimation} 3s ease-in-out infinite ${index * 0.2}s`
                  }}>
                    {category.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, color: '#0D47A1' }}>
                    {category.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#546E7A' }}>
                    {category.count}
                  </Typography>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Tours */}
      <Box sx={{ backgroundColor: '#F5F5F5', py: 8 }}>
        <Container maxWidth="xl">
          <Typography 
            variant="h2" 
            sx={{ 
              textAlign: 'center', 
              mb: 6, 
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#1A237E'
            }}
          >
            Popular Destinations
          </Typography>
          
          <Grid container spacing={3}>
            {featuredTours.map((tour, index) => (
              <Grid item xs={12} sm={6} md={4} key={tour.id}>
                <Zoom in timeout={1000 + index * 200}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid #E0E0E0',
                    backgroundColor: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                      '& .tour-image': {
                        transform: 'scale(1.05)',
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
                          zIndex: 1
                        }}
                      />
                    )}

                    <CardMedia
                      className="tour-image"
                      component="img"
                      height="200"
                      image={tour.image}
                      alt={tour.title}
                      sx={{ transition: 'transform 0.5s ease' }}
                    />
                    
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ 
                          color: '#1A237E',
                          mr: 2,
                          animation: `${floatAnimation} 3s ease-in-out infinite ${index * 0.2}s`
                        }}>
                          {tour.icon}
                        </Box>
                        <Typography gutterBottom variant="h5" component="h2" sx={{ 
                          fontWeight: 700,
                          color: '#1A237E',
                          fontSize: '1.3rem'
                        }}>
                          {tour.title}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <LocationOn fontSize="small" sx={{ mr: 1, color: '#546E7A' }} />
                        <Typography variant="body2" color="text.secondary">
                          {tour.location}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarToday fontSize="small" sx={{ mr: 1, color: '#546E7A' }} />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {tour.duration}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Star fontSize="small" sx={{ color: '#FFB300', mr: 0.5 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {tour.rating}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ p: 3, pt: 0 }}>
                      <Button 
                        fullWidth 
                        variant="contained"
                        onClick={() => navigate(`/${tour.category}`)}
                        sx={{ 
                          backgroundColor: '#1A237E',
                          '&:hover': {
                            backgroundColor: '#283593',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 5px 15px rgba(26, 35, 126, 0.3)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        View Package Details
                      </Button>
                    </CardActions>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>

          {/* View All Button */}
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/domestic-tours')}
              endIcon={<ArrowForward />}
              sx={{ 
                px: 6,
                borderColor: '#1A237E',
                color: '#1A237E',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#283593',
                  backgroundColor: 'rgba(26, 35, 126, 0.04)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              View All Destinations
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Trusted Affiliations */}
      <Container sx={{ py: 8 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 6, 
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            color: '#1A237E'
          }}
        >
          Trusted Affiliations
        </Typography>
        
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {affiliations.map((partner, index) => (
            <Grid item xs={6} sm={4} md={2.4} key={index}>
              <Fade in timeout={1000 + index * 200}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    border: '1px solid #E0E0E0',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                      borderColor: '#90CAF9'
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={partner.logo}
                    alt={partner.name}
                    sx={{ 
                      maxWidth: '100%',
                      maxHeight: 60,
                      filter: 'grayscale(100%)',
                      transition: 'filter 0.3s ease',
                      '&:hover': {
                        filter: 'grayscale(0%)'
                      }
                    }}
                  />
                </Paper>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Final CTA */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1A237E 0%, #283593 100%)',
        color: 'white',
        py: 8
      }}>
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
            Ready to Explore Incredible India?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
            Let us help you plan your perfect journey across India's diverse landscapes and cultures.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/contact')}
              sx={{ 
                px: 4,
                backgroundColor: '#FF6B6B',
                '&:hover': {
                  backgroundColor: '#FF5252',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              Get Free Consultation
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/domestic-tours')}
              sx={{ 
                px: 4,
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              Browse All Tours
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home