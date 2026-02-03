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
  Star,
  CalendarToday,
  Hotel,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const DomesticTours = () => {
  const navigate = useNavigate()

  const domesticTours = [
    {
      id: 1,
      title: 'Kashmir Valley Tour',
      description: 'Experience the paradise on earth with houseboat stay',
      location: 'Srinagar, Gulmarg, Pahalgam',
      duration: '7 Days',
      price: '₹25,999',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1593693397695-36243b84f70b',
      bestSeller: true
    },
    {
      id: 2,
      title: 'Leh Ladakh Adventure',
      description: 'Bike trip through majestic mountains and lakes',
      location: 'Leh, Nubra Valley, Pangong',
      duration: '8 Days',
      price: '₹32,999',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1526392587636-9a0e8a0e5c6a',
      bestSeller: true
    },
    {
      id: 3,
      title: 'Kerala Backwaters',
      description: 'Houseboat cruise through serene backwaters',
      location: 'Alleppey, Munnar, Thekkady',
      duration: '6 Days',
      price: '₹21,999',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1528164344705-47542687000d',
      bestSeller: false
    },
    {
      id: 4,
      title: 'Goa Beach Holiday',
      description: 'Sun, sand and sea with vibrant nightlife',
      location: 'North Goa, South Goa',
      duration: '5 Days',
      price: '₹18,999',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
      bestSeller: false
    },
    {
      id: 5,
      title: 'Rajasthan Royal Tour',
      description: 'Explore palaces and forts of royal Rajasthan',
      location: 'Jaipur, Udaipur, Jodhpur',
      duration: '7 Days',
      price: '₹24,999',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3',
      bestSeller: true
    },
    {
      id: 6,
      title: 'Himachal Hill Stations',
      description: 'Hill stations and adventure activities',
      location: 'Shimla, Manali, Dharamshala',
      duration: '8 Days',
      price: '₹22,999',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1564507004663-b6dfb3e2ede5',
      bestSeller: false
    },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}>
          Domestic Tours
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Explore the beauty of India with our curated domestic tours
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {domesticTours.map((tour) => (
          <Grid item xs={12} sm={6} md={4} key={tour.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {tour.bestSeller && (
                <Chip
                  label="Bestseller"
                  color="primary"
                  size="small"
                  sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
                />
              )}
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
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star fontSize="small" sx={{ color: '#ffc107', mr: 0.5 }} />
                    <Typography variant="body2">{tour.rating}</Typography>
                  </Box>
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
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Can't find what you're looking for? Contact us for custom tours
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/contact')}
        >
          Contact for Custom Tour
        </Button>
      </Box>
    </Container>
  )
}

export default DomesticTours