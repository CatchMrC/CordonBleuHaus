import React from 'react';
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
  id: string;
  title: string;
  description: string;
  image: string;
  validUntil: string;
  type: 'promotion' | 'event';
}

const offers: Offer[] = [
  {
    id: '1',
    title: 'Weekend Brunch Special',
    description: 'Enjoy our special weekend brunch menu with complimentary mimosa. Available every Saturday and Sunday from 10 AM to 2 PM.',
    image: 'https://images.unsplash.com/photo-1504674900247-1a781979e8c0?auto=format&fit=crop&w=600&q=80',
    validUntil: '2024-12-31',
    type: 'promotion'
  },
  {
    id: '2',
    title: 'Wine Tasting Evening',
    description: 'Join us for an exclusive wine tasting event featuring selected French wines paired with artisanal cheeses.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    validUntil: '2024-06-30',
    type: 'event'
  },
  {
    id: '3',
    title: 'Early Bird Special',
    description: '20% off on all main courses when dining between 5 PM and 6:30 PM, Monday through Thursday.',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80',
    validUntil: '2024-12-31',
    type: 'promotion'
  }
];

const SpecialOffers: React.FC = () => {
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
              <motion.div key={offer.id} variants={itemVariants}>
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