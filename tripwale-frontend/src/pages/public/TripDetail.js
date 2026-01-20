import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  People,
  CheckCircle,
  Cancel,
  Flight,
  Hotel,
  Restaurant,
  DirectionsCar,
  AccessTime,
  PriceCheck,
  WhatsApp,
  Phone,
  Email,
  ArrowBack,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inquiryDialog, setInquiryDialog] = useState(false);
  const [bookingDialog, setBookingDialog] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const fetchTrip = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/trips/${id}`);
      setTrip(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInquirySubmit = async (values, { resetForm }) => {
    try {
      await api.post('/inquiries', {
        ...values,
        trip: id,
        type: 'trip',
      });
      toast.success('Inquiry submitted successfully! We will contact you soon.');
      resetForm();
      setInquiryDialog(false);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit inquiry');
    }
  };

  const handleBookingSubmit = async (values, { resetForm }) => {
    try {
      await api.post('/bookings', {
        trip: id,
        travelDate: values.travelDate,
        numberOfPeople: {
          adults: parseInt(values.adults),
          children: parseInt(values.children),
          seniors: parseInt(values.seniors),
        },
      });
      toast.success('Booking request submitted successfully!');
      resetForm();
      setBookingDialog(false);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit booking');
    }
  };

  const inquiryValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
      .required('Phone is required'),
    message: Yup.string().required('Message is required'),
  });

  const bookingValidationSchema = Yup.object({
    travelDate: Yup.date().required('Travel date is required'),
    adults: Yup.number()
      .min(1, 'At least 1 adult is required')
      .required('Number of adults is required'),
    children: Yup.number().min(0, 'Cannot be negative'),
    seniors: Yup.number().min(0, 'Cannot be negative'),
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={fetchTrip} />;
  if (!trip) return <Error message="Trip not found" onRetry={fetchTrip} />;

  const calculateTotal = (adults = 1, children = 0, seniors = 0) => {
    const adultPrice = adults * trip.price.perPerson;
    const childPrice = children * (trip.price.perPerson - trip.price.childDiscount);
    const seniorPrice = seniors * (trip.price.perPerson - trip.price.seniorDiscount);
    return adultPrice + childPrice + seniorPrice;
  };

  return (
    <>
      <Helmet>
        <title>{trip.title} | Tripwale.in</title>
        <meta name="description" content={trip.shortDescription} />
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          to="/trips"
          sx={{ mb: 3 }}
        >
          Back to Trips
        </Button>

        {/* Trip Header */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h2" component="h1" gutterBottom>
              {trip.title}
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {trip.shortDescription}
            </Typography>

            {/* Tags */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              <Chip label={trip.type?.toUpperCase()} color="primary" />
              {trip.isFeatured && <Chip label="Featured" color="secondary" />}
              <Chip
                icon={<CalendarToday />}
                label={`${trip.duration?.days} Days / ${trip.duration?.nights} Nights`}
              />
              <Chip
                icon={<LocationOn />}
                label={`${trip.destinations?.length} Destinations`}
              />
            </Box>

            {/* Main Image */}
            {trip.images && trip.images.length > 0 ? (
              <Box sx={{ mb: 3 }}>
                <Box
                  component="img"
                  src={trip.images[activeImage]?.url || '/trip-placeholder.jpg'}
                  alt={trip.title}
                  sx={{
                    width: '100%',
                    height: 400,
                    objectFit: 'cover',
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
                {/* Thumbnails */}
                {trip.images.length > 1 && (
                  <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
                    {trip.images.map((image, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={image.url}
                        alt={`${trip.title} ${index + 1}`}
                        onClick={() => setActiveImage(index)}
                        sx={{
                          width: 100,
                          height: 70,
                          objectFit: 'cover',
                          borderRadius: 1,
                          cursor: 'pointer',
                          border: activeImage === index ? '3px solid' : '1px solid',
                          borderColor: activeImage === index ? 'primary.main' : 'grey.300',
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  height: 400,
                  bgcolor: 'grey.200',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <Typography color="text.secondary">No Images Available</Typography>
              </Box>
            )}

            {/* Description */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Tour Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {trip.description}
              </Typography>
            </Paper>

            {/* Itinerary */}
            {trip.itinerary && trip.itinerary.length > 0 && (
              <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                  Itinerary
                </Typography>
                <Stepper orientation="vertical">
                  {trip.itinerary.map((day, index) => (
                    <Step key={day.day} active>
                      <StepLabel>
                        <Typography variant="h6">
                          Day {day.day}: {day.title}
                        </Typography>
                      </StepLabel>
                      <Box sx={{ pl: 4, pb: 2 }}>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {day.description}
                        </Typography>
                        {day.meals && day.meals !== 'None' && (
                          <Typography variant="body2">
                            <Restaurant sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                            Meals: {day.meals}
                          </Typography>
                        )}
                      </Box>
                    </Step>
                  ))}
                </Stepper>
              </Paper>
            )}

            {/* Inclusions & Exclusions */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle color="success" sx={{ mr: 1 }} />
                    Inclusions
                  </Typography>
                  <List dense>
                    {trip.inclusions?.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Cancel color="error" sx={{ mr: 1 }} />
                    Exclusions
                  </Typography>
                  <List dense>
                    {trip.exclusions?.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Cancel color="error" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Sidebar - Pricing & Actions */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 20 }}>
              <CardContent>
                {/* Price */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    ₹{trip.price?.perPerson?.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Per Person
                  </Typography>
                </Box>

                {/* Discounts */}
                <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Special Discounts
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Children (Below 12)</Typography>
                    <Typography variant="body2" color="success.main">
                      -₹{trip.price?.childDiscount?.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Seniors (Above 60)</Typography>
                    <Typography variant="body2" color="success.main">
                      -₹{trip.price?.seniorDiscount?.toLocaleString()}
                    </Typography>
                  </Box>
                </Paper>

                {/* Quick Info */}
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <AccessTime />
                    </ListItemIcon>
                    <ListItemText
                      primary="Duration"
                      secondary={`${trip.duration?.days} Days, ${trip.duration?.nights} Nights`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <People />
                    </ListItemIcon>
                    <ListItemText
                      primary="Available Seats"
                      secondary={`${trip.availableSeats} of ${trip.maxPeople}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText
                      primary="Destinations"
                      secondary={trip.destinations?.join(', ')}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday />
                    </ListItemIcon>
                    <ListItemText
                      primary="Next Departure"
                      secondary={new Date(trip.startDate).toLocaleDateString()}
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 3 }} />

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={() => setBookingDialog(true)}
                    disabled={!isAuthenticated}
                  >
                    {isAuthenticated ? 'Book Now' : 'Login to Book'}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => setInquiryDialog(true)}
                  >
                    Make an Inquiry
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<WhatsApp />}
                    href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}?text=Hello, I'm interested in ${trip.title}`}
                    target="_blank"
                    sx={{
                      bgcolor: '#25D366',
                      '&:hover': { bgcolor: '#128C7E' },
                    }}
                  >
                    WhatsApp Now
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Phone />}
                    href="tel:6266203629"
                  >
                    Call: 6266203629
                  </Button>
                </Box>

                {/* Important Notes */}
                <Alert severity="info" sx={{ mt: 3 }}>
                  <Typography variant="body2">
                    • Prices are subject to change<br />
                    • Book at least 30 days in advance<br />
                    • Customization available on request
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Inquiry Dialog */}
      <Dialog open={inquiryDialog} onClose={() => setInquiryDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Make an Inquiry</DialogTitle>
        <Formik
          initialValues={{ name: '', email: '', phone: '', message: '' }}
          validationSchema={inquiryValidationSchema}
          onSubmit={handleInquirySubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <DialogContent>
                <TextField
                  fullWidth
                  name="name"
                  label="Your Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  name="message"
                  label="Your Message/Questions"
                  multiline
                  rows={4}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.message && Boolean(errors.message)}
                  helperText={touched.message && errors.message}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setInquiryDialog(false)}>Cancel</Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={bookingDialog} onClose={() => setBookingDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Book This Trip</DialogTitle>
        <Formik
          initialValues={{ travelDate: '', adults: 1, children: 0, seniors: 0 }}
          validationSchema={bookingValidationSchema}
          onSubmit={handleBookingSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => {
            const total = calculateTotal(values.adults, values.children, values.seniors);
            return (
              <Form>
                <DialogContent>
                  <TextField
                    fullWidth
                    name="travelDate"
                    label="Travel Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={values.travelDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.travelDate && Boolean(errors.travelDate)}
                    helperText={touched.travelDate && errors.travelDate}
                    sx={{ mb: 2 }}
                  />
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        name="adults"
                        label="Adults"
                        type="number"
                        value={values.adults}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.adults && Boolean(errors.adults)}
                        helperText={touched.adults && errors.adults}
                        inputProps={{ min: 1 }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        name="children"
                        label="Children"
                        type="number"
                        value={values.children}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.children && Boolean(errors.children)}
                        helperText={touched.children && errors.children}
                        inputProps={{ min: 0 }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        name="seniors"
                        label="Seniors"
                        type="number"
                        value={values.seniors}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.seniors && Boolean(errors.seniors)}
                        helperText={touched.seniors && errors.seniors}
                        inputProps={{ min: 0 }}
                      />
                    </Grid>
                  </Grid>

                  {/* Price Summary */}
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Price Summary
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        Adults ({values.adults} × ₹{trip.price?.perPerson?.toLocaleString()})
                      </Typography>
                      <Typography variant="body2">
                        ₹{(values.adults * trip.price.perPerson).toLocaleString()}
                      </Typography>
                    </Box>
                    {values.children > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">
                          Children ({values.children} × ₹{(trip.price.perPerson - trip.price.childDiscount).toLocaleString()})
                        </Typography>
                        <Typography variant="body2">
                          ₹{(values.children * (trip.price.perPerson - trip.price.childDiscount)).toLocaleString()}
                        </Typography>
                      </Box>
                    )}
                    {values.seniors > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">
                          Seniors ({values.seniors} × ₹{(trip.price.perPerson - trip.price.seniorDiscount).toLocaleString()})
                        </Typography>
                        <Typography variant="body2">
                          ₹{(values.seniors * (trip.price.perPerson - trip.price.seniorDiscount)).toLocaleString()}
                        </Typography>
                      </Box>
                    )}
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1" fontWeight="bold">
                        Total Amount
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" color="primary">
                        ₹{total.toLocaleString()}
                      </Typography>
                    </Box>
                  </Paper>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setBookingDialog(false)}>Cancel</Button>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
};

export default TripDetail;