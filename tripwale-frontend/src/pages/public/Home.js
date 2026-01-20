import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CardActions,
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  People,
  Flight,
  Hotel,
  DirectionsCar,
  Restaurant,
  Star,
  ArrowForward,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';

const Home = () => {
  const [featuredTrips, setFeaturedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedTrips();
  }, []);

  const fetchFeaturedTrips = async () => {
    try {
      const response = await api.get('/trips?featured=true');
      setFeaturedTrips(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const services = [
    {
      title: 'Domestic Tours',
      description: 'Explore beautiful destinations across India',
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      color: 'primary',
    },
    {
      title: 'International Tours',
      description: 'Discover amazing destinations around the world',
      icon: <Flight sx={{ fontSize: 40 }} />,
      color: 'secondary',
    },
    {
      title: 'Religious Yatra',
      description: 'Spiritual journeys to sacred places',
      icon: <DirectionsCar sx={{ fontSize: 40 }} />,
      color: 'success',
    },
    {
      title: 'Corporate Trips',
      description: 'Team building and corporate retreats',
      icon: <People sx={{ fontSize: 40 }} />,
      color: 'warning',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Experienced Guides',
      description: 'Professional guides with years of experience',
      icon: '👨‍✈️',
    },
    {
      title: 'Best Prices',
      description: 'Competitive prices with no hidden charges',
      icon: '💰',
    },
    {
      title: '24/7 Support',
      description: 'Round the clock customer support',
      icon: '📞',
    },
    {
      title: 'Custom Packages',
      description: 'Tailored packages as per your requirements',
      icon: '🎯',
    },
  ];

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={fetchFeaturedTrips} />;

  return (
    <>
      <Helmet>
        <title>Tripwale.in | Explore the World with Us</title>
        <meta
          name="description"
          content="Your Trusted Travel Partner – Pan India & Abroad. Book domestic & international tours, religious yatra, corporate trips, flight bookings, hotel bookings and more."
        />
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 15,
          textAlign: 'center',
          mb: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h1" gutterBottom>
            Explore the World with Us
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Your Trusted Travel Partner – Pan India & Abroad
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
            Discover amazing destinations, create unforgettable memories with our expert travel planning.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/trips"
            >
              Browse Trips
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
              size="large"
              component={Link}
              to="/contact"
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Why Choose Us */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Why Choose Tripwale.in?
          </Typography>
          <Grid container spacing={4}>
            {whyChooseUs.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Typography variant="h1" sx={{ fontSize: 60, mb: 2 }}>
                    {item.icon}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Trips */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Featured Trips
          </Typography>
          {featuredTrips.length === 0 ? (
            <Typography align="center" color="text.secondary">
              No featured trips available at the moment.
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {featuredTrips.slice(0, 4).map((trip) => (
                <Grid item xs={12} sm={6} md={3} key={trip._id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    {trip.images && trip.images.length > 0 ? (
                      <CardMedia
                        component="img"
                        height="200"
                        image={trip.images[0].url || '/trip-placeholder.jpg'}
                        alt={trip.title}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 200,
                          bgcolor: 'grey.200',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography color="text.secondary">No Image</Typography>
                      </Box>
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {trip.title}
                        </Typography>
                        {trip.isFeatured && (
                          <Chip label="Featured" color="secondary" size="small" />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {trip.shortDescription}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">
                            {trip.duration?.days} Days
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">
                            {trip.destinations?.length} Places
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="h6" color="primary">
                        ₹{trip.price?.perPerson?.toLocaleString()}
                        <Typography component="span" variant="body2" color="text.secondary">
                          /person
                        </Typography>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        component={Link}
                        to={`/trips/${trip._id}`}
                        endIcon={<ArrowForward />}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          {featuredTrips.length > 0 && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                component={Link}
                to="/trips"
                size="large"
              >
                View All Trips
              </Button>
            </Box>
          )}
        </Box>

        {/* Services */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Our Services
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      bgcolor: `${service.color}.light`,
                      color: `${service.color}.main`,
                      mb: 2,
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {service.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/trips?type=${service.title.toLowerCase().split(' ')[0]}`}
                    variant="outlined"
                    color={service.color}
                    sx={{ mt: 'auto' }}
                  >
                    Explore
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 4,
            p: 6,
            textAlign: 'center',
            mb: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Ready for Your Next Adventure?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Book your dream vacation with Tripwale.in and create memories that last a lifetime.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/trips"
            >
              Browse All Trips
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
              size="large"
              component={Link}
              to="/contact"
            >
              Get Free Consultation
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;