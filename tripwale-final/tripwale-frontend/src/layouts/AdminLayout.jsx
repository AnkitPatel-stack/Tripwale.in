// // src/layouts/AdminLayout.jsx
// import React, { useState } from 'react'
// import { Outlet, useNavigate, useLocation } from 'react-router-dom'
// import {
//   Box,
//   Drawer,
//   AppBar,
//   Toolbar,
//   List,
//   Typography,
//   Divider,
//   IconButton,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Avatar,
//   Menu,
//   MenuItem,
//   Container,
//   useMediaQuery,
//   useTheme,
//   Badge,
// } from '@mui/material'
// import {
//   Menu as MenuIcon,
//   Dashboard,
//   Home,
//   Flight,
//   TempleHindu,
//   DirectionsCar,
//   CalendarToday,
//   Hiking,
//   Info,
//   Phone,
//   Settings,
//   Logout,
//   Notifications,
//   Palette,
//   TextFields,
//   Image,
//   Category,
//   People,
//   Analytics,
//   Edit,
//   AdminPanelSettings,
//   ChevronLeft,
//   ChevronRight,
// } from '@mui/icons-material'

// const drawerWidth = 280

// const AdminLayout = () => {
//   const theme = useTheme()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [drawerOpen, setDrawerOpen] = useState(!isMobile)

