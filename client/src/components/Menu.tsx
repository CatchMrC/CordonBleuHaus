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
  Container
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { MenuItem, Category } from '../data/menuData';

const chefSpecialIds = ['7']; // Highlight Coq au Vin as Chef's Special (note: dynamic loading for specials recommended for production)

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuCategories, setMenuCategories] = useState<Category[]>([]); // Store Category objects
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu-items');
        const data: MenuItem[] = await response.json();
        setMenuItems(data);
        
        // Extract unique categories from fetched menu items
        const uniqueCategoriesMap = new Map<string, Category>();
        data.forEach(item => {
          if (item.category && !uniqueCategoriesMap.has(item.category._id)) {
            uniqueCategoriesMap.set(item.category._id, item.category);
          }
        });
        const categoriesArray = Array.from(uniqueCategoriesMap.values());
        setMenuCategories(categoriesArray);

        if (categoriesArray.length > 0) {
          setSelectedCategory(categoriesArray[0].name); // Set initial selected category by name
        }
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, []);

  const filteredItems = menuItems.filter(item => item.category?.name === selectedCategory); // Access category.name

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

  return (
    <Box sx={{ py: 10, bgcolor: 'background.default', borderRadius: 4, px: { xs: 1, md: 0 }, mb: 8 }}>
      <Container maxWidth="md">
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
          sx={{ mb: 5, maxWidth: 700, mx: 'auto', borderRadius: 2, bgcolor: 'background.paper', boxShadow: 2 }}
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
              md: '1fr 1fr'
            },
            gap: 5,
            maxWidth: 900,
            mx: 'auto',
            mt: 2
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
                      height: '100%',
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      borderRadius: 4,
                      boxShadow: 6,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 12
                      },
                      bgcolor: 'background.paper',
                      minHeight: 220
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{
                        width: { xs: '100%', sm: 180 },
                        height: { xs: 180, sm: '100%' },
                        objectFit: 'cover',
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: { sm: 16, xs: 0 },
                        borderTopRightRadius: { xs: 16, sm: 0 }
                      }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {item.description}
                      </Typography>
                      <Chip 
                        label={`$${item.price.toFixed(2)}`}
                        color="primary"
                        size="medium"
                        sx={{ fontSize: '1.1rem', fontWeight: 'bold', px: 2, py: 1, mb: 1 }}
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
                    </CardContent>
                  </Card>
                </Badge>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Menu;
