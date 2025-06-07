import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Container,
  Avatar,
  Rating,
  Paper
} from '@mui/material';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Food Critic',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    comment: 'The attention to detail in every dish is remarkable. The fusion of traditional French cuisine with modern techniques creates an unforgettable dining experience.'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Regular Customer',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    comment: 'The wine selection is exceptional, and the sommelier\'s recommendations perfectly complement each course. A true gem in the city.'
  },
  {
    id: '3',
    name: 'Emma Thompson',
    role: 'Food Blogger',
    avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=100&q=80',
    rating: 4,
    comment: 'The ambiance is elegant yet comfortable. The service is impeccable, and the seasonal menu always brings delightful surprises.'
  }
];

const Testimonials: React.FC = () => {
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
    <Box sx={{ py: 8, bgcolor: 'background.paper' }} id="testimonials">
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 6 }}
        >
          What Our Guests Say
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
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.id} variants={itemVariants}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ width: 80, height: 80, mb: 2 }}
                  />
                  <Rating 
                    value={testimonial.rating} 
                    readOnly 
                    sx={{ mb: 2 }}
                  />
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    paragraph
                    sx={{ mb: 2, fontStyle: 'italic' }}
                  >
                    "{testimonial.comment}"
                  </Typography>
                  <Typography variant="h6" component="h3">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.role}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Testimonials; 