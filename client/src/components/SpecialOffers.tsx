import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia,
  Chip,
  Container
} from '@mui/material';

interface Offer {
  _id: string;
  title: string;
  description: string;
  image: string;
  validUntil: string;
  type: 'promotion' | 'event';
  active: boolean;
}

const SpecialOffers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/special-offers');
        const data = await response.json();
        // Only show active offers
        setOffers(data.filter((offer: Offer) => offer.active));
      } catch (error) {
        console.error('Error fetching special offers:', error);
      }
    };

    fetchOffers();
  }, []);

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
    <Box sx={{ py: 8, bgcolor: 'grey.50' }} id="special-offers">
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 6 }}
        >
          Special Offers & Events
        </Typography>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)'
            },
            gap: 4
          }}>
            {offers.map((offer) => (
              <motion.div key={offer._id} variants={itemVariants}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={offer.image}
                    alt={offer.title}
                  />
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={offer.type === 'promotion' ? 'Special Offer' : 'Event'}
                        color={offer.type === 'promotion' ? 'primary' : 'secondary'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {offer.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {offer.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SpecialOffers; 