//   const menuItems = [
//     { label: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
//     { label: 'Website Analytics', icon: <Analytics />, path: '/admin/analytics' },
//     { divider: true },
//     { label: 'Home Page', icon: <Home />, path: '/admin/edit/home' },
//     { label: 'Domestic Tours', icon: <DirectionsCar />, path: '/admin/edit/domestic' },
//     { label: 'International Tours', icon: <Flight />, path: '/admin/edit/international' },
//     { label: 'Religious Yatra', icon: <TempleHindu />, path: '/admin/edit/religious' },
//     { label: 'One Day Trips', icon: <CalendarToday />, path: '/admin/edit/one-day-trips' },
//     { label: 'Trekking Tours', icon: <Hiking />, path: '/admin/edit/trekking' },
//     { label: 'About Us', icon: <Info />, path: '/admin/edit/about' },
//     { label: 'Contact Us', icon: <Phone />, path: '/admin/edit/contact' },
//     { divider: true },
//     { label: 'Website Theme', icon: <Palette />, path: '/admin/theme' },
//     { label: 'Text & Content', icon: <TextFields />, path: '/admin/content' },
//     { label: 'Media Library', icon: <Image />, path: '/admin/media' },
//     { label: 'Categories', icon: <Category />, path: '/admin/categories' },
//     { label: 'Reviews', icon: <People />, path: '/admin/reviews' },
//     { divider: true },
//     { label: 'Settings', icon: <Settings />, path: '/admin/settings' },
//   ]

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen)
//   }

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleMenuClose = () => {
//     setAnchorEl(null)
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('admin_token')
//     localStorage.removeItem('admin_logged_in')
//     navigate('/admin/login')
//   }

//   const handleNavigation = (path) => {
//     navigate(path)
//     if (isMobile) {
//       setMobileOpen(false)
//     }
//   }

//   const drawer = (
//     <Box>
//       {/* Logo Section */}
//       <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
//           <Avatar
//             sx={{
//               width: 60,
//               height: 60,
//               bgcolor: '#1e3a8a',
//               border: '3px solid rgba(30, 58, 138, 0.1)',
//             }}
//           >
//             <AdminPanelSettings sx={{ fontSize: 30 }} />
//           </Avatar>
//         </Box>
//         <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e3a8a' }}>
//           TripWale Admin
//         </Typography>
//         <Typography variant="caption" sx={{ color: '#666' }}>
//           Content Management System
//         </Typography>
//       </Box>

//       <Divider />

//       {/* Menu Items */}
//       <List sx={{ px: 2, pt: 2 }}>
//         {menuItems.map((item, index) => (
//           item.divider ? (
//             <Divider key={`divider-${index}`} sx={{ my: 2 }} />
//           ) : (
//             <ListItem
//               key={item.label}
//               disablePadding
//               sx={{ mb: 1, borderRadius: 2 }}
//             >
//               <ListItemButton
//                 selected={location.pathname === item.path}
//                 onClick={() => handleNavigation(item.path)}
//                 sx={{
//                   borderRadius: 2,
//                   '&.Mui-selected': {
//                     backgroundColor: 'rgba(30, 58, 138, 0.1)',
//                     '& .MuiListItemIcon-root': {
//                       color: '#1e3a8a',
//                     },
//                     '& .MuiListItemText-primary': {
//                       color: '#1e3a8a',
//                       fontWeight: 600,
//                     },
//                   },
//                   '&:hover': {
//                     backgroundColor: 'rgba(30, 58, 138, 0.05)',
//                   },
//                 }}
//               >
//                 <ListItemIcon sx={{ color: '#666', minWidth: 40 }}>
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={item.label}
//                   primaryTypographyProps={{
//                     fontSize: '0.9rem',
//                     fontWeight: location.pathname === item.path ? 600 : 400,
//                   }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           )
//         ))}
//       </List>
//     </Box>
//   )

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
//       {/* App Bar */}
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { md: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
//           ml: { md: drawerOpen ? `${drawerWidth}px` : 0 },
//           bgcolor: 'white',
//           color: '#1e3a8a',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
//           borderBottom: '1px solid rgba(0,0,0,0.05)',
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={() => setDrawerOpen(!drawerOpen)}
//             sx={{ mr: 2, display: { md: 'flex', xs: 'none' } }}
//           >
//             {drawerOpen ? <ChevronLeft /> : <ChevronRight />}
//           </IconButton>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { md: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
          
//           <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
//             {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
//           </Typography>

//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <IconButton color="inherit">
//               <Badge badgeContent={3} color="error">
//                 <Notifications />
//               </Badge>
//             </IconButton>
            
//             <IconButton
//               onClick={handleMenuOpen}
//               sx={{
//                 p: 0,
//                 '&:hover': {
//                   transform: 'scale(1.05)',
//                   transition: 'transform 0.2s',
//                 },
//               }}
//             >
//               <Avatar
//                 sx={{
//                   width: 40,
//                   height: 40,
//                   bgcolor: '#1e3a8a',
//                   border: '2px solid rgba(30, 58, 138, 0.2)',
//                 }}
//               >
//                 A
//               </Avatar>
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* User Menu */}
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//         PaperProps={{
//           sx: {
//             mt: 1.5,
//             minWidth: 200,
//             borderRadius: 2,
//             boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
//           },
//         }}
//       >
//         <MenuItem sx={{ py: 1.5, px: 3 }}>
//           <Typography variant="body2" sx={{ fontWeight: 600 }}>
//             admin@tripwale.in
//           </Typography>
//         </MenuItem>
//         <Divider />
//         <MenuItem onClick={() => navigate('/admin/settings')} sx={{ py: 1.5 }}>
//           <Settings sx={{ mr: 2, fontSize: 20 }} />
//           Settings
//         </MenuItem>
//         <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#f44336' }}>
//           <Logout sx={{ mr: 2, fontSize: 20 }} />
//           Logout
//         </MenuItem>
//       </Menu>

//       {/* Sidebar Drawer */}
//       <Box
//         component="nav"
//         sx={{ width: { md: drawerOpen ? drawerWidth : 0 }, flexShrink: { md: 0 } }}
//       >
//         {/* Mobile Drawer */}
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', md: 'none' },
//             '& .MuiDrawer-paper': {
//               boxSizing: 'border-box',
//               width: drawerWidth,
//               borderRight: '1px solid rgba(0,0,0,0.08)',
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>

//         {/* Desktop Drawer */}
//         <Drawer
//           variant="persistent"
//           open={drawerOpen}
//           sx={{
//             display: { xs: 'none', md: 'block' },
//             '& .MuiDrawer-paper': {
//               boxSizing: 'border-box',
//               width: drawerWidth,
//               borderRight: '1px solid rgba(0,0,0,0.08)',
//               position: 'relative',
//               height: '100vh',
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { md: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
//           mt: '64px',
//         }}
//       >
//         <Container maxWidth="xl" sx={{ pt: 2 }}>
//           <Outlet />
//         </Container>
//       </Box>
//     </Box>
//   )
// }

// export default AdminLayout

// src/layouts/AdminLayout.jsx
import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Container,
  useMediaQuery,
  useTheme,
  Badge,
  Collapse,
  Tooltip,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  Home,
  Flight,
  TempleHindu,
  DirectionsCar,
  CalendarToday,
  Hiking,
  Info,
  Phone,
  Settings,
  Logout,
  Notifications,
  Palette,
  TextFields,
  Image,
  Category,
  People,
  Analytics,
  Edit,
  AdminPanelSettings,
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  AddBox,
  LibraryBooks,
  Star,
  WhatsApp,
  Email,
  Map,
} from '@mui/icons-material'

const drawerWidth = 300

const AdminLayout = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(!isMobile)
  const [openMenus, setOpenMenus] = useState({})
  const [adminName, setAdminName] = useState('Admin')
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Load admin data
    const adminData = localStorage.getItem('admin_data')
    if (adminData) {
      const { name } = JSON.parse(adminData)
      setAdminName(name || 'Admin')
    }

    // Load notifications
    const savedNotifications = localStorage.getItem('admin_notifications')
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }
  }, [])

  const menuItems = [
    {
      label: 'Dashboard',
      icon: <Dashboard />,
      path: '/admin/dashboard',
    },
    {
      label: 'Website Analytics',
      icon: <Analytics />,
      path: '/admin/analytics',
    },
    { divider: true },
    {
      label: 'Content Management',
      icon: <Edit />,
      children: [
        { label: 'Home Page', icon: <Home />, path: '/admin/content/home' }, // YEH SAHI HAI
        { label: 'Domestic Tours', icon: <DirectionsCar />, path: '/admin/content/domestic' },
        { label: 'International Tours', icon: <Flight />, path: '/admin/content/international' },
        { label: 'Religious Yatra', icon: <TempleHindu />, path: '/admin/content/religious' },
        { label: 'One Day Trips', icon: <CalendarToday />, path: '/admin/content/one-day-trips' },
        { label: 'Trekking Tours', icon: <Hiking />, path: '/admin/content/trekking' },
        { label: 'About Us', icon: <Info />, path: '/admin/content/about' },
        { label: 'Contact Us', icon: <Phone />, path: '/admin/content/contact' },
      ],
    },
    {
      label: 'Tours Management',
      icon: <LibraryBooks />,
      children: [
        { label: 'All Tours', icon: <LibraryBooks />, path: '/admin/tours' },
        { label: 'Add New Tour', icon: <AddBox />, path: '/admin/tours/add' },
        { label: 'Manage Categories', icon: <Category />, path: '/admin/tours/categories' },
      ],
    },
    {
      label: 'Reviews & Ratings',
      icon: <Star />,
      children: [
        { label: 'All Reviews', icon: <Star />, path: '/admin/reviews' },
        { label: 'Pending Reviews', icon: <Star />, path: '/admin/reviews/pending' },
      ],
    },
    { divider: true },
    {
      label: 'Media Library',
      icon: <Image />,
      path: '/admin/media',
    },
    {
      label: 'Theme & Design',
      icon: <Palette />,
      path: '/admin/theme',
    },
    {
      label: 'Text & Content Blocks',
      icon: <TextFields />,
      path: '/admin/content-blocks',
    },
    {
      label: 'Settings',
      icon: <Settings />,
      children: [
        { label: 'General Settings', icon: <Settings />, path: '/admin/settings' },
        { label: 'WhatsApp Integration', icon: <WhatsApp />, path: '/admin/settings/whatsapp' },
        { label: 'Email Settings', icon: <Email />, path: '/admin/settings/email' },
        { label: 'SEO Settings', icon: <Map />, path: '/admin/settings/seo' },
      ],
    },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_token_jwt')
    localStorage.removeItem('admin_logged_in')
    localStorage.removeItem('admin_data')
    navigate('/admin/login')
  }

  const handleNavigation = (path) => {
    navigate(path)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const toggleMenu = (label) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  const renderMenuItem = (item) => {
    if (item.divider) {
      return <Divider key={item.divider} sx={{ my: 2 }} />
    }

    if (item.children) {
      const isOpen = openMenus[item.label]
      return (
        <Box key={item.label}>
          <ListItem disablePadding sx={{ mb: 0.5, borderRadius: 2 }}>
            <ListItemButton
              onClick={() => toggleMenu(item.label)}
              sx={{
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(30, 58, 138, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#666', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              />
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItem
                  key={child.label}
                  disablePadding
                  sx={{ pl: 4, mb: 0.5, borderRadius: 2 }}
                >
                  <ListItemButton
                    selected={location.pathname === child.path}
                    onClick={() => handleNavigation(child.path)}
                    sx={{
                      borderRadius: 2,
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(30, 58, 138, 0.1)',
                        '& .MuiListItemIcon-root': {
                          color: '#1e3a8a',
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: '#666', minWidth: 36 }}>
                      {child.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={child.label}
                      primaryTypographyProps={{
                        fontSize: '0.85rem',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      )
    }

    return (
      <ListItem
        key={item.label}
        disablePadding
        sx={{ mb: 0.5, borderRadius: 2 }}
      >
        <ListItemButton
          selected={location.pathname === item.path}
          onClick={() => handleNavigation(item.path)}
          sx={{
            borderRadius: 2,
            '&.Mui-selected': {
              backgroundColor: 'rgba(30, 58, 138, 0.1)',
              '& .MuiListItemIcon-root': {
                color: '#1e3a8a',
              },
              '& .MuiListItemText-primary': {
                color: '#1e3a8a',
                fontWeight: 600,
              },
            },
            '&:hover': {
              backgroundColor: 'rgba(30, 58, 138, 0.05)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#666', minWidth: 40 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: location.pathname === item.path ? 600 : 400,
            }}
          />
        </ListItemButton>
      </ListItem>
    )
  }

  const drawer = (
    <Box>
      {/* Logo Section */}
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 70,
              height: 70,
              bgcolor: '#1e3a8a',
              border: '3px solid rgba(30, 58, 138, 0.1)',
            }}
          >
            <AdminPanelSettings sx={{ fontSize: 35 }} />
          </Avatar>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e3a8a' }}>
          TripWale Admin
        </Typography>
        <Typography variant="caption" sx={{ color: '#666' }}>
          Complete Website Control
        </Typography>
      </Box>

      <Divider />

      {/* Menu Items */}
      <List sx={{ px: 2, pt: 2, pb: 4 }}>
        {menuItems.map(renderMenuItem)}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
          ml: { md: drawerOpen ? `${drawerWidth}px` : 0 },
          bgcolor: 'white',
          color: '#1e3a8a',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2, display: { md: 'flex', xs: 'none' } }}
          >
            {drawerOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Welcome, {adminName}!
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Badge badgeContent={notifications.length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                p: 0,
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#1e3a8a',
                  border: '2px solid rgba(30, 58, 138, 0.2)',
                }}
              >
                {adminName.charAt(0)}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          },
        }}
      >
        <MenuItem sx={{ py: 1.5, px: 3 }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {adminName}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666' }}>
              Administrator
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { handleMenuClose(); navigate('/admin/settings'); }} sx={{ py: 1.5 }}>
          <Settings sx={{ mr: 2, fontSize: 20 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#f44336' }}>
          <Logout sx={{ mr: 2, fontSize: 20 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerOpen ? drawerWidth : 0 }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid rgba(0,0,0,0.08)',
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="persistent"
          open={drawerOpen}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid rgba(0,0,0,0.08)',
              position: 'relative',
              height: '100vh',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
          mt: '64px',
        }}
      >
        <Container maxWidth="xl" sx={{ pt: 2 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}

export default AdminLayout