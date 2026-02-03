import { Box } from '@mui/material'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const ParallaxSection = ({ children, speed = 0.5, ...props }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])

  return (
    <Box ref={ref} {...props} sx={{ position: 'relative', overflow: 'hidden', ...props.sx }}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </Box>
  )
}

export default ParallaxSection