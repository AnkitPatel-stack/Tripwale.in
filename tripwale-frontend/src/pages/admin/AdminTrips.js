import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Switch,
  FormControlLabel,
  Alert,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  Image,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import toast from 'react-hot-toast';

const AdminTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    type: 'domestic',
    duration: { days: 3, nights: 2 },
    price: { perPerson: 0, childDiscount: 0, seniorDiscount: 0 },
    destinations: [''],
    inclusions: [''],
    exclusions: [''],
    startDate: '',
    endDate: '',
    maxPeople: 20,
    availableSeats: 20,
    isFeatured: false,
    isActive: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
    fetchCategories();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await api.get('/trips');
      setTrips(response.data.data);
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

  const handleOpenDialog = (trip = null) => {
    if (trip) {
      setFormData({
        title: trip.title || '',
        description: trip.description || '',
        shortDescription: trip.shortDescription || '',
        category: trip.category?._id || '',
        type: trip.type || 'domestic',
        duration: trip.duration || { days: 3, nights: 2 },
        price: trip.price || { perPerson: 0, childDiscount: 0, seniorDiscount: 0 },
        destinations: trip.destinations || [''],
        inclusions: trip.inclusions || [''],
        exclusions: trip.exclusions || [''],
        startDate: trip.startDate ? new Date(trip.startDate).toISOString().split('T')[0] : '',
        endDate: trip.endDate ? new Date(trip.endDate).toISOString().split('T')[0] : '',
        maxPeople: trip.maxPeople || 20,
        availableSeats: trip.availableSeats || 20,
        isFeatured: trip.isFeatured || false,
        isActive: trip.isActive !== undefined ? trip.isActive : true,
      });
      setSelectedTrip(trip);
    } else {
      setFormData({
        title: '',
        description: '',
        shortDescription: '',
        category: '',
        type: 'domestic',
        duration: { days: 3, nights: 2 },
        price: { perPerson: 0, childDiscount: 0, seniorDiscount: 0 },
        destinations: [''],
        inclusions: [''],
        exclusions: [''],
        startDate: '',
        endDate: '',
        maxPeople: 20,
        availableSeats: 20,
        isFeatured: false,
        isActive: true,
      });
      setSelectedTrip(null);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTrip(null);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        ...formData,
        duration: {
          days: parseInt(formData.duration.days),
          nights: parseInt(formData.duration.nights),
        },
        price: {
          perPerson: parseInt(formData.price.perPerson),
          childDiscount: parseInt(formData.price.childDiscount),
          seniorDiscount: parseInt(formData.price.seniorDiscount),
        },
        destinations: formData.destinations.filter(d => d.trim() !== ''),
        inclusions: formData.inclusions.filter(i => i.trim() !== ''),
        exclusions: formData.exclusions.filter(e => e.trim() !== ''),
        maxPeople: parseInt(formData.maxPeople),
        availableSeats: parseInt(formData.availableSeats),
      };

      if (selectedTrip) {
        await api.put(`/trips/${selectedTrip._id}`, data);
        toast.success('Trip updated successfully!');
      } else {
        await api.post('/trips', data);
        toast.success('Trip created successfully!');
      }

      fetchTrips();
      handleCloseDialog();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/trips/${selectedTrip._id}`);
      toast.success('Trip deleted successfully!');
      fetchTrips();
      setDeleteDialogOpen(false);
      setSelectedTrip(null);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Delete failed');
    }
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

  const columns = [
    { 
      field: 'title', 
      headerName: 'Trip Title', 
      width: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.type}
          </Typography>
        </Box>
      ),
    },
    { 
      field: 'category', 
      headerName: 'Category', 
      width: 150,
      renderCell: (params) => params.row.category?.name || '-',
    },
    { 
      field: 'duration', 
      headerName: 'Duration', 
      width: 120,
      renderCell: (params) => `${params.value?.days}D/${params.value?.nights}N`,
    },
    { 
      field: 'price', 
      headerName: 'Price', 
      width: 120,
      renderCell: (params) => `₹${params.value?.perPerson?.toLocaleString()}`,
    },
    { 
      field: 'availableSeats', 
      headerName: 'Seats', 
      width: 100,
      renderCell: (params) => (
        <Typography 
          variant="body2" 
          color={params.value === 0 ? 'error' : 'inherit'}
        >
          {params.value}/{params.row.maxPeople}
        </Typography>
      ),
    },
    { 
      field: 'isFeatured', 
      headerName: 'Featured', 
      width: 100,
      renderCell: (params) => (
        params.value ? 
          <CheckCircle color="success" /> : 
          <Cancel color="disabled" />
      ),
    },
    { 
      field: 'isActive', 
      headerName: 'Status', 
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => navigate(`/trips/${params.row._id}`)}
            title="View"
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleOpenDialog(params.row)}
            title="Edit"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              setSelectedTrip(params.row);
              setDeleteDialogOpen(true);
            }}
            title="Delete"
            color="error"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={fetchTrips} />;

  return (
    <>
      <Helmet>
        <title>Manage Trips | Tripwale.in Admin</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Manage Trips
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create, edit, and manage all trips
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add New Trip
          </Button>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" color="primary">
                {trips.length}
              </Typography>
              <Typography variant="body2">Total Trips</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" color="secondary">
                {trips.filter(t => t.isFeatured).length}
              </Typography>
              <Typography variant="body2">Featured Trips</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" color="success">
                {trips.filter(t => t.isActive).length}
              </Typography>
              <Typography variant="body2">Active Trips</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" color="warning">
                {trips.reduce((sum, t) => sum + (t.availableSeats || 0), 0)}
              </Typography>
              <Typography variant="body2">Available Seats</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Trips Table */}
        <Paper sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={trips}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row._id}
          />
        </Paper>
      </Container>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedTrip ? 'Edit Trip' : 'Add New Trip'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Trip Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Short Description"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  multiline
                  rows={2}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Trip Type</InputLabel>
                  <Select
                    value={formData.type}
                    label="Trip Type"
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    {tripTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration (Days)"
                  type="number"
                  value={formData.duration.days}
                  onChange={(e) => setFormData({
                    ...formData,
                    duration: { ...formData.duration, days: e.target.value }
                  })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration (Nights)"
                  type="number"
                  value={formData.duration.nights}
                  onChange={(e) => setFormData({
                    ...formData,
                    duration: { ...formData.duration, nights: e.target.value }
                  })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Price per Person (₹)"
                  type="number"
                  value={formData.price.perPerson}
                  onChange={(e) => setFormData({
                    ...formData,
                    price: { ...formData.price, perPerson: e.target.value }
                  })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Child Discount (₹)"
                  type="number"
                  value={formData.price.childDiscount}
                  onChange={(e) => setFormData({
                    ...formData,
                    price: { ...formData.price, childDiscount: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Senior Discount (₹)"
                  type="number"
                  value={formData.price.seniorDiscount}
                  onChange={(e) => setFormData({
                    ...formData,
                    price: { ...formData.price, seniorDiscount: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Maximum People"
                  type="number"
                  value={formData.maxPeople}
                  onChange={(e) => setFormData({ ...formData, maxPeople: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Available Seats"
                  type="number"
                  value={formData.availableSeats}
                  onChange={(e) => setFormData({ ...formData, availableSeats: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Destinations (comma separated)"
                  value={formData.destinations.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData,
                    destinations: e.target.value.split(',').map(d => d.trim())
                  })}
                  placeholder="e.g., Mumbai, Goa, Pune"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Inclusions (one per line)"
                  value={formData.inclusions.join('\n')}
                  onChange={(e) => setFormData({
                    ...formData,
                    inclusions: e.target.value.split('\n')
                  })}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Exclusions (one per line)"
                  value={formData.exclusions.join('\n')}
                  onChange={(e) => setFormData({
                    ...formData,
                    exclusions: e.target.value.split('\n')
                  })}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    />
                  }
                  label="Featured Trip"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedTrip ? 'Update Trip' : 'Create Trip'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            Are you sure you want to delete this trip? This action cannot be undone.
          </Alert>
          {selectedTrip && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Trip:</strong> {selectedTrip.title}
              </Typography>
              <Typography variant="body2">
                <strong>Type:</strong> {selectedTrip.type}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminTrips;