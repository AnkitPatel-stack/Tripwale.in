import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Alert,
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Edit,
  Delete,
  Visibility,
  CheckCircle,
  Pending,
  Cancel,
  Refresh,
  FilterList,
  Receipt,
  CalendarToday,
  Person,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { DataGrid } from '@mui/x-data-grid';
import api from '../../services/api';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import toast from 'react-hot-toast';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [statusForm, setStatusForm] = useState({
    status: '',
    paymentStatus: '',
    notes: '',
  });
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
  });

  useEffect(() => {
    fetchBookings();
  }, [filters]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Note: You need to implement the bookings endpoint in backend
      // For now, we'll use a mock or show message
      setBookings([]);
      setLoading(false);
      // Uncomment when endpoint is ready:
      // const response = await api.get('/bookings');
      // setBookings(response.data.data);
      // setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await api.put(`/bookings/${selectedBooking._id}/status`, statusForm);
      toast.success('Booking status updated!');
      fetchBookings();
      setStatusDialogOpen(false);
      setSelectedBooking(null);
      setStatusForm({ status: '', paymentStatus: '', notes: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Update failed');
    }
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      pending: { color: 'warning', icon: <Pending />, label: 'Pending' },
      confirmed: { color: 'success', icon: <CheckCircle />, label: 'Confirmed' },
      cancelled: { color: 'error', icon: <Cancel />, label: 'Cancelled' },
      completed: { color: 'info', icon: <CheckCircle />, label: 'Completed' },
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color}
        size="small"
      />
    );
  };

  const getPaymentStatusChip = (status) => {
    const statusConfig = {
      pending: { color: 'warning', label: 'Pending' },
      partial: { color: 'info', label: 'Partial' },
      paid: { color: 'success', label: 'Paid' },
      refunded: { color: 'error', label: 'Refunded' },
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Chip
        label={config.label}
        color={config.color}
        size="small"
      />
    );
  };

  const columns = [
    { 
      field: 'bookingId', 
      headerName: 'Booking ID', 
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2">
          #{params.row._id?.substring(0, 8)}
        </Typography>
      ),
    },
    { 
      field: 'customer', 
      headerName: 'Customer', 
      width: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {params.row.contactPerson?.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.contactPerson?.email}
          </Typography>
        </Box>
      ),
    },
    { 
      field: 'trip', 
      headerName: 'Trip', 
      width: 200,
      renderCell: (params) => params.row.trip?.title || '-',
    },
    { 
      field: 'bookingDate', 
      headerName: 'Booking Date', 
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    { 
      field: 'travelDate', 
      headerName: 'Travel Date', 
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    { 
      field: 'amount', 
      headerName: 'Amount', 
      width: 120,
      renderCell: (params) => `₹${params.row.finalAmount?.toLocaleString()}`,
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      renderCell: (params) => getStatusChip(params.value),
    },
    { 
      field: 'paymentStatus', 
      headerName: 'Payment', 
      width: 130,
      renderCell: (params) => getPaymentStatusChip(params.value),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => {
              setSelectedBooking(params.row);
              setDetailsDialogOpen(true);
            }}
            title="View Details"
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              setSelectedBooking(params.row);
              setStatusForm({
                status: params.row.status,
                paymentStatus: params.row.paymentStatus,
                notes: params.row.notes || '',
              });
              setStatusDialogOpen(true);
            }}
            title="Update Status"
          >
            <Edit fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' },
  ];

  const paymentStatusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'partial', label: 'Partial' },
    { value: 'paid', label: 'Paid' },
    { value: 'refunded', label: 'Refunded' },
  ];

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={fetchBookings} />;

  return (
    <>
      <Helmet>
        <title>Manage Bookings | Tripwale.in Admin</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Manage Bookings
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View and manage all bookings
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={fetchBookings}
          >
            Refresh
          </Button>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" color="primary">
                {bookings.length}
              </Typography>
              <Typography variant="body2">Total Bookings</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" color="secondary">
                {bookings.filter(b => b.status === 'confirmed').length}
              </Typography>
              <Typography variant="body2">Confirmed</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" color="success">
                {bookings.filter(b => b.paymentStatus === 'paid').length}
              </Typography>
              <Typography variant="body2">Paid</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" color="warning">
                {bookings.filter(b => b.status === 'pending').length}
              </Typography>
              <Typography variant="body2">Pending</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Status"
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <MenuItem value="">All Status</MenuItem>
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Payment Status</InputLabel>
                <Select
                  value={filters.paymentStatus}
                  label="Payment Status"
                  onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
                >
                  <MenuItem value="">All Payment Status</MenuItem>
                  {paymentStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setFilters({ status: '', paymentStatus: '' })}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Bookings Table */}
        {bookings.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Receipt sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No Bookings Yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Bookings will appear here once customers start booking trips.
            </Typography>
            <Alert severity="info">
              Make sure the bookings endpoint is implemented in the backend.
            </Alert>
          </Paper>
        ) : (
          <Paper sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={bookings}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              checkboxSelection
              disableSelectionOnClick
              getRowId={(row) => row._id}
            />
          </Paper>
        )}
      </Container>

      {/* Status Update Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Booking Status</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Booking ID: #{selectedBooking?._id?.substring(0, 8)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Customer: {selectedBooking?.contactPerson?.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusForm.status}
                    label="Status"
                    onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Payment Status</InputLabel>
                  <Select
                    value={statusForm.paymentStatus}
                    label="Payment Status"
                    onChange={(e) => setStatusForm({ ...statusForm, paymentStatus: e.target.value })}
                  >
                    {paymentStatusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={3}
                  value={statusForm.notes}
                  onChange={(e) => setStatusForm({ ...statusForm, notes: e.target.value })}
                  placeholder="Add any notes or comments..."
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleStatusUpdate} variant="contained">
            Update Status
          </Button>
        </DialogActions>
      </Dialog>

      {/* Booking Details Dialog */}
      <Dialog open={detailsDialogOpen} onClose={() => setDetailsDialogOpen(false)} maxWidth="md" fullWidth>
        {selectedBooking && (
          <>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ pt: 2 }}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Booking Information
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Booking ID</strong></TableCell>
                          <TableCell>#{selectedBooking._id?.substring(0, 8)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Booking Date</strong></TableCell>
                          <TableCell>
                            {new Date(selectedBooking.bookingDate).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Travel Date</strong></TableCell>
                          <TableCell>
                            {new Date(selectedBooking.travelDate).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell>{getStatusChip(selectedBooking.status)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Payment Status</strong></TableCell>
                          <TableCell>{getPaymentStatusChip(selectedBooking.paymentStatus)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Customer Details
                  </Typography>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body1" gutterBottom>
                        <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {selectedBooking.contactPerson?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        📧 {selectedBooking.contactPerson?.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        📞 {selectedBooking.contactPerson?.phone}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Trip Information
                  </Typography>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body1" gutterBottom>
                        {selectedBooking.trip?.title || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <CalendarToday sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                        Duration: {selectedBooking.trip?.duration?.days} days
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Price Breakdown
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Description</strong></TableCell>
                          <TableCell align="right"><strong>Quantity</strong></TableCell>
                          <TableCell align="right"><strong>Price</strong></TableCell>
                          <TableCell align="right"><strong>Total</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Adults</TableCell>
                          <TableCell align="right">{selectedBooking.numberOfPeople?.adults || 0}</TableCell>
                          <TableCell align="right">
                            ₹{selectedBooking.trip?.price?.perPerson?.toLocaleString() || 0}
                          </TableCell>
                          <TableCell align="right">
                            ₹{(selectedBooking.numberOfPeople?.adults * selectedBooking.trip?.price?.perPerson || 0).toLocaleString()}
                          </TableCell>
                        </TableRow>
                        {selectedBooking.numberOfPeople?.children > 0 && (
                          <TableRow>
                            <TableCell>Children (with discount)</TableCell>
                            <TableCell align="right">{selectedBooking.numberOfPeople?.children || 0}</TableCell>
                            <TableCell align="right">
                              ₹{(selectedBooking.trip?.price?.perPerson - selectedBooking.trip?.price?.childDiscount || 0).toLocaleString()}
                            </TableCell>
                            <TableCell align="right">
                              ₹{(selectedBooking.numberOfPeople?.children * 
                                (selectedBooking.trip?.price?.perPerson - selectedBooking.trip?.price?.childDiscount) || 0).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        )}
                        {selectedBooking.numberOfPeople?.seniors > 0 && (
                          <TableRow>
                            <TableCell>Seniors (with discount)</TableCell>
                            <TableCell align="right">{selectedBooking.numberOfPeople?.seniors || 0}</TableCell>
                            <TableCell align="right">
                              ₹{(selectedBooking.trip?.price?.perPerson - selectedBooking.trip?.price?.seniorDiscount || 0).toLocaleString()}
                            </TableCell>
                            <TableCell align="right">
                              ₹{(selectedBooking.numberOfPeople?.seniors * 
                                (selectedBooking.trip?.price?.perPerson - selectedBooking.trip?.price?.seniorDiscount) || 0).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        )}
                        <TableRow>
                          <TableCell colSpan={3} align="right"><strong>Total Amount</strong></TableCell>
                          <TableCell align="right">
                            <Typography variant="h6" color="primary">
                              ₹{selectedBooking.totalAmount?.toLocaleString() || 0}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                {selectedBooking.specialRequirements && (
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Special Requirements
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="body2">
                        {selectedBooking.specialRequirements}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default AdminBookings;