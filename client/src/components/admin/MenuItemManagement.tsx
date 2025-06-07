import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Select,
  MenuItem as MuiMenuItem, // Renamed to avoid conflict with our MenuItem interface
  InputLabel,
  FormControl
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MenuItem, Category } from '../../data/menuData';

const MenuItemManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<number>(0);
  const [newItemImage, setNewItemImage] = useState('');
  const [newCategory, setNewCategory] = useState<string>(''); // Store category _id

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/menu-items');
      const data: MenuItem[] = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data: Category[] = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const handleOpenDialog = (item?: MenuItem) => {
    setCurrentMenuItem(item || null);
    setNewItemName(item ? item.name : '');
    setNewItemDescription(item ? item.description : '');
    setNewItemPrice(item ? item.price : 0);
    setNewItemImage(item ? item.image || '' : '');
    setNewCategory(item ? item.category._id : '');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentMenuItem(null);
    setNewItemName('');
    setNewItemDescription('');
    setNewItemPrice(0);
    setNewItemImage('');
    setNewCategory('');
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    const method = currentMenuItem ? 'PUT' : 'POST';
    const url = currentMenuItem 
      ? `http://localhost:5000/api/menu-items/${currentMenuItem._id}` 
      : 'http://localhost:5000/api/menu-items';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newItemName,
          description: newItemDescription,
          price: newItemPrice,
          image: newItemImage,
          category: newCategory,
        }),
      });

      if (response.ok) {
        fetchMenuItems();
        handleCloseDialog();
      } else {
        console.error('Failed to save menu item');
      }
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/menu-items/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchMenuItems();
      } else {
        console.error('Failed to delete menu item');
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Manage Menu Items</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
        Add New Menu Item
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category?.name}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {item.image && <img src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover' }} />}
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenDialog(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentMenuItem ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            type="text"
            fullWidth
            variant="standard"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(parseFloat(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Image URL"
            type="text"
            fullWidth
            variant="standard"
            value={newItemImage}
            onChange={(e) => setNewItemImage(e.target.value)}
          />
          <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel>Category</InputLabel>
            <Select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as string)}
              label="Category"
            >
              {categories.map((category) => (
                <MuiMenuItem key={category._id} value={category._id}>
                  {category.name}
                </MuiMenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>{currentMenuItem ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuItemManagement; 