import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import CategoryManagement from '../components/admin/CategoryManagement';
import MenuItemManagement from '../components/admin/MenuItemManagement';

const AdminDashboard: React.FC = () => {
  return (
    <Container sx={{ mt: 10, mb: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Admin Dashboard
      </Typography>
      <Box sx={{ mt: 4 }}>
        <MenuItemManagement />
        
        <CategoryManagement />
      </Box>
    </Container>
  );
};

export default AdminDashboard; 