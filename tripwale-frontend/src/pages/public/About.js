import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import {
  CheckCircle,
  Groups,
  TravelExplore,
  Star,
  EmojiEvents,
  SupportAgent,
  Security,
  Diversity3,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const About = () => {
  const teamMembers = [
    {
      name: 'Kittuji Patel',
      role: 'Founder & CEO',
      experience: '15+ years in travel industry',
      avatar: 'KP',
    },
    {
      name: 'Travel Experts',
      role: 'Tour Planners',
      experience: '10+ years average experience',
      avatar: 'TE',
    },
    {
      name: 'Customer Support',
      role: '24/7 Support Team',
      experience: 'Quick response time',
      avatar: 'CS',
    },
    {
      name: 'Local Guides',
      role: 'Destination Experts',
      experience: 'Native knowledge',
      avatar: 'LG',
    },
  ];

  const values = [
    {
      title: 'Customer Satisfaction',
      description: 'Our customers happiness is our top priority',
      icon: <Star />,
      color: 'warning',
    },
    {
      title: 'Integrity',
      description: 'Honest and transparent dealings',
      icon: <Security />,
      color: 'success',
    },
    {
      title: 'Expertise',
      description: '15+ years of travel industry experience',
      icon: <EmojiEvents />,
      color: 'primary',
    },
    {
      title: 'Support',
      description: '24/7 customer support',
      icon: <SupportAgent />,
      color: 'info',
    },
  ];

  const services = [
    'Domestic & International Tours',
    'Religious Yatra Packages (Chardham, Khatu Shyam, Ayodhya, Tirupati, Rameshwaram)',
    'Corporate & Student Tours',
    'Weekend Getaways & One-Day Tours',
    'Hotel & Flight Booking',
    'Cab & Train Booking',
    'Visa Assistance',
    'Custom Tour Packages',
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Tripwale.in</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            About Tripwale.in
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            Explore the World with Us
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Your Trusted Travel Partner – Pan India & Abroad
          </Typography>
        </Box>

        {/* Company Story */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              Founded in Indore, Tripwale.in has been revolutionizing the travel industry since its inception. 
              What started as a small travel agency has now grown into a trusted brand serving customers across India and abroad.
            </Typography>
            <Typography variant="body1" paragraph>
              With over 15 years of experience in the travel industry, our team has curated some of the most 
              memorable journeys for thousands of satisfied customers. We believe in creating experiences, 
              not just trips.
            </Typography>
            <Typography variant="body1" paragraph>
              Our mission is simple: to make travel accessible, enjoyable, and memorable for everyone. 
              Whether it's a solo adventure, family vacation, corporate retreat, or spiritual journey, 
              we handle every detail with care and expertise.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: '100%',
                minHeight: 400,
                bgcolor: 'primary.light',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.contrastText',
                p: 4,
              }}
            >
              <TravelExplore sx={{ fontSize: 100, opacity: 0.3 }} />
            </Box>
          </Grid>
        </Grid>

        {/* Our Values */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
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
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: `${value.color}.main`,
                      color: `${value.color}.contrastText`,
                      mb: 2,
                    }}
                  >
                    {value.icon}
                  </Avatar>
                  <Typography variant="h5" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Services */}
        <Paper sx={{ p: 4, mb: 8 }}>
          <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Our Services
          </Typography>
          <Grid container spacing={2}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle color="success" sx={{ mr: 2 }} />
                  <Typography variant="body1">{service}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Team */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontSize: 32,
                      mb: 2,
                    }}
                  >
                    {member.avatar}
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.experience}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 4,
            p: 6,
            mb: 4,
          }}
        >
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} sm={3} textAlign="center">
              <Typography variant="h2" component="div" gutterBottom>
                15+
              </Typography>
              <Typography variant="h6">Years Experience</Typography>
            </Grid>
            <Grid item xs={6} sm={3} textAlign="center">
              <Typography variant="h2" component="div" gutterBottom>
                5000+
              </Typography>
              <Typography variant="h6">Happy Customers</Typography>
            </Grid>
            <Grid item xs={6} sm={3} textAlign="center">
              <Typography variant="h2" component="div" gutterBottom>
                50+
              </Typography>
              <Typography variant="h6">Destinations</Typography>
            </Grid>
            <Grid item xs={6} sm={3} textAlign="center">
              <Typography variant="h2" component="div" gutterBottom>
                24/7
              </Typography>
              <Typography variant="h6">Customer Support</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            Ready to Travel with Us?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Join thousands of satisfied customers who have trusted Tripwale.in for their travel needs
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:6266203629">
              <Typography variant="h6" color="primary">
                📞 Call: 6266203629
              </Typography>
            </a>
            <a href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <Typography variant="h6" color="success.main">
                💬 WhatsApp: 6266203629
              </Typography>
            </a>
            <a href="mailto:info@tripwale.in">
              <Typography variant="h6" color="info.main">
                ✉️ Email: info@tripwale.in
              </Typography>
            </a>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default About;