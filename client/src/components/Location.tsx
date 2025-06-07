import React from 'react';
import { motion } from 'framer-motion';
import { 
  Typography, 
  Box,
  Link
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Location: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <Typography variant="h4" component="h2" gutterBottom>
      Our Location
    </Typography>

    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        <LocationOnIcon sx={{ mr: 1, mt: 0.5 }} />
        <Box>
          <Typography variant="body1" gutterBottom>
            123 Gourmet Street
          </Typography>
          <Typography variant="body1" gutterBottom>
            Food City, FC 12345
          </Typography>
          <Link 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            color="primary"
            underline="hover"
          >
            Get Directions
          </Link>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <AccessTimeIcon sx={{ mr: 1, mt: 0.5 }} />
        <Box>
          <Typography variant="body1" gutterBottom>
            Tuesday - Sunday: 11:00 AM - 10:00 PM
          </Typography>
          <Typography variant="body1">
            Monday: Closed
          </Typography>
        </Box>
      </Box>
    </Box>

    <Box 
      sx={{ 
        width: '100%', 
        height: 300, 
        bgcolor: 'grey.200',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <iframe
        title="Restaurant Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970718!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1647043087964!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Box>
  </motion.div>
);

export default Location;
