import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
    Chip,
    Rating,
  } from '@mui/material'
  import {
    LocationOn,
    AccessTime,
    Star,
  } from '@mui/icons-material'
  import { Link } from 'react-router-dom'
  
  const DestinationCard = ({ destination }) => {
    return (
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="220"
            image={destination.image}
            alt={destination.name}
            sx={{ objectFit: 'cover' }}
          />
          {destination.tag && (
            <Chip
              label={destination.tag}
              color="primary"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                fontWeight: 'bold',
              }}
            />
          )}
        </Box>
  
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {destination.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ color: 'warning.main', fontSize: 18 }} />
              <Typography variant="body2" color="text.secondary">
                {destination.rating}
              </Typography>
            </Box>
          </Box>
  
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {destination.description}
          </Typography>
  
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTime sx={{ fontSize: 16, color: 'primary.main' }} />
              <Typography variant="body2" color="text.secondary">
                {destination.duration}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              ${destination.price}
            </Typography>
          </Box>
  
          <Button
            component={Link}
            to={`/tours?destination=${destination.name.toLowerCase()}`}
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<LocationOn />}
          >
            Explore Tours
          </Button>
        </CardContent>
      </Card>
    )
  }
  
  export default DestinationCard