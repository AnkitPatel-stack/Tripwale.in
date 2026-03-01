import { Typography, Box } from '@mui/material'

const SectionTitle = ({ 
  title, 
  subtitle, 
  titleColor = 'primary.main',
  subtitleColor = 'text.secondary',
  align = 'center',
  maxWidth = '800px',
}) => {
  return (
    <Box sx={{ textAlign: align, mb: 6 }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          color: titleColor,
          mb: 2,
        }}
      >
        {title}
      </Typography>
      
      {subtitle && (
        <Typography
          variant="h6"
          sx={{
            color: subtitleColor,
            maxWidth: maxWidth,
            mx: 'auto',
            fontWeight: 400,
            opacity: 0.9,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}

export default SectionTitle