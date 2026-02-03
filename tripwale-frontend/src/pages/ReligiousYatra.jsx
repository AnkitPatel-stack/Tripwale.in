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
import { useNavigate } from 'react-router-dom'

const ReligiousYatra = () => {
  const navigate = useNavigate()

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
  ]

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
          <Grid item xs={12} sm={6} md={4} key={tour.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={tour.image}
                alt={tour.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {tour.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {tour.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {tour.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2">{tour.duration}</Typography>
                  </Box>
                  <Chip 
                    label={tour.difficulty} 
                    size="small" 
                    color={
                      tour.difficulty === 'Easy' ? 'success' : 
                      tour.difficulty === 'Moderate' ? 'warning' : 'error'
                    }
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Best Time:</strong> {tour.bestTime}
                  </Typography>
                </Box>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                  {tour.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="contained"
                  onClick={() => navigate(`/tour/${tour.id}`)}
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
              <Typography>Accommodation</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <TempleHindu sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography>Pooja Arrangements</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 40, color: 'primary.main', mb: 1 }}>🍛</Typography>
              <Typography>Satvik Food</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 40, color: 'primary.main', mb: 1 }}>🚌</Typography>
              <Typography>Transport</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default ReligiousYatra