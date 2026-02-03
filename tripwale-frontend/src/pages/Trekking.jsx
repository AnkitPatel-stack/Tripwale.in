import React, { useState } from 'react'
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
  Tabs,
  Tab,
} from '@mui/material'
import {
  Terrain,
  CalendarToday,
  Height,
  Hiking,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Trekking = () => {
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const trekkingTours = [
    {
      id: 1,
      title: 'Chadar Frozen River Trek',
      description: 'Walk on the frozen Zanskar river',
      location: 'Ladakh',
      duration: '9 Days',
      price: '₹42,999',
      difficulty: 'Difficult',
      altitude: '3850m',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
      season: 'Winter',
      category: 'winter'
    },
    {
      id: 2,
      title: 'Valley of Flowers',
      description: 'Alpine meadows with exotic flowers',
      location: 'Uttarakhand',
      duration: '6 Days',
      price: '₹18,999',
      difficulty: 'Moderate',
      altitude: '3658m',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      season: 'Monsoon',
      category: 'summer'
    },
    {
      id: 3,
      title: 'Hampta Pass Trek',
      description: 'Cross from green valleys to barren landscape',
      location: 'Himachal Pradesh',
      duration: '5 Days',
      price: '₹15,999',
      difficulty: 'Moderate',
      altitude: '4270m',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      season: 'Summer',
      category: 'summer'
    },
    {
      id: 4,
      title: 'Rupin Pass Trek',
      description: 'One of the most scenic Himalayan treks',
      location: 'Himachal-Uttarakhand',
      duration: '8 Days',
      price: '₹24,999',
      difficulty: 'Difficult',
      altitude: '4650m',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      season: 'Summer',
      category: 'summer'
    },
    {
      id: 5,
      title: 'Sandakphu Trek',
      description: 'Views of 4 of the 5 highest peaks',
      location: 'West Bengal',
      duration: '7 Days',
      price: '₹16,999',
      difficulty: 'Easy-Moderate',
      altitude: '3636m',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
      season: 'Spring/Autumn',
      category: 'spring'
    },
    {
      id: 6,
      title: 'Goechala Trek',
      description: 'Stunning views of Kanchenjunga',
      location: 'Sikkim',
      duration: '11 Days',
      price: '₹28,999',
      difficulty: 'Difficult',
      altitude: '4940m',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      season: 'Spring/Autumn',
      category: 'spring'
    },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}>
          Trekking Adventures
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Challenge yourself with these amazing Himalayan treks
        </Typography>
      </Box>

      {/* Season Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="All Treks" />
          <Tab label="Summer Treks" />
          <Tab label="Winter Treks" />
          <Tab label="Spring/Autumn" />
        </Tabs>
      </Box>

      <Grid container spacing={4}>
        {trekkingTours
          .filter(trek => tabValue === 0 || trek.category === ['all', 'summer', 'winter', 'spring'][tabValue])
          .map((trek) => (
          <Grid item xs={12} sm={6} md={4} key={trek.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={trek.image}
                alt={trek.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {trek.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {trek.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Terrain fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {trek.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2">{trek.duration}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Height fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2">{trek.altitude}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Chip 
                    label={trek.difficulty} 
                    size="small" 
                    color={
                      trek.difficulty === 'Easy' ? 'success' : 
                      trek.difficulty === 'Moderate' ? 'warning' : 'error'
                    }
                  />
                  <Typography variant="body2">
                    <strong>Season:</strong> {trek.season}
                  </Typography>
                </Box>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                  {trek.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="contained"
                  onClick={() => navigate(`/trek/${trek.id}`)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, p: 4, bgcolor: '#e8f5e9', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
          What's Included in Our Trek Packages?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Hiking sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Expert Guide</Typography>
              <Typography>Certified trek leader with first aid training</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 40, mb: 1 }}>🏕️</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Camping Equipment</Typography>
              <Typography>Tents, sleeping bags, and camping gear</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 40, mb: 1 }}>🍲</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Nutritious Meals</Typography>
              <Typography>High-energy meals during the trek</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Trekking