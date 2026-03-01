import { Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material'
import {
  Home,
  Explore,
  Flight,
  TempleHindu,
  Terrain,
  Info,
  ContactMail,
} from '@mui/icons-material'

const Navigation = () => {
  const navItems = [
    { icon: <Home />, label: 'Home', path: '/' },
    { icon: <Explore />, label: 'Domestic Tours', path: '/domestic-tours' },
    { icon: <Flight />, label: 'International Tours', path: '/international-tours' },
    { icon: <TempleHindu />, label: 'Religious Yatra', path: '/religious-yatra' },
    { icon: <Terrain />, label: 'Trekking Tours', path: '/trekking' },
    { icon: <Info />, label: 'About Us', path: '/about' },
    { icon: <ContactMail />, label: 'Contact Us', path: '/contact' },
  ]

  return (
    <Box
      sx={{
        width: 280,
        bgcolor: 'background.paper',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        boxShadow: 3,
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            fontSize: '1.8rem',
            fontWeight: 700,
            color: 'primary.main',
            mb: 4,
            textAlign: 'center',
          }}
        >
          TripWale.in
        </Box>
        
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default Navigation