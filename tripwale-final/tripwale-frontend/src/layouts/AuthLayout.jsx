import { Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'

const AuthLayout = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Outlet />
      </Box>
    </Container>
  )
}

export default AuthLayout