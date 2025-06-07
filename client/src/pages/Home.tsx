import React from 'react';
import { motion } from 'framer-motion';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

const Home: React.FC = () => {
  const features = [
    {
      title: 'Authentic French Cuisine',
      description: 'Experience the rich flavors and traditions of French cooking.'
    },
    {
      title: 'Fine Dining Experience',
      description: 'Elegant atmosphere with exceptional service.'
    },
    {
      title: 'Fresh Ingredients',
      description: 'We source the finest local and imported ingredients.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Welcome to Cordon Bleu Haus - Fine French Dining</title>
        <meta name="description" content="Welcome to Cordon Bleu Haus, where we bring the authentic taste of France to your table. Experience our fine dining atmosphere and exquisite French cuisine." />
      </Helmet>
      
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Welcome to Cordon Bleu Haus
          </Typography>
          
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ 
              textAlign: 'center',
              mb: 6
            }}
          >
            Experience the art of French cuisine in an elegant setting
          </Typography>
        </motion.div>

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, 1fr)'
          },
          gap: 4
        }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Typography variant="h4" gutterBottom>
              Opening Hours
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Tuesday - Sunday: 11:00 AM - 10:00 PM<br />
              Monday: Closed
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </>
  );
};

export default Home;
