import React, { useEffect, useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      // If already visited, don't show loading screen
      setShow(false);
      if (onLoadingComplete) onLoadingComplete();
    } else {
      // First visit - set flag and show loading for 3 seconds
      sessionStorage.setItem('hasVisited', 'true');
      
      const timer = setTimeout(() => {
        setShow(false);
        if (onLoadingComplete) onLoadingComplete();
      }, 3000); // Show animation for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [onLoadingComplete]);

  if (!show) return null;

  // Animation size based on screen
  const getAnimationSize = () => {
    if (isMobile) return { width: 300, height: 300 };
    return { width: 500, height: 500 };
  };

  const animSize = getAnimationSize();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#1e3a8a',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box sx={{ 
        width: animSize.width, 
        height: animSize.height,
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}>
        <DotLottieReact
          src="https://lottie.host/16e6e430-cce1-4129-9ef9-dc09ec19b328/DMLy37Whcv.lottie"
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
    </Box>
  );
};

export default LoadingScreen;