import { Button } from '@mui/material'
import { motion } from 'framer-motion'

const AnimatedButton = ({ children, variant = 'contained', ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Button
        variant={variant}
        {...props}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '5px',
            height: '5px',
            background: 'rgba(255, 255, 255, 0.5)',
            opacity: 0,
            borderRadius: '100%',
            transform: 'scale(1, 1) translate(-50%)',
            transformOrigin: '50% 50%',
          },
          '&:focus:not(:active)::after': {
            animation: 'ripple 1s ease-out',
          },
          '@keyframes ripple': {
            '0%': {
              transform: 'scale(0, 0)',
              opacity: 0.5,
            },
            '20%': {
              transform: 'scale(25, 25)',
              opacity: 0.3,
            },
            '100%': {
              opacity: 0,
              transform: 'scale(40, 40)',
            },
          },
          ...props.sx,
        }}
      >
        {children}
      </Button>
    </motion.div>
  )
}

export default AnimatedButton