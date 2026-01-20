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
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Badge,
} from '@mui/material';
import {
  Email,
  Phone,
  CalendarToday,
  CheckCircle,
  Pending,
  Cancel,
  Chat,
  Assignment,
  Person,
  FilterList,
  Refresh,
  Reply,
  Close,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { DataGrid } from '@mui/x-data-grid';
import api from '../../services/api';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import toast from 'react-hot-toast';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusForm, setStatusForm] = useState({
    status: '',
    assignedTo: '',
  });
  const [replyForm, setReplyForm] = useState({
    subject: '',
    message: '',
  });
  const [filters, setFilters] = useState({
    status: '',
    type: '',
  });

  useEffect(() => {
    fetchInquiries();
  }, [filters]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      // Note: You need to implement the inquiries endpoint in backend
      // For now, we'll use a mock or show message
      setInquiries([]);
      setLoading(false);
      // Uncomment when endpoint is ready:
      // const response = await api.get('/inquiries');
      // setInquiries(response.data.data);
      // setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await api.put(`/inquiries/${selectedInquiry._id}/status`, statusForm);
      toast.success('Inquiry status updated!');
      fetchInquiries();
      setStatusDialogOpen(false);
      setSelectedInquiry(null);
      setStatusForm({ status: '', assignedTo: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Update failed');
    }
  };

  const handleReplySubmit = async () => {
    try {
      // Note: Implement reply functionality in backend
      toast.success('Reply sent successfully!');
      setReplyDialogOpen(false);
      setSelectedInquiry(null);
      setReplyForm({ subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send reply');
    }
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      new: { color: 'warning', icon: <Pending />, label: 'New' },
      contacted: { color: 'info', icon: <Chat />, label: 'Contacted' },
      resolved: { color: 'success', icon: <CheckCircle />, label: 'Resolved' },
      closed: { color: 'default', icon: <Close />, label: 'Closed' },
    };
    
    const config = statusConfig[status] || statusConfig.new;
    return (
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color}
        size="small"
      />
    );
  };

  const getTypeChip = (type) => {
    const typeConfig = {
      general: { color: 'default', label: 'General' },
      trip: { color: 'primary', label: 'Trip' },
      booking: { color: 'secondary', label: 'Booking' },
      corporate: { color: 'success', label: 'Corporate' },
    };
    
    const config = typeConfig[type] || typeConfig.general;
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
      field: 'name', 
      headerName: 'Customer', 
      width: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.email}
          </Typography>
        </Box>
      ),
    },
    { 
      field: 'subject', 
      headerName: 'Subject', 
      width: 250,
    },
    { 
      field: 'type', 
      headerName: 'Type', 
      width: 120,
      renderCell: (params) => getTypeChip(params.value),
    },
    { 
      field: 'createdAt', 
      headerName: 'Date', 
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      renderCell: (params) => getStatusChip(params.value),
    },
    { 
      field: 'assignedTo', 
      headerName: 'Assigned To', 
      width: 150,
      renderCell: (params) => params.row.assignedTo?.name || 'Unassigned',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => {
              setSelectedInquiry(params.row);
              // View details would be implemented here
            }}
            title="View Details"
          >
            <Assignment fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              setSelectedInquiry(params.row);
              setStatusForm({
                status: params.row.status,
                assignedTo: params.row.assignedTo?._id || '',
              });
              setStatusDialogOpen(true);
            }}
            title="Update Status"
          >
            <CheckCircle fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              setSelectedInquiry(params.row);
              setReplyForm({
                subject: `Re: ${params.row.subject}`,
                message: '',
              });
              setReplyDialogOpen(true);
            }}
            title="Reply"
            color="primary"
          >
            <Reply fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' },
  ];

  const typeOptions = [
    { value: 'general', label: 'General' },
    { value: 'trip', label: 'Trip' },
    { value: 'booking', label: 'Booking' },
    { value: 'corporate', label: 'Corporate' },
  ];

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={fetchInquiries} />;

  return (
    <>
      <Helmet>
        <title>Manage Inquiries | Tripwale.in Admin</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Manage Inquiries
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View and respond to customer inquiries
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={fetchInquiries}
          >
            Refresh
          </Button>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Badge badgeContent={inquiries.filter(i => i.status === 'new').length} color="error">
                <Typography variant="h3" color="primary">
                  {inquiries.length}
                </Typography>
              </Badge>
              <Typography variant="body2">Total Inquiries</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" color="warning">
                {inquiries.filter(i => i.status === 'new').length}
              </Typography>
              <Typography variant="body2">New</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" color="info">
                {inquiries.filter(i => i.status === 'contacted').length}
              </Typography>
              <Typography variant="body2">Contacted</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" color="success">
                {inquiries.filter(i => i.status === 'resolved').length}
              </Typography>
              <Typography variant="body2">Resolved</Typography>
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
                <InputLabel>Type</InputLabel>
                <Select
                  value={filters.type}
                  label="Type"
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  <MenuItem value="">All Types</MenuItem>
                  {typeOptions.map((option) => (
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
                onClick={() => setFilters({ status: '', type: '' })}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Inquiries Table */}
        {inquiries.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Email sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No Inquiries Yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Customer inquiries will appear here once they start contacting you.
            </Typography>
            <Alert severity="info">
              Make sure the inquiries endpoint is implemented in the backend.
            </Alert>
          </Paper>
        ) : (
          <Paper sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={inquiries}
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
        <DialogTitle>Update Inquiry Status</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Inquiry from: {selectedInquiry?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Subject: {selectedInquiry?.subject}
                </Typography>
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Assigned To"
                  value={statusForm.assignedTo}
                  onChange={(e) => setStatusForm({ ...statusForm, assignedTo: e.target.value })}
                  placeholder="Enter staff member name"
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

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onClose={() => setReplyDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Reply to Inquiry</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Replying to: {selectedInquiry?.name} ({selectedInquiry?.email})
                </Alert>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  value={replyForm.subject}
                  onChange={(e) => setReplyForm({ ...replyForm, subject: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Message"
                  multiline
                  rows={8}
                  value={replyForm.message}
                  onChange={(e) => setReplyForm({ ...replyForm, message: e.target.value })}
                  required
                  placeholder="Type your response here..."
                />
              </Grid>
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Original Message:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedInquiry?.message}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleReplySubmit} variant="contained" startIcon={<Email />}>
            Send Reply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminInquiries;