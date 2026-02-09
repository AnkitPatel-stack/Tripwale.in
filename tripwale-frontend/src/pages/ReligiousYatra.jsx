import React from 'react'
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
} from '@mui/material'
import {
  LocationOn,
  TempleHindu,
  CalendarToday,
  Hotel,
} from '@mui/icons-material'

const ReligiousYatra = () => {
  const yatraTours = [
    {
      id: 1,
      title: 'Char Dham Yatra',
      description: 'Complete pilgrimage to four sacred shrines',
      location: 'Yamunotri, Gangotri, Kedarnath, Badrinath',
      duration: '12 Days',
      price: '₹38,999',
      difficulty: 'Moderate',
      image: 'https://images.unsplash.com/photo-1594736797933-d0a54f6d8a3e',
      bestTime: 'May-Oct'
    },
    {
      id: 2,
      title: 'Kedarnath Yatra',
      description: 'Journey to Lord Shiva\'s abode',
      location: 'Kedarnath, Uttarakhand',
      duration: '5 Days',
      price: '₹18,999',
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1621265113764-2af0479b2d0b',
      bestTime: 'May-Jun, Sep-Oct'
    },
    {
      id: 3,
      title: 'Vaishno Devi Yatra',
      description: 'Pilgrimage to Mata Vaishno Devi shrine',
      location: 'Katra, Jammu',
      duration: '4 Days',
      price: '₹12,999',
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1604404898296-25251c5350b8',
      bestTime: 'Year Round'
    },
    {
      id: 4,
      title: 'Amarnath Yatra',
      description: 'Sacred journey to Amarnath Cave',
      location: 'Pahalgam to Amarnath Cave',
      duration: '7 Days',
      price: '₹24,999',
      difficulty: 'Difficult',
      image: 'https://images.unsplash.com/photo-1618578544948-d1e6e7d8c109',
      bestTime: 'Jul-Aug'
    },
    {
      id: 5,
      title: 'South India Temple Tour',
      description: 'Major temples of South India',
      location: 'Tirupati, Rameswaram, Madurai',
      duration: '10 Days',
      price: '₹28,999',
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1589552950456-75eeaf7c1c8d',
      bestTime: 'Oct-Mar'
    },
    {
      id: 6,
      title: 'Golden Temple & Hemkund',
      description: 'Sikh pilgrimage tour',
      location: 'Amritsar, Hemkund Sahib',
      duration: '6 Days',
      price: '₹16,999',
      difficulty: 'Moderate',
      image: 'https://images.unsplash.com/photo-1603228254119-e6a4d2d2b3e3',
      bestTime: 'May-Oct'
    },
    {
      id: 7,
      title: 'Khatu Shyam JI',
      description: 'Pilgrimage to Khatu Shyam Ji Temple',
      location: 'Khatu, Rajasthan',
      duration: '3 Days',
      price: '₹8,999',
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1589552950456-75eeaf7c1c8d',
      bestTime: 'Year Round'
    },
    {
      id: 8,
      title: 'Mathura-Vrindavan',
      description: 'Sacred journey to Lord Krishna\'s birthplace',
      location: 'Mathura, Vrindavan, Uttar Pradesh',
      duration: '4 Days',
      price: '₹11,999',
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1589552950456-75eeaf7c1c8d',
      bestTime: 'Oct-Mar'
    },
    {
      id: 9,
      title: 'Ayodhya Dham',
      description: 'Pilgrimage to Lord Rama\'s birthplace',
      location: 'Ayodhya, Uttar Pradesh',
      duration: '3 Days',
      price: '₹9,999',
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1589552950456-75eeaf7c1c8d',
      bestTime: 'Oct-Mar'
    },
    {
      id: 10,
      title: 'Purushottam Dham',
      description: 'Pilgrimage to Jagannath Temple',
      location: 'Puri, Odisha',
      duration: '5 Days',
      price: '₹15,999',
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1589552950456-75eeaf7c1c8d',
      bestTime: 'Oct-Mar'
    },
    {
      id: 11,
      title: 'Somnath-Dwarka',
      description: 'Sacred Jyotirlinga pilgrimage',
      location: 'Somnath, Dwarka, Gujarat',
      duration: '6 Days',
      price: '₹21,999',
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1589552950456-75eeaf7c1c8d',
      bestTime: 'Oct-Mar'
    },
    {
      id: 12,
      title: 'Banaaras (Varanasi)',
      description: 'Spiritual journey to the holy city',
      location: 'Varanasi, Uttar Pradesh',
      duration: '4 Days',
      price: '₹14,999',
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1589552950456-75eeaf7c1c8d',
      bestTime: 'Oct-Mar'
    },
  ]

  const handleBookYatra = (tourTitle, tourDuration, tourPrice) => {
    const phoneNumber = '916266203629'
    const message = `Hi, I'm interested in booking the "${tourTitle}" yatra package (${tourDuration}, ${tourPrice}). Please provide me with more information about this religious tour.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappURL, '_blank')
  }

  const handleContactForCustomYatra = () => {
    const phoneNumber = '916266203629'
    const message = "Hi, I'm looking for a custom religious yatra package. Can you help me with more information?"
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappURL, '_blank')
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}>
          Religious Yatra Packages
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Spiritual journeys with all modern amenities
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {yatraTours.map((tour) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={tour.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="180"
                image={tour.image}
                alt={tour.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {tour.title}
                </Typography>
                {tour.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.875rem' }}>
                    {tour.description}
                  </Typography>
                )}
                {tour.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                      {tour.location}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>{tour.duration}</Typography>
                  </Box>
                  {tour.difficulty && (
                    <Chip 
                      label={tour.difficulty} 
                      size="small" 
                      color={
                        tour.difficulty === 'Easy' ? 'success' : 
                        tour.difficulty === 'Moderate' ? 'warning' : 'error'
                      }
                    />
                  )}
                </Box>
                {tour.bestTime && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      <strong>Best Time:</strong> {tour.bestTime}
                    </Typography>
                  </Box>
                )}
                {tour.price && (
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    {tour.price}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="contained"
                  onClick={() => handleBookYatra(tour.title, tour.duration, tour.price || 'Price on request')}
                  size="small"
                >
                  Book Yatra
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, p: 4, bgcolor: '#fff8e1', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Yatra Inclusions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Hotel sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="body2">Accommodation</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <TempleHindu sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="body2">Pooja Arrangements</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 40, color: 'primary.main', mb: 1 }}>🍛</Typography>
              <Typography variant="body2">Satvik Food</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 40, color: 'primary.main', mb: 1 }}>🚌</Typography>
              <Typography variant="body2">Transport</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Looking for a custom religious tour? Contact us for personalized yatra packages
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleContactForCustomYatra}
        >
          Contact for Custom Yatra
        </Button>
      </Box>
    </Container>
  )
}

export default ReligiousYatra