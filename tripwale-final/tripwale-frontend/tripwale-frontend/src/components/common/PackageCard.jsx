import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
    Chip,
    Rating,
    Divider,
  } from '@mui/material'
  import {
    LocationOn,
    AccessTime,
    Star,
  } from '@mui/icons-material'
  import { Link } from 'react-router-dom'
  
  const PackageCard = ({ package: pkg }) => {
    const calculateDiscountedPrice = () => {
      return pkg.price * (1 - pkg.discount / 100)
    }
  
    return (
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={pkg.image}
            alt={pkg.title}
            sx={{ objectFit: 'cover' }}
          />
          {pkg.discount > 0 && (
            <Chip
              label={`${pkg.discount}% OFF`}
              color="secondary"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                fontWeight: 'bold',
              }}
            />
          )}
        </Box>
  
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, flexGrow: 1 }}>
              {pkg.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ color: 'warning.main', fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                {pkg.rating} ({pkg.reviews})
              </Typography>
            </Box>
          </Box>
  
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <LocationOn sx={{ fontSize: 18, color: 'primary.main' }} />
            <Typography variant="body2" color="text.secondary">
              {pkg.destinations.join(', ')}
            </Typography>
          </Box>
  
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <AccessTime sx={{ fontSize: 18, color: 'primary.main' }} />
            <Typography variant="body2" color="text.secondary">
              {pkg.duration}
            </Typography>
          </Box>
  
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Includes: {pkg.inclusions.slice(0, 3).join(', ')}
              {pkg.inclusions.length > 3 && '...'}
            </Typography>
          </Box>
  
          <Divider sx={{ my: 2 }} />
  
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              {pkg.discount > 0 && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: 'line-through',
                    color: 'text.disabled',
                  }}
                >
                  ${pkg.price}
                </Typography>
              )}
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                ${calculateDiscountedPrice().toFixed(0)}
                <Typography component="span" variant="body2" color="text.secondary">
                  /person
                </Typography>
              </Typography>
            </Box>
            
            <Button
              component={Link}
              to={`/package/${pkg.id}`}
              variant="contained"
              color="primary"
              size="medium"
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    )
  }
  
  export default PackageCard