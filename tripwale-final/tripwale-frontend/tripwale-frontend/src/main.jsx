// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter as Router } from 'react-router-dom'
// import AppRoutes from './routes/AppRoutes.jsx'
// import { ThemeProvider, createTheme } from '@mui/material/styles'
// import CssBaseline from '@mui/material/CssBaseline'
// import './index.css'

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1e3a8a',
//     },
//   },
// })

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <AppRoutes />
//       </Router>
//     </ThemeProvider>
//   </React.StrictMode>,
// )

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AppLoader from './components/common/AppLoader'
import './index.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a',
    },
  },
})

const RootApp = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // loader visible for 2.5 seconds
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading && <AppLoader />}

      {!loading && (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <AppRoutes />
          </Router>
        </ThemeProvider>
      )}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
)