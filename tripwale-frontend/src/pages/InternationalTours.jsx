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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  LocationOn,
  Star,
  CalendarToday,
  Flight,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const InternationalTours = () => {
  const navigate = useNavigate()

  const internationalTours = [
    {
      id: 1,
      title: 'Bali Romantic Getaway',
      description: 'Beaches, temples and cultural experiences',
      location: 'Bali, Indonesia',
      duration: '8 Days',
      price: '₹45,999',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1',
      category: 'beach',
      flightIncluded: true
    },
    {
      id: 2,
      title: 'European Highlights',
      description: 'Multiple countries in one amazing tour',
      location: 'France, Switzerland, Italy',
      duration: '12 Days',
      price: '₹1,25,999',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
      category: 'europe',
      flightIncluded: true
    },
    {
      id: 3,
      title: 'Thailand Beach Holiday',
      description: 'Islands, night markets and Thai massage',
      location: 'Phuket, Bangkok, Pattaya',
      duration: '7 Days',
      price: '₹38,999',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526',
      category: 'beach',
      flightIncluded: true
    },
    {
      id: 4,
      title: 'Dubai Luxury Tour',
      description: 'Desert safari, Burj Khalifa and shopping',
      location: 'Dubai, Abu Dhabi',
      duration: '6 Days',
      price: '₹52,999',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      category: 'luxury',
      flightIncluded: true
    },
    {
      id: 5,
      title: 'Singapore-Malaysia',
      description: 'City lights and cultural diversity',
      location: 'Singapore, Kuala Lumpur',
      duration: '7 Days',
      price: '₹49,999',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048',
      category: 'city',
      flightIncluded: true
    },
    {
      id: 6,
      title: 'Japan Cherry Blossom',
      description: 'Cherry blossoms and traditional culture',
      location: 'Tokyo, Kyoto, Osaka',
      duration: '10 Days',
      price: '₹89,999',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      category: 'cultural',
      flightIncluded: true
    },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}>
          International Tours
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Explore the world with our international tour packages
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Destination</InputLabel>
          <Select label="Destination" defaultValue="">
            <MenuItem value="">All Destinations</MenuItem>
            <MenuItem value="asia">Asia</MenuItem>
            <MenuItem value="europe">Europe</MenuItem>
            <MenuItem value="middle-east">Middle East</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Duration</InputLabel>
          <Select label="Duration" defaultValue="">
            <MenuItem value="">Any Duration</MenuItem>
            <MenuItem value="short">3-7 Days</MenuItem>
            <MenuItem value="medium">8-12 Days</MenuItem>
            <MenuItem value="long">13+ Days</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        {internationalTours.map((tour) => (
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
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star fontSize="small" sx={{ color: '#ffc107', mr: 0.5 }} />
                    <Typography variant="body2">{tour.rating}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {tour.flightIncluded && (
                    <>
                      <Flight fontSize="small" sx={{ mr: 0.5, color: 'primary.main' }} />
                      <Typography variant="body2" color="primary">
                        Flight Included
                      </Typography>
                    </>
                  )}
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

      <Box sx={{ textAlign: 'center', mt: 6, p: 4, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Need Visa Assistance?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          We provide complete visa processing support for all destinations
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/contact')}
        >
          Contact for Visa Assistance
        </Button>
      </Box>
    </Container>
  )
}

export default InternationalTours