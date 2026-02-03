import React from 'react'
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
} from '@mui/material'
import {
  LocationOn,
  Star,
  People,
  CalendarToday,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const featuredTours = [
    {
      id: 1,
      title: 'Kashmir Paradise Tour',
      location: 'Srinagar, Gulmarg, Pahalgam',
      duration: '7 Days',
      price: '₹25,999',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1593693397695-36243b84f70b',
      category: 'domestic'
    },
    {
      id: 2,
      title: 'Bali Island Adventure',
      location: 'Bali, Indonesia',
      duration: '8 Days',
      price: '₹45,999',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1',
      category: 'international'
    },
    {
      id: 3,
      title: 'Kedarnath Yatra',
      location: 'Uttarakhand',
      duration: '5 Days',
      price: '₹18,999',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1594736797933-d0a54f6d8a3e',
      category: 'religious'
    },
    {
      id: 4,
      title: 'Himalayan Trek',
      location: 'Himachal Pradesh',
      duration: '6 Days',
      price: '₹22,999',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
      category: 'trekking'
    },
  ]

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1488646953014-85cb44e25828)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 10, md: 15 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 700, mb: 3 }}>
            Discover Amazing Tours With TripWale
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Explore Domestic & International Destinations
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/domestic-tours')}
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            Explore Tours
          </Button>
        </Container>
      </Box>

      {/* Featured Tours */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Featured Tours
        </Typography>
        
        <Grid container spacing={4}>
          {featuredTours.map((tour) => (
            <Grid item xs={12} sm={6} md={3} key={tour.id}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Star fontSize="small" sx={{ color: '#ffc107', mr: 0.5 }} />
                      <Typography variant="body2">{tour.rating}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    {tour.price} <Typography component="span" variant="body2">per person</Typography>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    fullWidth 
                    variant="contained"
                    onClick={() => navigate(`/${tour.category}`)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{ mr: 2 }}
          >
            Contact Us
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/international-tours')}
          >
            International Tours
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default Home