import React from 'react'
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  CheckCircle,
  LocationOn,
  Phone,
  Email,
  Groups,
  Security,
  ThumbUp,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const AboutUs = () => {
  const navigate = useNavigate()

  const teamMembers = [
    {
      name: 'Rahul Sharma',
      role: 'Founder & CEO',
      experience: '15+ years in travel',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    },
    {
      name: 'Priya Patel',
      role: 'Tour Operations Head',
      experience: '12+ years experience',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b786d4a4'
    },
    {
      name: 'Amit Verma',
      role: 'International Tours Head',
      experience: '10+ years experience',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
  ]

  const stats = [
    { value: '5000+', label: 'Happy Customers' },
    { value: '250+', label: 'Tours Conducted' },
    { value: '50+', label: 'Destinations' },
    { value: '98%', label: 'Satisfaction Rate' },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 3 }}>
          About TripWale.in
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Your trusted travel partner for domestic and international tours since 2010
        </Typography>
      </Box>

      {/* Our Story */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
          Our Story
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Founded in 2010 in Indore, TripWale.in started with a simple mission: to make travel accessible, 
              enjoyable, and memorable for everyone. What began as a small travel agency has now grown into 
              one of Central India's leading tour operators.
            </Typography>
            <Typography variant="body1" paragraph>
              With our headquarters in Indore, MP, we operate PAN India and have successfully organized tours 
              to international destinations. Our team of experienced travel experts works tirelessly to 
              curate perfect travel experiences.
            </Typography>
            <Typography variant="body1" paragraph>
              We believe that travel is not just about visiting places, but about creating lifelong memories. 
              This philosophy drives everything we do at TripWale.in.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828"
              alt="Our Team"
              sx={{
                width: '100%',
                borderRadius: 4,
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Stats */}
      <Box sx={{ mb: 8 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography variant="h6">{stat.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
          Why Choose TripWale.in?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Experienced Guides" 
                  secondary="Local experts with deep knowledge of destinations"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Customized Itineraries" 
                  secondary="Tailor-made tours to match your preferences"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Best Price Guarantee" 
                  secondary="We offer the best prices for all our packages"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="24/7 Support" 
                  secondary="Round-the-clock customer support during tours"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Visa Assistance" 
                  secondary="Complete visa processing support"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Safe & Secure" 
                  secondary="Verified accommodations and transport"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>

      {/* Team Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Avatar
                  src={member.avatar}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {member.name}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
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

      {/* Contact CTA */}
      <Box sx={{ textAlign: 'center', p: 6, bgcolor: '#f5f5f5', borderRadius: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Ready to Plan Your Next Adventure?
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/contact')}
          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          Contact Us Now
        </Button>
      </Box>
    </Container>
  )
}

export default AboutUs