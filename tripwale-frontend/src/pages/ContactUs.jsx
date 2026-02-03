import React, { useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Paper,
} from '@mui/material'
import {
  Phone,
  Email,
  LocationOn,
  WhatsApp,
  Send,
} from '@mui/icons-material'
import emailjs from '@emailjs/browser'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError('Please fill in all required fields')
      return
    }

    // EmailJS configuration
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      subject: formData.subject || 'Contact Form Submission',
      message: formData.message,
    }

    // Replace with your EmailJS credentials
    emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      templateParams,
      'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text)
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
      setError('')
    })
    .catch((err) => {
      console.error('FAILED...', err)
      setError('Failed to send message. Please try again later.')
    })
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 3 }}>
          Contact Us
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Get in touch with our travel experts
        </Typography>
      </Box>

      <Grid container spacing={6}>
        {/* Contact Information */}
        <Grid item xs={12} md={5}>
          <Box>
            <Typography variant="h4" sx={{ mb: 4 }}>
              Contact Information
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h6">Phone Number</Typography>
                    <Typography variant="body1">+91 6266203629</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h6">Email Address</Typography>
                    <Typography variant="body1">info@tripwale.in</Typography>
                    <Typography variant="body1">bookings@tripwale.in</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h6">Office Address</Typography>
                    <Typography variant="body1">TripWale.in Tour & Travels</Typography>
                    <Typography variant="body1">Indore, Madhya Pradesh</Typography>
                    <Typography variant="body1">PAN India & Abroad Operations</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WhatsApp color="success" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h6">WhatsApp</Typography>
                    <Typography variant="body1">+91 6266203629</Typography>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<WhatsApp />}
                      component="a"
                      href="https://wa.me/916266203629"
                      target="_blank"
                      sx={{ mt: 1 }}
                    >
                      Chat on WhatsApp
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
              Send Us a Message
            </Typography>
            
            {submitted && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you for your message! We'll get back to you soon.
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number *"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Booking Enquiry"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message *"
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Please include details like preferred destination, travel dates, number of people, etc."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<Send />}
                    sx={{ px: 4 }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>

            {/* Additional Info */}
            <Box sx={{ mt: 6, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                What happens after you contact us?
              </Typography>
              <ol>
                <li>Our travel expert will call you within 24 hours</li>
                <li>We'll understand your requirements and preferences</li>
                <li>We'll create a customized itinerary for you</li>
                <li>We'll share the best available prices</li>
                <li>We'll assist with all bookings and documentation</li>
              </ol>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Business Hours */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Business Hours
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">Monday - Friday</Typography>
                <Typography variant="h5">9:00 AM - 8:00 PM</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">Saturday</Typography>
                <Typography variant="h5">9:00 AM - 6:00 PM</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">Sunday</Typography>
                <Typography variant="h5">10:00 AM - 4:00 PM</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default ContactUs