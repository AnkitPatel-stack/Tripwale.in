import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
} from '@mui/material';
import {
  Search,
  LocationOn,
  CalendarToday,
  FilterList,
  ArrowForward,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: '',
    type: searchParams.get('type') || '',
    category: '',
    sort: 'createdAt',
  });
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTrips();
    fetchCategories();
  }, [page, filters]);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      setFilters(prev => ({ ...prev, type }));
    }
  }, [searchParams]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 12,
        ...filters,
      }).toString();
      
      const response = await api.get(`/trips?${params}`);
      setTrips(response.data.data);
      setTotalPages(Math.ceil(response.data.total / 12));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const tripTypes = [
    { value: 'domestic', label: 'Domestic Tours' },
    { value: 'international', label: 'International Tours' },
    { value: 'religious', label: 'Religious Yatra' },
    { value: 'corporate', label: 'Corporate Trips' },
    { value: 'student', label: 'Student Tours' },
    { value: 'weekend', label: 'Weekend Getaways' },
    { value: 'oneday', label: 'One-Day Tours' },
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Newest First' },
    { value: 'price.perPerson', label: 'Price: Low to High' },
    { value: '-price.perPerson', label: 'Price: High to Low' },
    { value: 'duration.days', label: 'Duration: Short to Long' },
    { value: '-duration.days', label: 'Duration: Long to Short' },
  ];

  if (loading && trips.length === 0) return <Loading />;
  if (error) return <Error message={error} onRetry={fetchTrips} />;

  return (
    <>
      <Helmet>
        <title>All Trips | Tripwale.in</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Explore Our Trips
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Discover amazing destinations and create unforgettable memories with our expertly crafted tours
          </Typography>
        </Box>

        {/* Filters */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 3,
            mb: 4,
            boxShadow: 1,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search trips..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Trip Type</InputLabel>
                <Select
                  value={filters.type}
                  label="Trip Type"
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <MenuItem value="">All Types</MenuItem>
                  {tripTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  label="Category"
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={filters.sort}
                  label="Sort By"
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setFilters({
                  search: '',
                  type: '',
                  category: '',
                  sort: 'createdAt',
                })}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Trip Count */}
        <Typography variant="body1" sx={{ mb: 3 }}>
          Showing {trips.length} trips
        </Typography>

        {/* Trips Grid */}
        {trips.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No trips found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your filters or search terms
            </Typography>
            <Button
              variant="contained"
              onClick={() => setFilters({
                search: '',
                type: '',
                category: '',
                sort: 'createdAt',
              })}
            >
              Clear All Filters
            </Button>
          </Box>
        ) : (
          <>
            <Grid container spacing={4}>
              {trips.map((trip) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={trip._id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    {trip.images && trip.images.length > 0 ? (
                      <CardMedia
                        component="img"
                        height="200"
                        image={trip.images[0].url || '/trip-placeholder.jpg'}
                        alt={trip.title}
                        sx={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 200,
                          bgcolor: 'grey.200',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography color="text.secondary">No Image</Typography>
                      </Box>
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {trip.title}
                        </Typography>
                        {trip.isFeatured && (
                          <Chip label="Featured" color="secondary" size="small" />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {trip.shortDescription}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">
                            {trip.duration?.days}D/{trip.duration?.nights}N
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">
                            {trip.destinations?.length} Places
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="h6" color="primary">
                        ₹{trip.price?.perPerson?.toLocaleString()}
                        <Typography component="span" variant="body2" color="text.secondary">
                          /person
                        </Typography>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        component={Link}
                        to={`/trips/${trip._id}`}
                        endIcon={<ArrowForward />}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Stack>
              </Box>
            )}
          </>
        )}

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Can't find what you're looking for?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
            Contact us for custom tour packages tailored to your needs
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/contact"
          >
            Request Custom Package
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Trips;