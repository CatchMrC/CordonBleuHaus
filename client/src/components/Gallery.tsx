import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Container,
  ImageList,
  ImageListItem,
  Modal,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  rows?: number;
  cols?: number;
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Elegant dining room
    alt: 'Restaurant Interior',
    title: 'Elegant Dining Room',
    rows: 2,
    cols: 2
  },
  {
    id: '2',
    src: 'https://plus.unsplash.com/premium_photo-1675367606971-363cda30578c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlbmNoJTIwY3VzaW5lfGVufDB8fDB8fHww', // French cuisine
    alt: 'French Cuisine',
    title: 'Signature Dish'
  },
  {
    id: '3',
    src: 'https://plus.unsplash.com/premium_photo-1661506383340-4deb1242daa8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Wine cellar
    alt: 'Wine Cellar',
    title: 'Our Wine Collection'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1719329469159-5f01f922fe80?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Chef at work
    alt: 'Chef at Work',
    title: 'Our Master Chef'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1633997454158-71c87e49cd31?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // French dessert
    alt: 'French Dessert',
    title: 'Sweet Delights'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1720673749084-0a51bdf07216?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Restaurant terrace
    alt: 'Restaurant Terrace',
    title: 'Outdoor Dining'
  }
];

const Gallery: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleOpen = (image: GalleryImage) => {
    setSelectedImage(image);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }} id="gallery">
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 6 }}
        >
          Our Gallery
        </Typography>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ImageList
            variant="masonry"
            cols={4}
            gap={16}
            sx={{
              overflow: 'hidden',
              '& .MuiImageListItem-root': {
                overflow: 'hidden',
                borderRadius: 3,
                boxShadow: 3,
                cursor: 'pointer',
                transition: 'box-shadow 0.3s',
                '&:hover': {
                  boxShadow: 8
                }
              }
            }}
          >
            {galleryImages.map((image) => (
              <motion.div key={image.id} variants={itemVariants}>
                <ImageListItem
                  rows={image.rows}
                  cols={image.cols}
                  onClick={() => handleOpen(image)}
                  sx={{
                    position: 'relative',
                    '&:hover img': {
                      transform: 'scale(1.07)'
                    },
                    '& img': {
                      transition: 'transform 0.3s ease-in-out',
                      borderRadius: 2
                    }
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                      color: 'white',
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8
                    }}
                  >
                    <Typography variant="subtitle1">
                      {image.title}
                    </Typography>
                  </Box>
                </ImageListItem>
              </motion.div>
            ))}
          </ImageList>
        </motion.div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300
          }}>
            <Box sx={{ position: 'relative', maxWidth: 800, width: '90vw' }}>
              <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8, color: 'white', zIndex: 1 }}>
                <CloseIcon />
              </IconButton>
              {selectedImage && (
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  style={{ width: '100%', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                />
              )}
              {selectedImage && (
                <Typography variant="h5" color="white" align="center" sx={{ mt: 2, textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
                  {selectedImage.title}
                </Typography>
              )}
            </Box>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default Gallery; 