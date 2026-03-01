import { Outlet } from 'react-router-dom'
import { Box, Container, useTheme, useMediaQuery } from '@mui/material'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        overflowX: 'hidden', // Prevent horizontal scroll
        width: '100%',
        position: 'relative',
        backgroundColor: '#f8fafc' // Light background for better contrast
      }}
    >
      {/* Header */}
      <Box 
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          width: '100%',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <Container 
          maxWidth="xl" 
          sx={{ 
            px: { 
              xs: 2,  // Mobile: 16px padding
              sm: 3,  // Small: 24px padding
              md: 4,  // Medium: 32px padding
              lg: 0   // Large: 0 padding (container handles it)
            }
          }}
        >
          <Header />
        </Container>
      </Box>

      {/* Main Content */}
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1,
          width: '100%',
          py: { xs: 3, sm: 4, md: 5 }, // Responsive vertical padding
          minHeight: 'calc(100vh - 140px)', // Ensure footer stays at bottom
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Container 
          maxWidth="xl"
          sx={{
            flexGrow: 1,
            width: '100%',
            px: { 
              xs: 2,  // Mobile: 16px
              sm: 3,  // Small: 24px
              md: 4,  // Medium: 32px
              lg: 0   // Large: 0 (container handles)
            },
            '& > *': {
              width: '100%'
            }
          }}
        >
          {/* Content Wrapper */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '100%',
              margin: '0 auto',
              position: 'relative',
              '& *': {
                maxWidth: '100%', // Prevent any element from overflowing
                boxSizing: 'border-box'
              }
            }}
          >
            <Outlet />
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        component="footer"
        sx={{
          width: '100%',
          backgroundColor: '#1e293b',
          color: 'white',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          mt: 'auto' // Push footer to bottom
        }}
      >
        <Container 
          maxWidth="xl"
          sx={{ 
            px: { 
              xs: 2,
              sm: 3,
              md: 4,
              lg: 0
            }
          }}
        >
          <Footer />
        </Container>
      </Box>

      {/* Responsive Utility Styles */}
      <style>
        {`
          /* Ensure images don't overflow */
          img, video, iframe {
            max-width: 100%;
            height: auto;
          }
          
          /* Prevent text overflow */
          .MuiTypography-root {
            overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;
          }
          
          /* Tables responsive */
          table {
            width: 100%;
            overflow-x: auto;
            display: block;
          }
          
          /* Form elements responsive */
          input, textarea, select {
            max-width: 100%;
          }
          
          /* Grid items */
          .MuiGrid-item {
            min-width: 0; /* Prevent grid item overflow */
          }
          
          /* Card content */
          .MuiCardContent-root {
            overflow-wrap: break-word;
          }
        `}
      </style>
    </Box>
  )
}

export default Layout