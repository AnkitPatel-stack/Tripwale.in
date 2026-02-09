import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  Paper,
  Chip,
  Rating,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  LocationOn,
  Star,
  CalendarToday,
  Hotel,
  Restaurant,
  DirectionsBus,
  FlightTakeoff,
  Groups,
  AccessTime,
  ArrowBack,
  WhatsApp,
  Phone,
  LocalOffer,
  CheckCircle,
  Warning,
  Info,
  Map,
  Photo,
  Description,
  Reviews,
  Share,
  Bookmark,
} from '@mui/icons-material'
import { keyframes } from '@emotion/react'

// This would typically come from an API
const allTours = [
  {
    id: 1,
    title: 'Kashmir Paradise Tour',
    description: 'Experience the heaven on earth with our comprehensive Kashmir tour package. From the beautiful Dal Lake to the snow-capped mountains of Gulmarg, this tour offers everything.',
    location: 'Srinagar, Gulmarg, Pahalgam',
    duration: '6 Nights / 7 Days',
    rating: 4.8,
    price: '₹25,999',
    originalPrice: '₹32,999',
    discount: '21% OFF',
    image: 'https://images.unsplash.com/photo-1593693397695-36243b84f70b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'hill-station',
    tag: 'Most Popular',
    highlights: [
      'Stay in houseboat on Dal Lake',
      'Gondola ride in Gulmarg',
      'Shikara ride experience',
      'Visit to Betaab Valley',
      'Mughal Gardens tour'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar', description: 'Airport pickup and transfer to houseboat. Evening Shikara ride on Dal Lake.' },
      { day: 2, title: 'Srinagar Local Sightseeing', description: 'Visit Mughal Gardens, Hazratbal Shrine, and local markets.' },
      { day: 3, title: 'Srinagar to Gulmarg', description: 'Drive to Gulmarg. Gondola ride and snow activities.' },
      { day: 4, title: 'Gulmarg to Pahalgam', description: 'Visit Betaab Valley, Aru Valley, and Lidder River.' },
      { day: 5, title: 'Pahalgam Exploration', description: 'Full day exploring Pahalgam valleys and waterfalls.' },
      { day: 6, title: 'Return to Srinagar', description: 'Return drive with shopping stops.' },
      { day: 7, title: 'Departure', description: 'Airport drop and departure.' }
    ],
    inclusions: [
      'Accommodation in 3-star hotels',
      'Daily breakfast and dinner',
      'AC vehicle for all transfers',
      'All sightseeing as per itinerary',
      'Gondola ride ticket',
      'Shikara ride experience',
      'Driver allowance and toll taxes',
      'All applicable taxes'
    ],
    exclusions: [
      'Air/train tickets',
      'Lunch during the tour',
      'Personal expenses',
      'Travel insurance',
      'Anything not mentioned in inclusions'
    ],
    bestTime: 'April to October',
    groupSize: '2-15 people',
    difficulty: 'Easy',
    reviews: [
      { name: 'Rajesh Kumar', rating: 5, comment: 'Amazing experience! The houseboat stay was unforgettable.' },
      { name: 'Priya Sharma', rating: 4.5, comment: 'Beautiful locations and well-organized tour.' },
      { name: 'Amit Verma', rating: 5, comment: 'Best family vacation we ever had. Highly recommended!' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1593693397695-36243b84f70b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552465011-b4e30bf7349d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593693399746-4c0514be15c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 2,
    title: 'Kerala Backwaters',
    description: 'Experience the serene backwaters of Kerala with houseboat stay, tea gardens, and cultural shows.',
    location: 'Alleppey, Munnar, Thekkady',
    duration: '5 Nights / 6 Days',
    rating: 4.7,
    price: '₹21,499',
    originalPrice: '₹28,499',
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'backwater',
    tag: 'Best Seller',
    highlights: [
      'Houseboat stay in Alleppey',
      'Tea plantation tour in Munnar',
      'Kathakali dance performance',
      'Spice plantation visit',
      'Boat safari in Periyar'
    ],
    itinerary: [
      { day: 1, title: 'Cochin Arrival', description: 'Airport pickup and city tour.' },
      { day: 2, title: 'Cochin to Munnar', description: 'Drive to Munnar, visit tea gardens.' },
      { day: 3, title: 'Munnar Sightseeing', description: 'Visit Echo Point, Mattupetty Dam.' },
      { day: 4, title: 'Munnar to Thekkady', description: 'Drive to Thekkady, spice plantation visit.' },
      { day: 5, title: 'Thekkady to Alleppey', description: 'Drive to Alleppey, evening houseboat check-in.' },
      { day: 6, title: 'Alleppey to Cochin', description: 'Morning backwater cruise, departure.' }
    ],
    inclusions: [
      '5 nights accommodation',
      'Daily breakfast',
      'Alleppey houseboat stay with meals',
      'All transfers in AC vehicle',
      'Sightseeing as per itinerary',
      'Driver allowance'
    ],
    exclusions: [
      'Flight tickets',
      'Lunch & dinner (except houseboat)',
      'Personal expenses',
      'Entry fees to monuments',
      'Guide charges'
    ],
    bestTime: 'September to March',
    groupSize: '2-12 people',
    difficulty: 'Easy',
    reviews: [
      { name: 'Sunita Mehta', rating: 5, comment: 'The houseboat experience was magical!' },
      { name: 'Vikram Singh', rating: 4, comment: 'Beautiful Kerala, well organized tour.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  // Add more tours here matching your Home.jsx featuredTours...
];

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const TourDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  
  const [selectedTour, setSelectedTour] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [openBookingDialog, setOpenBookingDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    // Find the tour by ID
    const tour = allTours.find(t => t.id === parseInt(id))
    if (tour) {
      setSelectedTour(tour)
    } else {
      // Redirect to tours page if tour not found
      navigate('/domestic-tours')
    }
  }, [id, navigate])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleBookNow = () => {
    const phoneNumber = '916266203629'
    const message = `Hi, I'm interested in booking the "${selectedTour.title}" tour package (${selectedTour.duration}, ${selectedTour.price}). Please provide me with more details and booking process.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappURL, '_blank')
  }

  const handleCallNow = () => {
    window.open('tel:+916266203629', '_blank')
  }

  const handleShare = async () => {
    const shareData = {
      title: selectedTour.title,
      text: `Check out this amazing tour: ${selectedTour.title}`,
      url: window.location.href,
    }
    
    try {
      await navigator.share(shareData)
    } catch (err) {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (!selectedTour) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4">Loading tour details...</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 }, animation: `${fadeIn} 0.5s ease` }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, color: '#1e3a8a' }}
      >
        Back to Tours
      </Button>

      {/* Main Tour Details */}
      <Grid container spacing={{ xs: 3, md: 4 }}>
        {/* Left Column - Images & Basic Info */}
        <Grid item xs={12} lg={8}>
          {/* Tour Title and Basic Info */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800,
                  color: '#1e3a8a',
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                  mb: 1
                }}>
                  {selectedTour.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1, color: '#666' }} />
                    <Typography variant="h6" sx={{ color: '#666', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                      {selectedTour.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ mr: 1, color: '#666' }} />
                    <Typography variant="h6" sx={{ color: '#666', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                      {selectedTour.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star sx={{ mr: 1, color: '#FFB300' }} />
                    <Typography variant="h6" sx={{ color: '#666', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                      {selectedTour.rating} ({selectedTour.reviews?.length || 0} reviews)
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={handleShare} sx={{ color: '#1e3a8a' }}>
                  <Share />
                </IconButton>
                <IconButton sx={{ color: '#1e3a8a' }}>
                  <Bookmark />
                </IconButton>
              </Box>
            </Box>

            {/* Tag */}
            {selectedTour.tag && (
              <Chip
                label={selectedTour.tag}
                color="primary"
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  mb: 3
                }}
              />
            )}
          </Box>

          {/* Main Image */}
          <Card sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height="400"
              image={selectedTour.gallery?.[selectedImage] || selectedTour.image}
              alt={selectedTour.title}
              sx={{ 
                width: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            />
          </Card>

          {/* Gallery Thumbnails */}
          {selectedTour.gallery && selectedTour.gallery.length > 1 && (
            <Box sx={{ mb: 4, display: 'flex', gap: 2, overflowX: 'auto', py: 1 }}>
              {selectedTour.gallery.map((img, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  sx={{
                    flexShrink: 0,
                    width: 100,
                    height: 80,
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedImage === index ? '3px solid #1e3a8a' : '2px solid #e0e0e0',
                    opacity: selectedImage === index ? 1 : 0.7,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <img
                    src={img}
                    alt={`${selectedTour.title} - ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Box>
          )}

          {/* Tabs Section */}
          <Paper sx={{ mb: 4, borderRadius: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab icon={<Description />} label="Description" />
              <Tab icon={<Map />} label="Itinerary" />
              <Tab icon={<CheckCircle />} label="Inclusions" />
              <Tab icon={<Warning />} label="Exclusions" />
              <Tab icon={<Reviews />} label="Reviews" />
              <Tab icon={<Info />} label="Info" />
            </Tabs>

            <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
              {tabValue === 0 && (
                <Box>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#1e3a8a' }}>
                    About this tour
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                    {selectedTour.description}
                  </Typography>
                  
                  {selectedTour.highlights && (
                    <>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        Tour Highlights
                      </Typography>
                      <Grid container spacing={2}>
                        {selectedTour.highlights.map((highlight, index) => (
                          <Grid item xs={12} sm={6} key={index}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                              <CheckCircle sx={{ color: '#4CAF50', mr: 1, mt: 0.5, fontSize: '1.2rem' }} />
                              <Typography variant="body1">{highlight}</Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1e3a8a' }}>
                    Detailed Itinerary
                  </Typography>
                  {selectedTour.itinerary?.map((day, index) => (
                    <Box key={index} sx={{ mb: 3, pb: 3, borderBottom: index < selectedTour.itinerary.length - 1 ? '1px dashed #e0e0e0' : 'none' }}>
                      <Typography variant="h6" sx={{ color: '#1e3a8a', fontWeight: 600, mb: 1 }}>
                        Day {day.day}: {day.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7 }}>
                        {day.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {tabValue === 2 && (
                <Box>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1e3a8a' }}>
                    What's Included
                  </Typography>
                  <List>
                    {selectedTour.inclusions?.map((item, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <CheckCircle sx={{ color: '#4CAF50' }} />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {tabValue === 3 && (
                <Box>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1e3a8a' }}>
                    What's Not Included
                  </Typography>
                  <List>
                    {selectedTour.exclusions?.map((item, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Warning sx={{ color: '#f44336' }} />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {tabValue === 4 && (
                <Box>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1e3a8a' }}>
                    Customer Reviews
                  </Typography>
                  {selectedTour.reviews?.length > 0 ? (
                    selectedTour.reviews.map((review, index) => (
                      <Box key={index} sx={{ mb: 3, p: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {review.name}
                          </Typography>
                          <Rating value={review.rating} precision={0.5} readOnly />
                        </Box>
                        <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7 }}>
                          "{review.comment}"
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body1" sx={{ color: '#666' }}>
                      No reviews yet. Be the first to review!
                    </Typography>
                  )}
                </Box>
              )}

              {tabValue === 5 && (
                <Box>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1e3a8a' }}>
                    Additional Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#666', mb: 1 }}>
                          Best Time to Visit
                        </Typography>
                        <Typography variant="body1">{selectedTour.bestTime || 'Year Round'}</Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#666', mb: 1 }}>
                          Group Size
                        </Typography>
                        <Typography variant="body1">{selectedTour.groupSize || '2-12 people'}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#666', mb: 1 }}>
                          Difficulty Level
                        </Typography>
                        <Typography variant="body1">{selectedTour.difficulty || 'Easy'}</Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#666', mb: 1 }}>
                          Cancellation Policy
                        </Typography>
                        <Typography variant="body1">Free cancellation up to 7 days before travel</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Booking Card */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ 
            position: { lg: 'sticky' }, 
            top: 20, 
            p: { xs: 3, sm: 4 }, 
            borderRadius: 2,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            backgroundColor: '#f8fafc'
          }}>
            {/* Price Section */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              {selectedTour.discount && (
                <Chip
                  label={selectedTour.discount}
                  color="error"
                  sx={{ 
                    mb: 2, 
                    fontWeight: 700,
                    fontSize: '1rem'
                  }}
                />
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 1 }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800,
                  color: '#1e3a8a',
                  fontSize: { xs: '2rem', sm: '2.5rem' }
                }}>
                  {selectedTour.price}
                </Typography>
                {selectedTour.originalPrice && (
                  <Typography variant="h6" sx={{ 
                    color: '#666',
                    textDecoration: 'line-through',
                    fontSize: { xs: '1.2rem', sm: '1.5rem' }
                  }}>
                    {selectedTour.originalPrice}
                  </Typography>
                )}
              </Box>
              
              <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                per person • {selectedTour.duration}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Quick Facts */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1e3a8a' }}>
                Quick Facts
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'white', borderRadius: 1 }}>
                    <Groups sx={{ color: '#1e3a8a', fontSize: '2rem', mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Group Size</Typography>
                    <Typography variant="body1">{selectedTour.groupSize || '2-12'}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'white', borderRadius: 1 }}>
                    <AccessTime sx={{ color: '#1e3a8a', fontSize: '2rem', mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Duration</Typography>
                    <Typography variant="body1">{selectedTour.duration.split('/')[0].trim()}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'white', borderRadius: 1 }}>
                    <Hotel sx={{ color: '#1e3a8a', fontSize: '2rem', mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Accommodation</Typography>
                    <Typography variant="body1">3-Star Hotels</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'white', borderRadius: 1 }}>
                    <Restaurant sx={{ color: '#1e3a8a', fontSize: '2rem', mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Meals</Typography>
                    <Typography variant="body1">Breakfast Included</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<WhatsApp />}
                onClick={handleBookNow}
                sx={{
                  py: 1.5,
                  backgroundColor: '#25D366',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: '#128C7E',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Book on WhatsApp
              </Button>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<Phone />}
                onClick={handleCallNow}
                sx={{
                  py: 1.5,
                  borderColor: '#1e3a8a',
                  color: '#1e3a8a',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: '#0c2461',
                    backgroundColor: 'rgba(30, 55, 153, 0.04)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Call Now
              </Button>

              <Button
                fullWidth
                variant="text"
                size="medium"
                onClick={() => setOpenBookingDialog(true)}
                sx={{
                  color: '#666',
                  fontWeight: 600,
                  '&:hover': {
                    color: '#1e3a8a',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Need Customization? Click here
              </Button>
            </Box>

            {/* Additional Info */}
            <Box sx={{ mt: 4, p: 2, backgroundColor: 'white', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: '#666', textAlign: 'center' }}>
                🔒 Secure booking • 🤝 Trusted by 500+ travelers
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Related Tours */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#1e3a8a', textAlign: 'center' }}>
          You May Also Like
        </Typography>
        <Grid container spacing={3}>
          {allTours
            .filter(tour => tour.id !== selectedTour.id)
            .slice(0, 4)
            .map(tour => (
              <Grid item xs={12} sm={6} md={3} key={tour.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }
                  }}
                  onClick={() => navigate(`/tour/${tour.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={tour.image}
                    alt={tour.title}
                  />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>
                      {tour.title}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {tour.duration}
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#1e3a8a', fontWeight: 700 }}>
                        {tour.price}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* Customization Dialog */}
      <Dialog open={openBookingDialog} onClose={() => setOpenBookingDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Customize Your Tour</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Let us know your requirements and we'll create a customized itinerary just for you:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Groups />
              </ListItemIcon>
              <ListItemText primary="Group size and composition" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CalendarToday />
              </ListItemIcon>
              <ListItemText primary="Preferred travel dates" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Hotel />
              </ListItemIcon>
              <ListItemText primary="Accommodation preferences" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Restaurant />
              </ListItemIcon>
              <ListItemText primary="Dietary requirements" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenBookingDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenBookingDialog(false)
              handleBookNow()
            }}
            sx={{ backgroundColor: '#1e3a8a' }}
          >
            Discuss Customization
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default TourDetails