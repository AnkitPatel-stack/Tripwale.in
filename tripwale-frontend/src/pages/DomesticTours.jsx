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
  CalendarToday,
  Star,
} from '@mui/icons-material'

const DomesticTours = () => {
  const domesticTours = [
    {
      id: 1,
      title: 'Panchamari',
      duration: '8 Days',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1564507004663-b6dfb3e2ede5',
      // Bestseller: false
    },
    {
      id: 2,
      title: 'Udaipur - Mount abbu',
      duration: '7 Days',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1593693397695-36243b84f70b',
      // Bestseller: true
    },
    {
      id: 3,
      title: 'Jodhpur - Jaisalmer',
      duration: '8 Days',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1526392587636-9a0e8a0e5c6a',
      // Bestseller: true
    },
    {
      id: 4,
      title: 'Manali Kasol',
      duration: '6 Days',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1528164344705-47542687000d',
      // Bestseller: false
    },
    {
      id: 5,
      title: 'Goa Beach Holiday',
      duration: '5 Days',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
      // Bestseller: false
    },
    {
      id: 6,
      title: 'Rajasthan Retreat',
      duration: '7 Days',
      price: '₹24,999',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3',
      // Bestseller: true
    },
    {
      id: 7,
      title: 'Himachal Hill Stations',
      duration: '8 Days',
      price: '₹22,999',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1564507004663-b6dfb3e2ede5',
      // Bestseller: false
    },
    {
      id: 8,
      title: 'Kashmir',
      duration: '8 Days',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1564507004663-b6dfb3e2ede5',
      // Bestseller: false
    },
    {
      id: 9,
      title: 'Leh-Ladakh',
      duration: '8 Days',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1564507004663-b6dfb3e2ede5',
      // Bestseller: false
    },
  ]

  const handleBookNow = (tourTitle) => {
    const phoneNumber = '916266203629'
    const message = `Hi, I'm interested in booking the "${tourTitle}" tour. Please provide me with more information.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappURL, '_blank')
  }

  const handleContactForCustomTour = () => {
    const phoneNumber = '916266203629'
    const message = "Hi, I'm looking for a custom tour package. Can you help me with more information?"
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappURL, '_blank')
  }

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
              {tour.Bestseller && (
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
                {tour.price && (
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                    {tour.price}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="contained"
                  onClick={() => handleBookNow(tour.title)}
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
          onClick={handleContactForCustomTour}
        >
          Contact for Custom Tour
        </Button>
      </Box>
    </Container>
  )
}

export default DomesticTours