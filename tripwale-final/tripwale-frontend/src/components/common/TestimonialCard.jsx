import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    Rating,
  } from '@mui/material'
  import { FormatQuote } from '@mui/icons-material'
  
  const TestimonialCard = ({ testimonial }) => {
    return (
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          p: 3,
        }}
      >
        <FormatQuote
          sx={{
            fontSize: 40,
            color: 'secondary.main',
            mb: 2,
            opacity: 0.5,
          }}
        />
        
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            fontStyle: 'italic',
            flexGrow: 1,
          }}
        >
          "{testimonial.comment}"
        </Typography>
  
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={testimonial.avatar}
            sx={{
              width: 56,
              height: 56,
              border: '2px solid white',
            }}
          />
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {testimonial.name}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
              {testimonial.location}
            </Typography>
            <Rating
              value={testimonial.rating}
              readOnly
              size="small"
              sx={{ color: 'secondary.main' }}
            />
          </Box>
          
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            {new Date(testimonial.date).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </Typography>
        </Box>
      </Card>
    )
  }
  
  export default TestimonialCard