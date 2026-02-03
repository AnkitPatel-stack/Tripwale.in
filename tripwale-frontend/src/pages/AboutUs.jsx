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
  Paper,
  Fade,
  Grow,
  Zoom,
  Slide,
} from '@mui/material'
import {
  CheckCircle,
  LocationOn,
  Phone,
  Email,
  Groups,
  Security,
  ThumbUp,
  Flight,
  Hotel,
  Landscape,
  Favorite,
  Public,
  EmojiEvents,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { keyframes } from '@emotion/react'

// Animation keyframes
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

const shimmerAnimation = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`

const AboutUs = () => {
  const navigate = useNavigate()

  const teamMembers = [
    {
      name: 'Atul Mandloi',
      role: 'Founder & CEO',
      experience: 'Travel Enthusiast & Explorer',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
      quote: 'Every journey should tell a story'
    },
    {
      name: 'Travel Experts Team',
      role: 'Trip Coordinators',
      experience: 'Local Experience Specialists',
      avatar: 'https://images.unsplash.com/photo-1551836026-d5c2c5af78e4',
      quote: 'We create experiences, not just trips'
    },
    {
      name: 'Customer Support',
      role: 'Support Team',
      experience: '24/7 Assistance',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54',
      quote: 'Your happiness is our priority'
    },
  ]

  const stats = [
    { value: '500+', label: 'Happy Travelers', icon: '❤️', color: '#FF6B6B' },
    { value: '50+', label: 'Destinations', icon: '📍', color: '#4ECDC4' },
    { value: '98%', label: 'Satisfaction Rate', icon: '⭐', color: '#FFD166' },
    { value: '100+', label: 'Trips Organized', icon: '🧳', color: '#06D6A0' },
  ]

  const services = [
    { icon: '🧳', title: 'Group Tours', desc: 'Weekend trips & group adventures' },
    { icon: '🏔️', title: 'Hill Stations', desc: 'Nature getaways & mountain retreats' },
    { icon: '🏕️', title: 'Camping', desc: 'Adventure trips & outdoor stays' },
    { icon: '❤️', title: 'Couple Trips', desc: 'Romantic & anniversary getaways' },
    { icon: '🎉', title: 'Corporate Tours', desc: 'Team building & company trips' },
    { icon: '🚌', title: 'Custom Tours', desc: 'Personalized travel experiences' },
  ]

  const features = [
    'Affordable & transparent pricing',
    'Well-planned itineraries',
    'Friendly trip coordinators',
    'Comfortable travel & verified stays',
    'Personalized customer support',
    'Trusted by happy travelers',
  ]

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #fff8f0 0%, #f0f9ff 50%, #e6f7ff 100%)',
      minHeight: '100vh',
      py: 2,
    }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero Section with Animation */}
        <Box sx={{ textAlign: 'center', mb: 8, position: 'relative' }}>
          {/* Floating Elements */}
          <Box sx={{
            position: 'absolute',
            width: 100,
            height: 100,
            background: 'radial-gradient(circle, #FFA72622 0%, transparent 70%)',
            borderRadius: '50%',
            top: -50,
            left: '10%',
            animation: `${floatAnimation} 6s ease-in-out infinite`,
          }} />
          <Box sx={{
            position: 'absolute',
            width: 80,
            height: 80,
            background: 'radial-gradient(circle, #29B6F622 0%, transparent 70%)',
            borderRadius: '50%',
            bottom: -30,
            right: '15%',
            animation: `${floatAnimation} 8s ease-in-out infinite 1s`,
          }} />
          
          <Fade in timeout={1000}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '4rem' }, 
                mb: 3,
                fontWeight: 800,
                background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `${pulseAnimation} 2s ease-in-out infinite`,
              }}
            >
              About TripWale.in
            </Typography>
          </Fade>
          
          <Slide direction="up" in timeout={1200}>
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
              ✨ Travel should be easy, affordable, and full of unforgettable experiences
            </Typography>
          </Slide>
          
          {/* Animated Travel Icons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 4 }}>
            {['✈️', '🏕️', '🧳', '❤️', '🏔️'].map((icon, index) => (
              <Grow in timeout={1500} key={index}>
                <Box sx={{
                  fontSize: '2rem',
                  animation: `${floatAnimation} 3s ease-in-out infinite ${index * 0.2}s`,
                }}>
                  {icon}
                </Box>
              </Grow>
            ))}
          </Box>
        </Box>

        {/* Our Mission & Vision Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Zoom in timeout={1000}>
              <Card sx={{ 
                p: 4, 
                height: '100%',
                background: 'linear-gradient(135deg, #FFA726 0%, #FF8E53 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease-in-out',
                }
              }}>
                <Box sx={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  background: 'radial-gradient(circle, #ffffff22 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                  🎯 Our Mission
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  To make travel simple, memorable, and accessible for everyone while promoting 
                  responsible tourism and meaningful connections with destinations.
                </Typography>
              </Card>
            </Zoom>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Zoom in timeout={1200}>
              <Card sx={{ 
                p: 4, 
                height: '100%',
                background: 'linear-gradient(135deg, #29B6F6 0%, #4ECDC4 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease-in-out',
                }
              }}>
                <Box sx={{
                  position: 'absolute',
                  bottom: -50,
                  left: -50,
                  width: 150,
                  height: 150,
                  background: 'radial-gradient(circle, #ffffff22 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                  👁️ Our Vision
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  To become India's most trusted travel brand, known for quality service, 
                  honest pricing, and unforgettable journeys that create lifelong memories.
                </Typography>
              </Card>
            </Zoom>
          </Grid>
        </Grid>

        {/* Our Story */}
        <Box sx={{ mb: 8 }}>
          <Fade in timeout={1000}>
            <Typography variant="h3" sx={{ 
              mb: 6, 
              textAlign: 'center',
              fontWeight: 700,
              color: '#FF8E53',
              position: 'relative',
              display: 'inline-block',
              left: '50%',
              transform: 'translateX(-50%)',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: 0,
                width: '100%',
                height: 4,
                background: 'linear-gradient(90deg, #FF8E53, #FF6B6B)',
                borderRadius: 2,
              }
            }}>
              Our Story
            </Typography>
          </Fade>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Slide direction="right" in timeout={1000}>
                <Box sx={{ position: 'relative' }}>
                  <Box sx={{
                    width: 20,
                    height: 20,
                    background: '#FF8E53',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: -10,
                    left: -10,
                    animation: `${pulseAnimation} 2s ease-in-out infinite`,
                  }} />
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                    <strong>@Tripwale.in</strong> was founded by <strong>Atul Mandloi</strong>, a passionate travel enthusiast 
                    who believes that every journey should tell a story. What began as a passion for exploring 
                    hidden destinations has now grown into a trusted travel brand.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                    We started with one simple belief — travel should be easy, affordable, and full of 
                    unforgettable experiences. Today, we serve hundreds of happy travelers across India.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                    We understand what travelers truly need — <strong>clear pricing, genuine experiences, 
                    reliable service, and memories that last forever.</strong>
                  </Typography>
                </Box>
              </Slide>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in timeout={1200}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828"
                  alt="Our Journey"
                  sx={{
                    width: '100%',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(255, 142, 83, 0.3)',
                    transform: 'rotate(2deg)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(0deg) scale(1.02)',
                    }
                  }}
                />
              </Zoom>
            </Grid>
          </Grid>
        </Box>

        {/* What We Do - Services */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ 
            mb: 6, 
            textAlign: 'center',
            fontWeight: 700,
            color: '#29B6F6',
          }}>
            🧭 What We Do
          </Typography>
          
          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Grow in timeout={800 + index * 200}>
                  <Card sx={{ 
                    p: 3, 
                    height: '100%',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fdff 100%)',
                    border: '2px solid #e3f2fd',
                    '&:hover': {
                      borderColor: '#29B6F6',
                      transform: 'translateY(-5px)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 10px 30px rgba(41, 182, 246, 0.2)',
                    }
                  }}>
                    <Box sx={{ 
                      fontSize: '3rem',
                      mb: 2,
                      animation: `${floatAnimation} 4s ease-in-out infinite ${index * 0.2}s`,
                    }}>
                      {service.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#1565C0' }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.desc}
                    </Typography>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Slide direction="up" in timeout={800 + index * 200}>
                  <Card sx={{ 
                    textAlign: 'center', 
                    p: 3,
                    background: 'linear-gradient(135deg, #ffffff 0%, #fff8f0 100%)',
                    border: `2px solid ${stat.color}22`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: -100,
                      width: 100,
                      height: '100%',
                      background: `linear-gradient(90deg, transparent, ${stat.color}22, transparent)`,
                      animation: `${shimmerAnimation} 3s infinite`,
                    }
                  }}>
                    <Box sx={{ 
                      fontSize: '2.5rem',
                      mb: 1,
                      color: stat.color,
                    }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h2" sx={{ 
                      fontWeight: 'bold',
                      mb: 1,
                      background: `linear-gradient(45deg, ${stat.color}, ${stat.color}CC)`,
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#666' }}>
                      {stat.label}
                    </Typography>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Choose Us */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ 
            mb: 6, 
            textAlign: 'center',
            fontWeight: 700,
            color: '#06D6A0',
          }}>
            ⭐ Why Choose TripWale?
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Fade in timeout={800 + index * 200}>
                  <Paper sx={{ 
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    background: 'linear-gradient(90deg, #ffffff 0%, #f0fff4 100%)',
                    borderLeft: `4px solid #06D6A0`,
                    '&:hover': {
                      transform: 'translateX(10px)',
                      transition: 'transform 0.3s ease',
                    }
                  }}>
                    <CheckCircle sx={{ color: '#06D6A0', fontSize: 28 }} />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {feature}
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#FF6B6B' }}>
              ✨ We don't just plan trips — we create experiences
            </Typography>
          </Box>
        </Box>

        {/* Team Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ 
            mb: 6, 
            textAlign: 'center',
            fontWeight: 700,
            color: '#FFD166',
          }}>
            👥 Meet Our Team
          </Typography>
          
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Grow in timeout={1000 + index * 300}>
                  <Card sx={{ 
                    textAlign: 'center', 
                    p: 4,
                    background: 'linear-gradient(135deg, #fffef0 0%, #fff8e1 100%)',
                    border: '2px solid #FFD166',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover .avatar': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.5s ease',
                    }
                  }}>
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: 'linear-gradient(90deg, #FFD166, #FFB74D)',
                    }} />
                    
                    <Avatar
                      className="avatar"
                      src={member.avatar}
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        mx: 'auto', 
                        mb: 3,
                        border: '4px solid #FFD166',
                        boxShadow: '0 10px 20px rgba(255, 209, 102, 0.3)',
                      }}
                    />
                    
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, color: '#F57C00' }}>
                      {member.name}
                    </Typography>
                    
                    <Typography variant="h6" sx={{ 
                      mb: 2, 
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #FFB74D, #FF8F00)',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {member.role}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {member.experience}
                    </Typography>
                    
                    <Box sx={{ 
                      p: 2,
                      mt: 2,
                      background: '#FFF3E0',
                      borderRadius: 2,
                      borderLeft: '3px solid #FFB74D',
                    }}>
                      <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#E65100' }}>
                        "{member.quote}"
                      </Typography>
                    </Box>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Final CTA */}
        <Box sx={{ 
          textAlign: 'center', 
          p: 6, 
          background: 'linear-gradient(135deg, #FF8E53 0%, #FF6B6B 100%)',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)',
        }}>
          {/* Animated background elements */}
          <Box sx={{
            position: 'absolute',
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, #ffffff22 0%, transparent 70%)',
            borderRadius: '50%',
            top: -100,
            right: -100,
            animation: `${floatAnimation} 8s ease-in-out infinite`,
          }} />
          
          <Typography variant="h3" sx={{ 
            mb: 3, 
            color: 'white',
            fontWeight: 800,
            position: 'relative',
            zIndex: 1,
          }}>
            ✨ Let TripWale Be Your Travel Partner
          </Typography>
          
          <Typography variant="h6" sx={{ 
            mb: 4, 
            color: 'rgba(255,255,255,0.9)',
            maxWidth: 600,
            mx: 'auto',
            position: 'relative',
            zIndex: 1,
          }}>
            Because every journey deserves to be special, memorable, and truly unforgettable.
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{ 
              px: 6, 
              py: 1.5, 
              fontSize: '1.1rem',
              fontWeight: 700,
              background: 'white',
              color: '#FF6B6B',
              borderRadius: 50,
              '&:hover': {
                background: '#f5f5f5',
                transform: 'scale(1.05)',
                transition: 'all 0.3s ease',
              }
            }}
          >
            Start Your Journey Now
          </Button>
          
          {/* Floating travel icons */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 4 }}>
            {['✈️', '🏕️', '🧳', '❤️', '📍', '🏔️'].map((icon, index) => (
              <Box 
                key={index}
                sx={{
                  fontSize: '2rem',
                  animation: `${floatAnimation} 3s ease-in-out infinite ${index * 0.2}s`,
                  opacity: 0.8,
                }}
              >
                {icon}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutUs