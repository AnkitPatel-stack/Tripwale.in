import { Box, CircularProgress, Typography } from '@mui/material'

const Loader = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: 3,
      }}
    >
      <CircularProgress 
        size={60}
        thickness={4}
        sx={{ color: 'primary.main' }}
      />
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        {message}
      </Typography>
    </Box>
  )
}

export default Loader