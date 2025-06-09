import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Tabs, 
  Tab, 
  Chip,
  Badge,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { MenuItem, Category } from '../data/menuData';

const chefSpecialIds = ['7']; // Highlight Coq au Vin as Chef's Special (note: dynamic loading for specials recommended for production)

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuCategories, setMenuCategories] = useState<Category[]>([]); // Store Category objects
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false); // New state for dialog visibility
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null); // New state for selected item

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu-items');
        const data: MenuItem[] = await response.json();
        setMenuItems(data);
        
        // Extract unique categories from fetched menu items
        const uniqueCategoriesMap = new Map<string, Category>();
        // Only add categories that have at least one active item
        data.forEach(item => {
          if (item.active && item.category && !uniqueCategoriesMap.has(item.category._id)) {
            uniqueCategoriesMap.set(item.category._id, item.category);
          }
        });
        const categoriesArray = Array.from(uniqueCategoriesMap.values());
        setMenuCategories(categoriesArray);

        if (categoriesArray.length > 0) {
          // Set initial selected category to the first active category if no category is selected
          if (!selectedCategory) {
            setSelectedCategory(categoriesArray[0].name);
          }
        }
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, [selectedCategory]); // Add selectedCategory to dependencies to re-fetch if it changes externally

  const filteredItems = menuItems.filter(item => 
    item.active && item.category?.name === selectedCategory
  );

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
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const handleOpenDialog = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMenuItem(null);
  };

  return (
    <Box 
      sx={{
        py: 10, 
        bgcolor: 'background.default', 
        borderRadius: 4, 
        mb: 8,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h3" gutterBottom component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          align="center"
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          Our Menu
        </Typography>

        <Tabs
          value={selectedCategory}
          onChange={(_, newValue) => setSelectedCategory(newValue as string)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            mb: 5, 
            borderRadius: 2, 
            bgcolor: 'background.paper', 
            boxShadow: 2,
            width: '100%',
            '& .MuiTabs-flexContainer': {
              justifyContent: 'center',
            }
          }}
        >
          {menuCategories.map((category) => (
            <Tab
              key={category._id} // Use MongoDB _id for key
              label={category.name} // Display category name
              value={category.name} // Set value to category name
              component={motion.div}
              whileHover={{ scale: 1.08 }}
              sx={{ fontWeight: 'bold', fontSize: '1.1rem', px: 4 }}
            />
          ))}
        </Tabs>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr',
              lg: '1fr 1fr 1fr 1fr'
            },
            gap: 5,
            width: '100%',
            mt: 2,
            justifyContent: 'center'
          }}>
            {filteredItems.map((item) => (
              <motion.div key={item._id} variants={itemVariants}>
                <Badge
                  color="secondary"
                  badgeContent={chefSpecialIds.includes(item._id) ? <StarIcon fontSize="small" /> : null}
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  sx={{ width: '100%' }}
                  overlap="rectangular"
                >
                  <Card 
                    sx={{
                      height: { xs: 'auto', sm: 250 },
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      borderRadius: 4,
                      boxShadow: 6,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 12,
                        cursor: 'pointer' // Indicate interactivity
                      },
                      bgcolor: 'background.paper',
                    }}
                    onClick={() => handleOpenDialog(item)} // Add onClick to open dialog
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{
                        width: { xs: '100%', sm: 200 },
                        height: { xs: 200, sm: '100%' },
                        objectFit: 'cover',
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: { sm: 16, xs: 0 },
                        borderTopRightRadius: { xs: 16, sm: 0 }
                      }}
                    />
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography 
                          gutterBottom 
                          variant="h6" 
                          component="div" 
                          sx={{
                            fontWeight: 'bold',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                      <Box>
                        <Chip 
                          label={`$${item.price.toFixed(2)}`}
                          color="primary"
                          sx={{ fontSize: '1.2rem', fontWeight: 'bold', px: 3, py: 1.5, mb: 1 }}
                        />
                        {chefSpecialIds.includes(item._id) && (
                          <Chip
                            icon={<StarIcon />}
                            label="Chef's Special"
                            color="secondary"
                            size="small"
                            sx={{ ml: 1, fontWeight: 'bold' }}
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Badge>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>

      {/* Menu Item Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{selectedMenuItem?.name}</DialogTitle>
        <DialogContent dividers>
          {selectedMenuItem && (
            <Box>
              <CardMedia
                component="img"
                image={selectedMenuItem.image}
                alt={selectedMenuItem.name}
                sx={{ width: '100%', maxHeight: 300, objectFit: 'cover', mb: 2, borderRadius: 2 }}
              />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {selectedMenuItem.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {selectedMenuItem.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip 
                  label={`$${selectedMenuItem.price.toFixed(2)}`}
                  color="primary"
                  sx={{ fontSize: '1.3rem', fontWeight: 'bold', px: 3, py: 1.5 }}
                />
                {chefSpecialIds.includes(selectedMenuItem._id) && (
                  <Chip
                    icon={<StarIcon />}
                    label="Chef's Special"
                    color="secondary"
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                )}
              </Box>
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

export default Menu;
