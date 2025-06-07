import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Container,
  Paper,
  IconButton
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';

const Contact: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <Box sx={{ py: 8, bgcolor: 'grey.50' }} id="contact">
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 6 }}
        >
          Contact Us
        </Typography>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4
          }}>
            <Box sx={{ flex: 1 }}>
              <Paper 
                elevation={2}
                sx={{ 
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3
                }}
              >
                <motion.div variants={itemVariants}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocationIcon color="primary" />
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Address
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        123 Gourmet Street<br />
                        Culinary District<br />
                        Paris, France 75001
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PhoneIcon color="primary" />
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Phone
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        +33 1 23 45 67 89
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <EmailIcon color="primary" />
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Email
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        reservations@cordonbleuhaus.com
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TimeIcon color="primary" />
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Opening Hours
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Tuesday - Sunday: 11:30 AM - 10:30 PM<br />
                        Monday: Closed
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Paper>
            </Box>

            <Box sx={{ flex: 1 }}>
              <motion.div variants={itemVariants}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    overflow: 'hidden'
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1647881234567!5m2!1sen!2sfr"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Paper>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;
