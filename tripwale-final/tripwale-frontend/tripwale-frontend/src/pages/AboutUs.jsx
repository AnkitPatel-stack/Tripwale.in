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
import OurStoryImage from './OurStory.png';

// Local images import करें
import AtulImage from './Atul.jpeg'
import JatinImage from './jatinmondloi.jpeg'
import HarshvardhanImage from './HarshvardhanPatel.jpeg'

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
      name: 'Mr. Atul Mandloi',
      role: 'Founder & CEO',
      experience: 'Travel Enthusiast & Explorer 12 years of Travel Experience',
      avatar: AtulImage,
      quote: 'Every journey should tell a story'
    },
    {
      name: 'Mr. Jatin Mandloi',
      role: 'Co Founder',
      experience: 'Local Experience Specialists',
      avatar: JatinImage,
      quote: 'We create experiences, not just trips'
    },
    {
      name: 'Mr. Harshvardhan Patel',
      role: 'Travel & Marketing Head',
      experience: '24/7 Assistance',
      avatar: HarshvardhanImage,
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
      py: { xs: 1, sm: 2 },
      overflowX: 'hidden',
    }}>
      <Container maxWidth="xl" sx={{ 
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        {/* Hero Section with Animation */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: { xs: 4, sm: 6, md: 8 }, 
          position: 'relative',
          px: { xs: 1, sm: 2 }
        }}>
          {/* Floating Elements - Hide on small screens */}
          <Box sx={{
            position: 'absolute',
            width: { xs: 60, sm: 80, md: 100 },
            height: { xs: 60, sm: 80, md: 100 },
            background: 'radial-gradient(circle, #FFA72622 0%, transparent 70%)',
            borderRadius: '50%',
            top: { xs: -30, md: -50 },
            left: { xs: '5%', sm: '10%' },
            animation: `${floatAnimation} 6s ease-in-out infinite`,
            display: { xs: 'none', sm: 'block' }
          }} />
          <Box sx={{
            position: 'absolute',
            width: { xs: 50, sm: 60, md: 80 },
            height: { xs: 50, sm: 60, md: 80 },
            background: 'radial-gradient(circle, #29B6F622 0%, transparent 70%)',
            borderRadius: '50%',
            bottom: { xs: -20, md: -30 },
            right: { xs: '5%', sm: '15%' },
            animation: `${floatAnimation} 8s ease-in-out infinite 1s`,
            display: { xs: 'none', sm: 'block' }
          }} />

          <Fade in timeout={1000}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem', lg: '4rem' },
                mb: { xs: 2, sm: 3 },
                fontWeight: 800,
                background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `${pulseAnimation} 2s ease-in-out infinite`,
                lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
                px: { xs: 1, sm: 2 }
              }}
            >
              About TripWale.in
            </Typography>
          </Fade>

          <Slide direction="up" in timeout={1200}>
            <Typography variant="h5" color="text.secondary" sx={{ 
              maxWidth: 800, 
              mx: 'auto', 
              mb: { xs: 3, sm: 4 },
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              px: { xs: 2, sm: 3 },
              lineHeight: { xs: 1.4, sm: 1.5 }
            }}>
              ✨ Travel should be easy, affordable, and full of unforgettable experiences
            </Typography>
          </Slide>

          {/* Animated Travel Icons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: { xs: 1, sm: 2, md: 3 }, 
            mb: { xs: 3, sm: 4 },
            flexWrap: 'wrap'
          }}>
            {['✈️', '🏕️', '🧳', '❤️', '🏔️'].map((icon, index) => (
              <Grow in timeout={1500} key={index}>
                <Box sx={{
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                  animation: `${floatAnimation} 3s ease-in-out infinite ${index * 0.2}s`,
                }}>
                  {icon}
                </Box>
              </Grow>
            ))}
          </Box>
        </Box>

        {/* Our Mission & Vision Cards */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
          <Grid item xs={12} md={6}>
            <Zoom in timeout={1000}>
              <Card sx={{
                p: { xs: 2, sm: 3, md: 4 },
                height: '100%',
                background: 'linear-gradient(135deg, #FFA726 0%, #FF8E53 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: { xs: 'none', sm: 'translateY(-5px)' },
                  transition: 'transform 0.3s ease-in-out',
                }
              }}>
                <Box sx={{
                  position: 'absolute',
                  top: { xs: -30, md: -50 },
                  right: { xs: -30, md: -50 },
                  width: { xs: 100, md: 150 },
                  height: { xs: 100, md: 150 },
                  background: 'radial-gradient(circle, #ffffff22 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />
                <Typography variant="h4" sx={{ 
                  mb: { xs: 2, sm: 3 }, 
                  fontWeight: 700,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                }}>
                  🎯 Our Mission
                </Typography>
                <Typography variant="body1" sx={{ 
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, 
                  lineHeight: { xs: 1.5, sm: 1.6, md: 1.8 }
                }}>
                  To make travel simple, memorable, and accessible for everyone while promoting
                  responsible tourism and meaningful connections with destinations.
                </Typography>
              </Card>
            </Zoom>
          </Grid>

          <Grid item xs={12} md={6}>
            <Zoom in timeout={1200}>
              <Card sx={{
                p: { xs: 2, sm: 3, md: 4 },
                height: '100%',
                background: 'linear-gradient(135deg, #29B6F6 0%, #4ECDC4 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: { xs: 'none', sm: 'translateY(-5px)' },
                  transition: 'transform 0.3s ease-in-out',
                }
              }}>
                <Box sx={{
                  position: 'absolute',
                  bottom: { xs: -30, md: -50 },
                  left: { xs: -30, md: -50 },
                  width: { xs: 100, md: 150 },
                  height: { xs: 100, md: 150 },
                  background: 'radial-gradient(circle, #ffffff22 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />
                <Typography variant="h4" sx={{ 
                  mb: { xs: 2, sm: 3 }, 
                  fontWeight: 700,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                }}>
                  👁️ Our Vision
                </Typography>
                <Typography variant="body1" sx={{ 
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, 
                  lineHeight: { xs: 1.5, sm: 1.6, md: 1.8 }
                }}>
                  To become India's most trusted travel brand, known for quality service,
                  honest pricing, and unforgettable journeys that create lifelong memories.
                </Typography>
              </Card>
            </Zoom>
          </Grid>
        </Grid>

        {/* Our Story */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
          <Fade in timeout={1000}>
            <Typography variant="h3" sx={{
              mb: { xs: 4, sm: 5, md: 6 },
              textAlign: 'center',
              fontWeight: 700,
              color: '#FF8E53',
              position: 'relative',
              display: 'inline-block',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: { xs: '1.8rem', sm: '2.25rem', md: '2.5rem' },
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

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Slide direction="right" in timeout={1000}>
                <Box sx={{ position: 'relative', px: { xs: 1, sm: 2 } }}>
                  <Box sx={{
                    width: { xs: 15, sm: 20 },
                    height: { xs: 15, sm: 20 },
                    background: '#FF8E53',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: -10,
                    left: -10,
                    animation: `${pulseAnimation} 2s ease-in-out infinite`,
                  }} />
                  <Typography variant="body1" paragraph sx={{ 
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, 
                    lineHeight: { xs: 1.5, sm: 1.6, md: 1.8 }
                  }}>
                    <strong>@Tripwale.in</strong> was founded by <strong>Atul Mandloi</strong>, a passionate travel enthusiast
                    who believes that every journey should tell a story. What began as a passion for exploring
                    hidden destinations has now grown into a trusted travel brand.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ 
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, 
                    lineHeight: { xs: 1.5, sm: 1.6, md: 1.8 }
                  }}>
                    We started with one simple belief — travel should be easy, affordable, and full of
                    unforgettable experiences. Today, we serve hundreds of happy travelers across India.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ 
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, 
                    lineHeight: { xs: 1.5, sm: 1.6, md: 1.8 }
                  }}>
                    We understand what travelers truly need — <strong>clear pricing, genuine experiences,
                      reliable service, and memories that last forever.</strong>
                  </Typography>
                </Box>
              </Slide>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Zoom in timeout={1200}>
                <Box
                  component="img"
                  src={OurStoryImage}
                  alt="Our Journey"
                  sx={{
                    width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
                    maxWidth: 500,
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(255, 142, 83, 0.3)',
                    transform: { xs: 'rotate(1deg)', sm: 'rotate(2deg)' },
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: { xs: 'rotate(0deg) scale(1.02)', sm: 'rotate(0deg) scale(1.02)' },
                    }
                  }}
                />
              </Zoom>
            </Grid>
          </Grid>
        </Box>

        {/* What We Do - Services */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
          <Typography variant="h3" sx={{
            mb: { xs: 4, sm: 5, md: 6 },
            textAlign: 'center',
            fontWeight: 700,
            color: '#29B6F6',
            fontSize: { xs: '1.8rem', sm: '2.25rem', md: '2.5rem' }
          }}>
            🧭 What We Do
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Grow in timeout={800 + index * 200}>
                  <Card sx={{
                    p: { xs: 2, sm: 2.5, md: 3 },
                    height: '100%',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fdff 100%)',
                    border: '2px solid #e3f2fd',
                    '&:hover': {
                      borderColor: '#29B6F6',
                      transform: { xs: 'none', sm: 'translateY(-5px)' },
                      transition: 'all 0.3s ease',
                      boxShadow: '0 10px 30px rgba(41, 182, 246, 0.2)',
                    }
                  }}>
                    <Box sx={{
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                      mb: { xs: 1, sm: 1.5, md: 2 },
                      animation: `${floatAnimation} 4s ease-in-out infinite ${index * 0.2}s`,
                    }}>
                      {service.icon}
                    </Box>
                    <Typography variant="h6" sx={{ 
                      mb: { xs: 0.5, sm: 1 }, 
                      fontWeight: 600, 
                      color: '#1565C0',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
                    }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                      fontSize: { xs: '0.8rem', sm: '0.9rem' }
                    }}>
                      {service.desc}
                    </Typography>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <Slide direction="up" in timeout={800 + index * 200}>
                  <Card sx={{
                    textAlign: 'center',
                    p: { xs: 1.5, sm: 2, md: 3 },
                    background: 'linear-gradient(135deg, #ffffff 0%, #fff8f0 100%)',
                    border: `2px solid ${stat.color}22`,
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: { xs: 120, sm: 140 },
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
                      fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem' },
                      mb: { xs: 0.5, sm: 1 },
                      color: stat.color,
                    }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h2" sx={{
                      fontWeight: 'bold',
                      mb: { xs: 0.5, sm: 1 },
                      background: `linear-gradient(45deg, ${stat.color}, ${stat.color}CC)`,
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }
                    }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      color: '#666',
                      fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1rem' }
                    }}>
                      {stat.label}
                    </Typography>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Choose Us */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
          <Typography variant="h3" sx={{
            mb: { xs: 4, sm: 5, md: 6 },
            textAlign: 'center',
            fontWeight: 700,
            color: '#06D6A0',
            fontSize: { xs: '1.8rem', sm: '2.25rem', md: '2.5rem' }
          }}>
            ⭐ Why Choose TripWale?
          </Typography>

          <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Fade in timeout={800 + index * 200}>
                  <Paper sx={{
                    p: { xs: 1.5, sm: 2 },
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1, sm: 1.5, md: 2 },
                    background: 'linear-gradient(90deg, #ffffff 0%, #f0fff4 100%)',
                    borderLeft: `4px solid #06D6A0`,
                    '&:hover': {
                      transform: { xs: 'translateX(5px)', sm: 'translateX(10px)' },
                      transition: 'transform 0.3s ease',
                    }
                  }}>
                    <CheckCircle sx={{ 
                      color: '#06D6A0', 
                      fontSize: { xs: 24, sm: 28 } 
                    }} />
                    <Typography variant="body1" sx={{ 
                      fontWeight: 500,
                      fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' }
                    }}>
                      {feature}
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: { xs: 2, sm: 3, md: 4 } }}>
            <Typography variant="h5" sx={{ 
              mb: { xs: 2, sm: 3 }, 
              fontWeight: 600, 
              color: '#FF6B6B',
              fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
              px: { xs: 2, sm: 3 }
            }}>
              ✨ We don't just plan trips — we create experiences
            </Typography>
          </Box>
        </Box>

        {/* Team Section */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
          <Typography variant="h3" sx={{
            mb: { xs: 4, sm: 5, md: 6 },
            textAlign: 'center',
            fontWeight: 700,
            color: '#FFD166',
            fontSize: { xs: '1.8rem', sm: '2.25rem', md: '2.5rem' }
          }}>
            👥 Meet Our Team
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ 
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Grow in timeout={1000 + index * 300}>
                  <Card sx={{
                    textAlign: 'center',
                    p: { xs: 2, sm: 3, md: 4 },
                    background: 'linear-gradient(135deg, #fffef0 0%, #fff8e1 100%)',
                    border: '2px solid #FFD166',
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: 400,
                    '&:hover .avatar': {
                      transform: { xs: 'none', sm: 'scale(1.1)' },
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
                        width: { xs: 80, sm: 100, md: 120 },
                        height: { xs: 80, sm: 100, md: 120 },
                        mx: 'auto',
                        mb: { xs: 2, sm: 3 },
                        border: '4px solid #FFD166',
                        boxShadow: '0 10px 20px rgba(255, 209, 102, 0.3)',
                      }}
                    />

                    <Typography variant="h5" sx={{ 
                      mb: 1, 
                      fontWeight: 700, 
                      color: '#F57C00',
                      fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
                    }}>
                      {member.name}
                    </Typography>

                    <Typography variant="h6" sx={{
                      mb: { xs: 1, sm: 2 },
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #FFB74D, #FF8F00)',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' }
                    }}>
                      {member.role}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ 
                      mb: { xs: 1, sm: 2 },
                      fontSize: { xs: '0.8rem', sm: '0.9rem' }
                    }}>
                      {member.experience}
                    </Typography>

                    <Box sx={{
                      p: { xs: 1, sm: 1.5, md: 2 },
                      mt: { xs: 1, sm: 2 },
                      background: '#FFF3E0',
                      borderRadius: 2,
                      borderLeft: '3px solid #FFB74D',
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontStyle: 'italic', 
                        color: '#E65100',
                        fontSize: { xs: '0.8rem', sm: '0.9rem' }
                      }}>
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
          p: { xs: 3, sm: 4, md: 6 },
          background: 'linear-gradient(135deg, #FF8E53 0%, #FF6B6B 100%)',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)',
          mb: { xs: 4, sm: 6, md: 8 }
        }}>
          {/* Animated background elements */}
          <Box sx={{
            position: 'absolute',
            width: { xs: 150, sm: 180, md: 200 },
            height: { xs: 150, sm: 180, md: 200 },
            background: 'radial-gradient(circle, #ffffff22 0%, transparent 70%)',
            borderRadius: '50%',
            top: { xs: -80, sm: -90, md: -100 },
            right: { xs: -80, sm: -90, md: -100 },
            animation: `${floatAnimation} 8s ease-in-out infinite`,
          }} />

          <Typography variant="h3" sx={{
            mb: { xs: 2, sm: 3 },
            color: 'white',
            fontWeight: 800,
            position: 'relative',
            zIndex: 1,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            px: { xs: 1, sm: 2 }
          }}>
            ✨ Let TripWale Be Your Travel Partner
          </Typography>

          <Typography variant="h6" sx={{
            mb: { xs: 3, sm: 4 },
            color: 'rgba(255,255,255,0.9)',
            maxWidth: 600,
            mx: 'auto',
            position: 'relative',
            zIndex: 1,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
            px: { xs: 2, sm: 3 },
            lineHeight: { xs: 1.4, sm: 1.5 }
          }}>
            Because every journey deserves to be special, memorable, and truly unforgettable.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{
              px: { xs: 4, sm: 5, md: 6 },
              py: { xs: 1, sm: 1.25, md: 1.5 },
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontWeight: 700,
              background: 'white',
              color: '#FF6B6B',
              borderRadius: 50,
              '&:hover': {
                background: '#f5f5f5',
                transform: { xs: 'scale(1.02)', sm: 'scale(1.05)' },
                transition: 'all 0.3s ease',
              }
            }}
          >
            Start Your Journey Now
          </Button>

          {/* Floating travel icons */}
          <Box sx={{ 
            mt: { xs: 3, sm: 4 }, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: { xs: 2, sm: 3, md: 4 },
            flexWrap: 'wrap'
          }}>
            {['✈️', '🏕️', '🧳', '❤️', '📍', '🏔️'].map((icon, index) => (
              <Box
                key={index}
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
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