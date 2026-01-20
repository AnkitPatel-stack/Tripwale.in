import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from '@mui/material';
import {
  People,
  Flight,
  Receipt,
  TrendingUp,
  Email,
  CalendarToday,
  ArrowForward,
  CheckCircle,
  Pending,
  Cancel,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    trips: 0,
    bookings: 0,
    inquiries: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentInquiries, setRecentInquiries] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch trips
      const tripsRes = await api.get('/trips');
      
      // Fetch bookings (need to implement this endpoint)
      let bookings = [];
      try {
        const bookingsRes = await api.get('/bookings');
        bookings = bookingsRes.data.data || [];
      } catch (err) {
        console.log('Bookings endpoint not available yet');
      }
      
      // Fetch inquiries (need to implement this endpoint)
      let inquiries = [];
      try {
        const inquiriesRes = await api.get('/inquiries');
        inquiries = inquiriesRes.data.data || [];
      } catch (err) {
        console.log('Inquiries endpoint not available yet');
      }
      
      // Calculate stats
      const totalBookings = bookings.length;
      const totalInquiries = inquiries.length;
      const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
      
      setStats({
        trips: tripsRes.data.count || 0,
        bookings: totalBookings,
        inquiries: totalInquiries,
        revenue: totalRevenue,
      });
      
      setRecentBookings(bookings.slice(0, 5));
      setRecentInquiries(inquiries.slice(0, 5));
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Trips',
      value: stats.trips,
      icon: <Flight sx={{ fontSize: 40 }} />,
      color: 'primary',
      link: '/admin/trips',
    },
    {
      title: 'Total Bookings',
      value: stats.bookings,
      icon: <Receipt sx={{ fontSize: 40 }} />,
      color: 'secondary',
      link: '/admin/bookings',
    },
    {
      title: 'Active Inquiries',
      value: stats.inquiries,
      icon: <People sx={{ fontSize: 40 }} />,
      color: 'success',
      link: '/admin/inquiries',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: 'warning',
    },
  ];

  const getStatusChip = (status) => {
    const statusConfig = {
      pending: { color: 'warning', icon: <Pending /> },
      confirmed: { color: 'success', icon: <CheckCircle /> },
      cancelled: { color: 'error', icon: <Cancel /> },
      completed: { color: 'info', icon: <CheckCircle /> },
      new: { color: 'warning', icon: <Pending /> },
      contacted: { color: 'info', icon: <Email /> },
      resolved: { color: 'success', icon: <CheckCircle /> },
      closed: { color: 'default', icon: <Cancel /> },
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Chip
        icon={config.icon}
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        color={config.color}
        size="small"
      />
    );
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={fetchDashboardData} />;

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Tripwale.in</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Welcome */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome back, {user?.name}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your business today.
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: `${stat.color}.light`,
                        color: `${stat.color}.main`,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h3" component="div">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Typography variant="h6" component="div" gutterBottom>
                    {stat.title}
                  </Typography>
                  {stat.link && (
                    <Button
                      component={Link}
                      to={stat.link}
                      size="small"
                      endIcon={<ArrowForward />}
                      sx={{ mt: 1 }}
                    >
                      View Details
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity */}
        <Grid container spacing={3}>
          {/* Recent Bookings */}
          <Grid item xs={12} lg={6}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Recent Bookings
                </Typography>
                <Button
                  component={Link}
                  to="/admin/bookings"
                  size="small"
                  endIcon={<ArrowForward />}
                >
                  View All
                </Button>
              </Box>
              {recentBookings.length === 0 ? (
                <Typography color="text.secondary" align="center" py={3}>
                  No bookings yet
                </Typography>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Booking ID</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentBookings.map((booking) => (
                        <TableRow key={booking._id} hover>
                          <TableCell>
                            <Typography variant="body2">
                              {booking._id?.substring(0, 8)}...
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {booking.contactPerson?.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {booking.contactPerson?.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              ₹{booking.totalAmount?.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {getStatusChip(booking.status)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>

          {/* Recent Inquiries */}
          <Grid item xs={12} lg={6}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Recent Inquiries
                </Typography>
                <Button
                  component={Link}
                  to="/admin/inquiries"
                  size="small"
                  endIcon={<ArrowForward />}
                >
                  View All
                </Button>
              </Box>
              {recentInquiries.length === 0 ? (
                <Typography color="text.secondary" align="center" py={3}>
                  No inquiries yet
                </Typography>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentInquiries.map((inquiry) => (
                        <TableRow key={inquiry._id} hover>
                          <TableCell>
                            <Typography variant="body2">
                              {inquiry.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {inquiry.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {inquiry.subject}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(inquiry.createdAt).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {getStatusChip(inquiry.status)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="contained"
                component={Link}
                to="/admin/trips/new"
                sx={{ height: 60 }}
              >
                Add New Trip
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                component={Link}
                to="/admin/categories"
                sx={{ height: 60 }}
              >
                Manage Categories
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                component={Link}
                to="/admin/bookings"
                sx={{ height: 60 }}
              >
                View Bookings
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                component={Link}
                to="/admin/inquiries"
                sx={{ height: 60 }}
              >
                Manage Inquiries
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default AdminDashboard;