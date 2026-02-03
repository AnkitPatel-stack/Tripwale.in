import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Chip,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  TextField,
  InputAdornment,
} from '@mui/material'
import {
  LocationOn,
  AccessTime,
  People,
  CheckCircle,
  Cancel,
  CalendarToday,
  FlightTakeoff,
  Hotel,
  Restaurant,
  DirectionsBus,
  Attractions,
  Star,
  Share,
  Favorite,
  Bookmark,
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import SectionTitle from '../components/ui/SectionTitle'
import Destination3D from '../components/threejs/Destination3D'
import { packageDetails } from '../services/dummyData'

const PackageDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [selectedDate, setSelectedDate] = useState('')
  const [travelers, setTravelers] = useState(1)

  const pkg = packageDetails[id] || packageDetails[1]

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleBookNow = () => {
    console.log('Booking package:', {
      packageId: id,
      date: selectedDate,
      travelers: travelers,
      totalPrice: pkg.price * travelers,
    })
    navigate('/booking', { state: { package: pkg, travelers, date: selectedDate } })
  }

  const itineraryIcons = [<FlightTakeoff />, <Hotel />, <Restaurant />, <DirectionsBus />, <Attractions />]

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Breadcrumb */}
        <Box sx={{ mb: 4 }}>
          <Button onClick={() => navigate('/tours')} sx={{ color: 'text.secondary' }}>
            ← Back to Tours
          </Button>
        </Box>

        {/* Header Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              {pkg.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Rating value={pkg.rating} readOnly precision={0.1} />
              <Typography variant="body1" color="text.secondary">
                {pkg.rating} ({pkg.reviews} reviews)
              </Typography>
              <Chip label={pkg.difficulty} color="primary" size="small" />
              <Chip label={`Age ${pkg.ageRequirement}`} variant="outlined" size="small" />
            </Box>

            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              {pkg.description}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn color="primary" />
                <Typography>Multiple Destinations</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTime color="primary" />
                <Typography>{pkg.duration}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <People color="primary" />
                <Typography>Max {pkg.groupSize}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 100 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                  {pkg.discount > 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'text.disabled',
                        mr: 1,
                      }}
                    >
                      ${pkg.originalPrice}
                    </Typography>
                  )}
                  <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    ${pkg.price}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    /person
                  </Typography>
                </Box>

                {pkg.discount > 0 && (
                  <Chip
                    label={`${pkg.discount}% OFF`}
                    color="secondary"
                    sx={{ mb: 3, fontWeight: 'bold' }}
                  />
                )}

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Select Date
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Number of Travelers
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <People />
                        </InputAdornment>
                      ),
                      inputProps: { min: 1, max: 10 },
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleBookNow}
                  sx={{ mb: 2 }}
                >
                  Book Now
                </Button>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Favorite />}
                  >
                    Save
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Share />}
                  >
                    Share
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 3D Visualization */}
        <Box sx={{ mb: 8 }}>
          <Destination3D />
        </Box>

        {/* Tabs Section */}
        <Box sx={{ width: '100%', mb: 6 }}>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 4 }}>
            <Tab label="Overview" />
            <Tab label="Itinerary" />
            <Tab label="Inclusions" />
            <Tab label="Dates & Prices" />
          </Tabs>

          {activeTab === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="body1"
                sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}
                dangerouslySetInnerHTML={{ __html: pkg.detailedDescription }}
              />
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Stepper orientation="vertical" sx={{ mb: 4 }}>
                {pkg.itinerary.map((day, index) => (
                  <Step key={day.day} active={true}>
                    <StepLabel
                      optional={
                        <Typography variant="body2" color="text.secondary">
                          {day.description}
                        </Typography>
                      }
                    >
                      <Typography variant="h6">
                        Day {day.day}: {day.title}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </motion.div>
          )}

          {activeTab === 2 && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 3, color: 'success.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle /> What's Included
                  </Typography>
                  <List>
                    {pkg.inclusions.map((item, index) => (
                      <ListItem key={index} sx={{ py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 3, color: 'error.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Cancel /> What's Not Included
                  </Typography>
                  <List>
                    {pkg.exclusions.map((item, index) => (
                      <ListItem key={index} sx={{ py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Cancel color="error" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
            </Grid>
          )}

          {activeTab === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Available Departure Dates
                </Typography>
                <Grid container spacing={2}>
                  {pkg.departureDates.map((date, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {new Date(date).toLocaleDateString('en-US', { 
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {pkg.groupSize}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </motion.div>
          )}
        </Box>

        {/* Highlights */}
        <SectionTitle
          title="Trip Highlights"
          subtitle="What makes this tour special"
        />
        
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {itineraryIcons.map((icon, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ color: 'primary.main', fontSize: '2rem' }}>
                  {icon}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {['Flights', 'Luxury Stays', 'Gourmet Dining', 'Transport', 'Activities'][index]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Premium experience included
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Important Information */}
        <Card sx={{ p: 4, bgcolor: 'primary.light', color: 'white' }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Important Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Cancellation Policy
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Free cancellation up to 30 days before departure. 50% refund for cancellations 15-30 days before.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Visa Requirements
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Some destinations may require visas. We provide guidance but travelers are responsible for obtaining necessary documents.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Travel Insurance
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Highly recommended. We can assist with comprehensive travel insurance options.
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </motion.div>
    </Container>
  )
}

export default PackageDetailsPage