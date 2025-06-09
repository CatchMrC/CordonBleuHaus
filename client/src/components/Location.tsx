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
            Freiburger Str. 313
          </Typography>
          <Typography variant="body1" gutterBottom>
            79539 Lörrach, Deutschland
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
            Monday - Friday: 11:00 - 22:00
          </Typography>
          <Typography variant="body1" gutterBottom>
            Saturday: 11:00 - 23:00
          </Typography>
          <Typography variant="body1">
            Sunday: 12:00 - 21:00
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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2686.7!2d7.6647!3d47.6157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791b85d9e0a0f13%3A0x1!2sFreiburger%20Str.%20313%2C%2079539%20L%C3%B6rrach%2C%20Deutschland!5e0!3m2!1sen!2s!4v1647043087964!5m2!1sen!2s"
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
