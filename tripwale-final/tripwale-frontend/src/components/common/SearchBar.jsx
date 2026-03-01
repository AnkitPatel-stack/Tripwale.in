import { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Grid,
} from '@mui/material'
import {
  Search as SearchIcon,
  LocationOn,
  CalendarToday,
  People,
} from '@mui/icons-material'

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    type: 'hotel',
  })

  const destinations = [
    'Bali, Indonesia',
    'Paris, France',
    'Tokyo, Japan',
    'New York, USA',
    'Dubai, UAE',
    'Sydney, Australia',
  ]

  const travelTypes = [
    { value: 'hotel', label: 'Hotel Stay' },
    { value: 'flight', label: 'Flights' },
    { value: 'package', label: 'Tour Package' },
    { value: 'cruise', label: 'Cruise' },
  ]

  const handleChange = (field) => (event) => {
    setSearchParams({ ...searchParams, [field]: event.target.value })
  }

  const handleSearch = () => {
    console.log('Searching:', searchParams)
    // Implement search logic here
  }

  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: 4,
        p: 3,
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        maxWidth: '1000px',
        mx: 'auto',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <TextField
            select
            fullWidth
            label="Destination"
            value={searchParams.destination}
            onChange={handleChange('destination')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn color="primary" />
                </InputAdornment>
              ),
            }}
          >
            {destinations.map((dest) => (
              <MenuItem key={dest} value={dest}>
                {dest}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            type="date"
            label="Check-in"
            value={searchParams.checkIn}
            onChange={handleChange('checkIn')}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            type="date"
            label="Check-out"
            value={searchParams.checkOut}
            onChange={handleChange('checkOut')}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            select
            fullWidth
            label="Travel Type"
            value={searchParams.type}
            onChange={handleChange('type')}
          >
            {travelTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={1}>
          <TextField
            fullWidth
            type="number"
            label="Guests"
            value={searchParams.guests}
            onChange={handleChange('guests')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <People color="primary" />
                </InputAdornment>
              ),
              inputProps: { min: 1, max: 10 },
            }}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            sx={{ height: '56px' }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SearchBar