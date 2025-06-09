import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Container,
  Paper,
  IconButton,
  Alert
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Restaurant as RestaurantIcon,
  DirectionsCar as DirectionsIcon
} from '@mui/icons-material';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const Contact: React.FC = () => {
  const [mapError, setMapError] = useState<string | null>(null);

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

  const mapContainerStyle = {
    width: '100%',
    height: '550px'
  };

  const center = {
    lat: 47.6157, // Lörrach coordinates
    lng: 7.6647
  };

  const onMapError = () => {
    setMapError('Failed to load Google Maps. Using alternative map view.');
  };

  // Remove automatic timeout - let Google Maps load naturally

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
                  height: '550px', // Increased height for better content fit
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  bgcolor: 'background.paper'
                }}
              >
                {/* Header */}
                <Box sx={{ 
                  p: { xs: 3, md: 4 }, 
                  borderBottom: 1,
                  borderColor: 'divider',
                  textAlign: 'center'
                }}>
                  <Typography variant="h5" fontWeight="600" color="text.primary" sx={{ mb: 1 }}>
                    Visit Us
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We'd love to see you at our restaurant
                  </Typography>
                </Box>

                {/* Contact Information */}
                <Box sx={{ 
                  p: { xs: 3, md: 4 }, 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  gap: 3
                }}>
                  <motion.div variants={itemVariants}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 3
                    }}>
                      <Box sx={{ 
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        mt: 0.5
                      }}>
                        <LocationIcon sx={{ color: 'white', fontSize: 24 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="600" color="text.primary" sx={{ mb: 0.5 }}>
                          Address
                        </Typography>
                        <Typography variant="body2"  color="text.secondary" lineHeight={1.5}>
                          Corndon Bleu Haus<br /> 
                          Freiburger Str. 313, 79539 Lörrach<br />
                          Deutschland
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 3
                    }}>
                      <Box sx={{ 
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: 'success.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        mt: 0.5
                        
                      }}>
                        <PhoneIcon sx={{ color: 'white', fontSize: 24 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="600" color="text.primary" sx={{ mb: 0.5 }}>
                          Phone
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          +49 7621 123456
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 3
                    }}>
                      <Box sx={{ 
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: 'info.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        mt: 0.5
                      }}>
                        <EmailIcon sx={{ color: 'white', fontSize: 24 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="600" color="text.primary" sx={{ mb: 0.5 }}>
                          Email
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          info@cordonbleuhaus.de
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 3
                    }}>
                      <Box sx={{ 
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: 'warning.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        mt: 0.5
                      }}>
                        <TimeIcon sx={{ color: 'white', fontSize: 24 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="600" color="text.primary" sx={{ mb: 0.5 }}>
                          Opening Hours
                        </Typography>
                        <Typography variant="body2" color="text.secondary" lineHeight={1.5}>
                          Mon - Fri: 11:00 - 22:00<br />
                          Saturday: 11:00 - 23:00<br />
                          Sunday: 12:00 - 21:00
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Box>
              </Paper>
            </Box>

            <Box sx={{ flex: 1 }}>
              <motion.div variants={itemVariants}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    height: '550px', // Match contact section height exactly
                    overflow: 'hidden',
                    borderRadius: 2,
                    position: 'relative'
                  }}
                >
                  <Box sx={{ width: '100%', height: '100%' }}>
                    <iframe
                      title="Restaurant Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2686.724!2d7.6647!3d47.6157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791b85bbfc65ab3%3A0xa3b8b58e18f17b92!2sFreiburger%20Str.%20313%2C%2079539%20L%C3%B6rrach%2C%20Germany!5e0!3m2!1sen!2s!4v1647043087964!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </Box>
                  {/* Backup: Keep the LoadScript for future use if API gets fixed */}
                  {false && (
                    <LoadScript 
                      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
                      onError={onMapError}
                    >
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={15}
                        options={{
                          zoomControl: true,
                          streetViewControl: true,
                          mapTypeControl: true,
                          fullscreenControl: true,
                          styles: [
                            {
                              featureType: "poi",
                              elementType: "labels",
                              stylers: [{ visibility: "off" }]
                            }
                          ]
                        }}
                      >
                        <Marker 
                          position={center}
                          title="Cordon Bleu Haus"
                        />
                      </GoogleMap>
                    </LoadScript>
                  )}
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
