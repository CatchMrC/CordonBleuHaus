import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { format } from 'date-fns';

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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

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

  const handleOpenDialog = (offer: Offer) => {
    setSelectedOffer(offer);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOffer(null);
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
                      transform: 'translateY(-8px)',
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => handleOpenDialog(offer)}
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
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {offer.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      paragraph
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {offer.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Valid until: {format(new Date(offer.validUntil), 'PPP')}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{selectedOffer?.title}</DialogTitle>
        <DialogContent dividers>
          {selectedOffer && (
            <Box>
              <CardMedia
                component="img"
                image={selectedOffer.image}
                alt={selectedOffer.title}
                sx={{ width: '100%', maxHeight: 300, objectFit: 'cover', mb: 2, borderRadius: 2 }}
              />
              <Box sx={{ mb: 2 }}>
                <Chip 
                  label={selectedOffer.type === 'promotion' ? 'Special Offer' : 'Event'}
                  color={selectedOffer.type === 'promotion' ? 'primary' : 'secondary'}
                  size="medium"
                  sx={{ fontSize: '1.1rem', px: 2, py: 1 }}
                />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {selectedOffer.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {selectedOffer.description}
              </Typography>
              <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                Valid until: {format(new Date(selectedOffer.validUntil), 'PPP')}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SpecialOffers; 