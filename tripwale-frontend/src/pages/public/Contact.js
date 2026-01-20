import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Alert,
  Card,
  CardContent,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  WhatsApp,
  AccessTime,
  Person,
  Message,
  Send,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const contactInfo = [
    {
      icon: <LocationOn />,
      title: 'Our Location',
      details: ['Indore, Madhya Pradesh', 'PAN India & Abroad Services'],
      color: 'primary',
    },
    {
      icon: <Phone />,
      title: 'Phone Number',
      details: ['6266203629', 'WhatsApp Inquiry Support Available'],
      color: 'secondary',
    },
    {
      icon: <Email />,
      title: 'Email Address',
      details: ['info@tripwale.in', 'admin@tripwale.in'],
      color: 'error',
    },
    {
      icon: <AccessTime />,
      title: 'Working Hours',
      details: ['Monday - Sunday: 8 AM - 10 PM', '24/7 WhatsApp Support'],
      color: 'success',
    },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
      .required('Phone is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await api.post('/inquiries', values);
      toast.success('Message sent successfully! We will contact you soon.');
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send message');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Tripwale.in</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            We're Here to Help You
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Have questions about our tours? Need help with booking? Contact our travel experts today!
          </Typography>
        </Box>

        {/* Contact Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: `${info.color}.light`,
                    color: `${info.color}.main`,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {info.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {info.title}
                </Typography>
                {info.details.map((detail, idx) => (
                  <Typography key={idx} variant="body2" color="text.secondary">
                    {detail}
                  </Typography>
                ))}
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Send us a Message
              </Typography>
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  phone: '',
                  subject: '',
                  message: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  isSubmitting,
                }) => (
                  <Form>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="name"
                          label="Your Name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
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
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="phone"
                          label="Phone Number"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.phone && Boolean(errors.phone)}
                          helperText={touched.phone && errors.phone}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="subject"
                          label="Subject"
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.subject && Boolean(errors.subject)}
                          helperText={touched.subject && errors.subject}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="message"
                          label="Your Message"
                          multiline
                          rows={6}
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.message && Boolean(errors.message)}
                          helperText={touched.message && errors.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Message />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          disabled={isSubmitting}
                          startIcon={<Send />}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>

          {/* Quick Contact & Info */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* WhatsApp CTA */}
              <Card sx={{ bgcolor: '#25D366', color: 'white' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <WhatsApp sx={{ fontSize: 40, mr: 2 }} />
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        WhatsApp Inquiry
                      </Typography>
                      <Typography variant="body1">
                        Get instant responses to your queries
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}`}
                    target="_blank"
                    sx={{
                      bgcolor: 'white',
                      color: '#25D366',
                      '&:hover': { bgcolor: '#f5f5f5' },
                    }}
                  >
                    Chat on WhatsApp
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Quick Contact
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Phone />}
                    href="tel:6266203629"
                    fullWidth
                  >
                    Call: 6266203629
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<WhatsApp />}
                    href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}`}
                    target="_blank"
                    fullWidth
                  >
                    WhatsApp: 6266203629
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Email />}
                    href="mailto:info@tripwale.in"
                    fullWidth
                  >
                    Email: info@tripwale.in
                  </Button>
                </Box>
              </Paper>

              {/* Response Time */}
              <Alert severity="info">
                <Typography variant="subtitle2" gutterBottom>
                  Response Time
                </Typography>
                <Typography variant="body2">
                  • WhatsApp: Instant response<br />
                  • Phone: Within 5 minutes<br />
                  • Email: Within 24 hours<br />
                  • Contact Form: Within 24 hours
                </Typography>
              </Alert>

              {/* Service Areas */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Service Areas
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" paragraph>
                  <strong>PAN India Coverage:</strong> All major cities including Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad, Pune, etc.
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>International:</strong> Dubai, Singapore, Thailand, Maldives, Europe, USA, Australia, and more.
                </Typography>
                <Typography variant="body2">
                  <strong>Special Focus:</strong> Religious tours across India including Chardham Yatra, Khatu Shyam, Ayodhya, Tirupati, Rameshwaram.
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Map Placeholder */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Our Location
          </Typography>
          <Box
            sx={{
              height: 400,
              bgcolor: 'grey.200',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              📍 Indore, Madhya Pradesh
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Contact;