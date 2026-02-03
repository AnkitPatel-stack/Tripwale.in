import { useState, useEffect } from 'react'
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Pagination,
} from '@mui/material'
import {
  FilterList,
  Sort,
  Search,
  Clear,
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import PackageCard from '../components/common/PackageCard'
import SectionTitle from '../components/ui/SectionTitle'
import { allPackages } from '../services/dummyData'

const ToursPage = () => {
  const [packages] = useState(allPackages)
  const [filteredPackages, setFilteredPackages] = useState(allPackages)
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    duration: '',
    destination: '',
    sortBy: 'popular',
  })
  const [page, setPage] = useState(1)
  const packagesPerPage = 6

  const destinations = [...new Set(allPackages.flatMap(pkg => pkg.destinations))]
  const durations = [...new Set(allPackages.map(pkg => pkg.duration))]

  useEffect(() => {
    let filtered = [...packages]

    // Price filter
    filtered = filtered.filter(
      pkg => pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1]
    )

    // Duration filter
    if (filters.duration) {
      filtered = filtered.filter(pkg => pkg.duration === filters.duration)
    }

    // Destination filter
    if (filters.destination) {
      filtered = filtered.filter(pkg => 
        pkg.destinations.some(dest => 
          dest.toLowerCase().includes(filters.destination.toLowerCase())
        )
      )
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    setFilteredPackages(filtered)
    setPage(1)
  }, [filters, packages])

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleClearFilters = () => {
    setFilters({
      priceRange: [0, 5000],
      duration: '',
      destination: '',
      sortBy: 'popular',
    })
  }

  const paginatedPackages = filteredPackages.slice(
    (page - 1) * packagesPerPage,
    page * packagesPerPage
  )

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle
          title="Explore Our Tour Packages"
          subtitle="Find your perfect getaway from our curated collection"
        />

        {/* Filters and Sorting */}
        <Box sx={{ mb: 6, p: 3, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterList /> Filters
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Typography>
                <Slider
                  value={filters.priceRange}
                  onChange={(_, value) => handleFilterChange('priceRange', value)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5000}
                  step={100}
                  sx={{ color: 'primary.main' }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={filters.duration}
                  label="Duration"
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                >
                  <MenuItem value="">All Durations</MenuItem>
                  {durations.map(duration => (
                    <MenuItem key={duration} value={duration}>{duration}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Search Destination"
                value={filters.destination}
                onChange={(e) => handleFilterChange('destination', e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={filters.sortBy}
                    label="Sort By"
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  >
                    <MenuItem value="popular">Most Popular</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                  </Select>
                </FormControl>
                
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  startIcon={<Clear />}
                >
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Active filters display */}
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {filters.duration && (
              <Chip
                label={`Duration: ${filters.duration}`}
                onDelete={() => handleFilterChange('duration', '')}
                color="primary"
              />
            )}
            {filters.destination && (
              <Chip
                label={`Destination: ${filters.destination}`}
                onDelete={() => handleFilterChange('destination', '')}
                color="primary"
              />
            )}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) && (
              <Chip
                label={`Price: $${filters.priceRange[0]} - $${filters.priceRange[1]}`}
                onDelete={() => handleFilterChange('priceRange', [0, 5000])}
                color="primary"
              />
            )}
          </Box>
        </Box>

        {/* Results count */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Showing {filteredPackages.length} packages
        </Typography>

        {/* Packages Grid */}
        <Grid container spacing={4}>
          {paginatedPackages.map((pkg, index) => (
            <Grid item key={pkg.id} xs={12} md={6} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PackageCard package={pkg} />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {filteredPackages.length > packagesPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={Math.ceil(filteredPackages.length / packagesPerPage)}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
              size="large"
            />
          </Box>
        )}

        {/* No results message */}
        {filteredPackages.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No packages found matching your criteria
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your filters or search terms
            </Typography>
            <Button
              variant="contained"
              onClick={handleClearFilters}
              startIcon={<Clear />}
            >
              Clear All Filters
            </Button>
          </Box>
        )}
      </motion.div>
    </Container>
  )
}

export default ToursPage