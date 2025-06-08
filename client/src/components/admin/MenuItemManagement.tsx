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
  FormControl,
  Input,
  Stack,
  Slider,
  InputAdornment,
  Alert,
  Snackbar,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  FormControlLabel,
  Switch,
  Collapse,
  Divider,
  Checkbox
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 
  const [newCategory, setNewCategory] = useState<string>('');
  const [newItemActive, setNewItemActive] = useState<boolean>(true);
  // Add new state for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Advanced filter states
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);
  const [searchMode, setSearchMode] = useState<'partial' | 'exact'>('partial');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceFilterType, setPriceFilterType] = useState<'range' | 'preset'>('range');
  const [pricePreset, setPricePreset] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [statusFilters, setStatusFilters] = useState({
    active: true,
    featured: false,
    seasonal: false,
    specialOffer: false
  });

  // Price presets
  const pricePresets = [
    { label: 'Under $10', value: 'under10', range: [0, 10] },
    { label: '$10-$20', value: '10to20', range: [10, 20] },
    { label: '$20-$30', value: '20to30', range: [20, 30] },
    { label: 'Over $30', value: 'over30', range: [30, 100] }
  ];

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/menu-items');
      const data: MenuItem[] = await response.json();
      console.log('Fetched menu items:', data.map(item => ({
        name: item.name,
        category: item.category ? { _id: item.category._id, name: item.category.name } : null // Simplify category log
      })));
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data: Category[] = await response.json();
      console.log('Fetched categories:', data.map(cat => ({
        _id: cat._id,
        name: cat.name
      })));
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  // Add effect to log selected categories changes
  useEffect(() => {
    console.log('Selected categories changed:', selectedCategories);
  }, [selectedCategories]);

  const handleOpenDialog = (item?: MenuItem) => {
    setCurrentMenuItem(item || null);
    setNewItemName(item ? item.name : '');
    setNewItemDescription(item ? item.description : '');
    setNewItemPrice(item ? item.price : 0);
    setNewItemImage(item ? item.image || '' : '');
    setSelectedFile(null); 
    setNewCategory(item ? item.category._id : '');
    setNewItemActive(item ? item.active : true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentMenuItem(null);
    setNewItemName('');
    setNewItemDescription('');
    setNewItemPrice(0);
    setNewItemImage('');
    setSelectedFile(null); 
    setNewCategory('');
    setNewItemActive(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setNewItemImage(URL.createObjectURL(event.target.files[0])); // For instant preview, temporary URL
    } else {
      setSelectedFile(null);
      // Don't clear newItemImage here if user might manually type URL
    }
  };

  // Enhanced filter function
  const filteredMenuItems = menuItems.filter(item => {
    // Debug logging
    console.log('Filtering item:', {
      name: item.name,
      category: item.category,
      selectedCategories: selectedCategories
    });

    // Search filter
    const searchText = caseSensitive ? searchQuery : searchQuery.toLowerCase();
    const itemName = caseSensitive ? item.name : item.name.toLowerCase();
    const itemDesc = caseSensitive ? item.description : item.description.toLowerCase();
    
    const searchMatch = searchMode === 'exact' 
      ? itemName === searchText || itemDesc === searchText
      : itemName.includes(searchText) || itemDesc.includes(searchText);

    // Category filter - show all items if no categories selected
    const categoryMatch = selectedCategories.length === 0 || 
      (item.category && selectedCategories.includes(item.category._id as string)); // Explicit cast to string

    // Debug logging for category match
    console.log('Category match result:', {
      itemName: item.name,
      categoryId: item.category?._id,
      selectedCategories,
      categoryMatch
    });

    // Price filter
    let priceMatch = true;
    if (priceFilterType === 'preset' && pricePreset) {
      const preset = pricePresets.find(p => p.value === pricePreset);
      if (preset) {
        priceMatch = item.price >= preset.range[0] && item.price <= preset.range[1];
      }
    } else {
      priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1];
    }

    // Status filters - using AND logic
    const statusMatch = 
      (!statusFilters.active || item.active) &&
      (!statusFilters.featured || item.featured) &&
      (!statusFilters.seasonal || item.seasonal) &&
      (!statusFilters.specialOffer || item.specialOffer);

    return searchMatch && categoryMatch && priceMatch && statusMatch;
  });

  // Handle price range change
  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No token found. Please log in.');
      setShowError(true);
      return;
    }

    let imageUrlToSave = newItemImage;

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const uploadResponse = await fetch('http://localhost:5000/api/upload/image', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (uploadResponse.ok) {
          imageUrlToSave = `http://localhost:5000${uploadData.filePath}`;
        } else {
          setErrorMessage('Image upload failed: ' + (uploadData.message || 'Unknown error'));
          setShowError(true);
          return;
        }
      } catch (uploadError) {
        setErrorMessage('Error during image upload');
        setShowError(true);
        return;
      }
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
          image: imageUrlToSave,
          category: newCategory,
          active: newItemActive
        }),
      });

      if (response.ok) {
        fetchMenuItems();
        handleCloseDialog();
        setShowSuccess(true);
      } else {
        setErrorMessage('Failed to save menu item');
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage('Error saving menu item');
      setShowError(true);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No token found. Please log in.');
      setShowError(true);
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
        setShowSuccess(true);
      } else {
        setErrorMessage('Failed to delete menu item');
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage('Error deleting menu item');
      setShowError(true);
    }
  };

  const handleToggleActive = async (item: MenuItem) => {
    console.log('handleToggleActive: Initiating toggle for item:', item.name, 'Current active status:', item.active);
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No token found. Please log in.');
      setShowError(true);
      return;
    }

    try {
      const newActiveStatus = !item.active;
      console.log('handleToggleActive: Calculated new active status:', newActiveStatus);
      const response = await fetch(`http://localhost:5000/api/menu-items/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ active: newActiveStatus }), // Toggle active status
      });

      const responseData = await response.json(); // Get response data for more details

      if (response.ok) {
        console.log('handleToggleActive: API call successful. Response data:', responseData);
        fetchMenuItems(); // Re-fetch all items to update the table
        setShowSuccess(true);
      } else {
        console.error('handleToggleActive: API call failed. Status:', response.status, 'Response:', responseData);
        setErrorMessage('Failed to toggle active status: ' + (responseData.message || 'Unknown error'));
        setShowError(true);
      }
    } catch (error) {
      console.error('handleToggleActive: Error during API call:', error);
      setErrorMessage('Error toggling active status.');
      setShowError(true);
    }
  };

  // Handle select all checkbox
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = filteredMenuItems.map((item) => item._id);
      setSelectedItems(newSelecteds);
      return;
    }
    setSelectedItems([]);
  };

  // Handle individual item checkbox click
  const handleCheckboxClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelected = newSelected.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1),
      );
    }
    setSelectedItems(newSelected);
  };

  // Check if an item is selected
  const isSelected = (id: string) => selectedItems.indexOf(id) !== -1;

  // New handler for bulk setting active status
  const handleBulkSetActivationStatus = async (shouldActivate: boolean) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No token found. Please log in.');
      setShowError(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/menu-items/bulk-update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemIds: selectedItems,
          updates: { active: shouldActivate }
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(`Bulk ${shouldActivate ? 'activation' : 'deactivation'} successful. Response:`, responseData);
        setSelectedItems([]); // Clear selection after bulk action
        fetchMenuItems();
        setShowSuccess(true);
      } else {
        console.error(`Bulk ${shouldActivate ? 'activation' : 'deactivation'} failed. Status:`, response.status, 'Response:', responseData);
        setErrorMessage(`Failed to bulk ${shouldActivate ? 'activate' : 'deactivate'} items: ` + (responseData.message || 'Unknown error'));
        setShowError(true);
      }
    } catch (error) {
      console.error(`Error during bulk ${shouldActivate ? 'activation' : 'deactivation'} API call:`, error);
      setErrorMessage(`Error during bulk ${shouldActivate ? 'activation' : 'deactivation'}.`);
      setShowError(true);
    }
  };

  // New handler for bulk delete
  const handleBulkDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No token found. Please log in.');
      setShowError(true);
      return;
    }

    // Confirm before deleting
    if (!window.confirm(`Are you sure you want to delete ${selectedItems.length} selected items?`)) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/menu-items/bulk-delete', {
        method: 'POST', // Using POST for bulk delete to send body
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ itemIds: selectedItems }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Bulk delete successful. Response:', responseData);
        setSelectedItems([]); // Clear selection after bulk action
        fetchMenuItems();
        setShowSuccess(true);
      } else {
        console.error('Bulk delete failed. Status:', response.status, 'Response:', responseData);
        setErrorMessage('Failed to bulk delete items: ' + (responseData.message || 'Unknown error'));
        setShowError(true);
      }
    } catch (error) {
      console.error('Error during bulk delete API call:', error);
      setErrorMessage('Error during bulk delete.');
      setShowError(true);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Manage Menu Items</Typography>
      
      {/* Search and Filter Section */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Manage Menu Items</Typography>
        <Button
          variant="outlined"
          startIcon={showAdvancedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          Advanced Filters
        </Button>
      </Box>

      {/* Advanced Filters */}
      <Collapse in={showAdvancedFilters}>
        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>Advanced Filters</Typography>
          
          {/* Search Options */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Search Options</Typography>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <TextField
                fullWidth
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <ToggleButtonGroup
                value={searchMode}
                exclusive
                onChange={(e, value) => value && setSearchMode(value)}
                size="small"
              >
                <ToggleButton value="partial">Partial Match</ToggleButton>
                <ToggleButton value="exact">Exact Match</ToggleButton>
              </ToggleButtonGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={caseSensitive}
                    onChange={(e) => setCaseSensitive(e.target.checked)}
                  />
                }
                label="Case Sensitive"
              />
            </Stack>
          </Box>

          {/* Category Selection */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Categories</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {categories.map((category) => (
                <Chip
                  key={category._id}
                  label={category.name}
                  onClick={() => {
                    console.log('*** CLICK DETECTED ON CATEGORY CHIP ***', category.name, category._id);
                    console.log('Category chip clicked. Category ID:', category._id);
                    setSelectedCategories(prev => {
                      const newSelection = prev.includes(category._id)
                        ? prev.filter(id => id !== category._id)
                        : [...prev, category._id];
                      console.log('setSelectedCategories resulted in:', newSelection);
                      return newSelection;
                    });
                  }}
                  color={selectedCategories.includes(category._id) ? "primary" : "default"}
                  sx={{ m: 0.5 }}
                />
              ))}
              {selectedCategories.length > 0 && (
                <Chip
                  label="Clear All"
                  onClick={() => {
                    console.log('Clear All clicked.');
                    setSelectedCategories([]);
                  }}
                  color="secondary"
                  variant="outlined"
                  sx={{ m: 0.5 }}
                />
              )}
            </Stack>
            {selectedCategories.length > 0 && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Selected categories: {selectedCategories.length}
              </Typography>
            )}
          </Box>

          {/* Price Filter */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Price Range</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <ToggleButtonGroup
                value={priceFilterType}
                exclusive
                onChange={(e, value) => value && setPriceFilterType(value)}
                size="small"
              >
                <ToggleButton value="range">Custom Range</ToggleButton>
                <ToggleButton value="preset">Presets</ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            {priceFilterType === 'range' ? (
              <Box sx={{ px: 2, mt: 2 }}>
                <Slider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  marks={[
                    { value: 0, label: '$0' },
                    { value: 25, label: '$25' },
                    { value: 50, label: '$50' },
                    { value: 75, label: '$75' },
                    { value: 100, label: '$100' }
                  ]}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography>${priceRange[0]}</Typography>
                  <Typography>${priceRange[1]}</Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                <ToggleButtonGroup
                  value={pricePreset}
                  exclusive
                  onChange={(e, value) => setPricePreset(value)}
                  size="small"
                >
                  {pricePresets.map(preset => (
                    <ToggleButton key={preset.value} value={preset.value}>
                      {preset.label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
            )}
          </Box>

          {/* Status Filters */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Status</Typography>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={statusFilters.active}
                    onChange={(e) => setStatusFilters(prev => ({ ...prev, active: e.target.checked }))}
                  />
                }
                label="Active"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={statusFilters.featured}
                    onChange={(e) => setStatusFilters(prev => ({ ...prev, featured: e.target.checked }))}
                  />
                }
                label="Featured"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={statusFilters.seasonal}
                    onChange={(e) => setStatusFilters(prev => ({ ...prev, seasonal: e.target.checked }))}
                  />
                }
                label="Seasonal"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={statusFilters.specialOffer}
                    onChange={(e) => setStatusFilters(prev => ({ ...prev, specialOffer: e.target.checked }))}
                  />
                }
                label="Special Offer"
              />
            </Stack>
          </Box>
        </Box>
      </Collapse>

      {/* Add New Menu Item Button and Bulk Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
          Add New Menu Item
        </Button>
        {selectedItems.length > 0 && (
          <Stack direction="row" spacing={1}>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => handleBulkSetActivationStatus(true)} // Activate Selected
            >
              Activate Selected ({selectedItems.length})
            </Button>
            <Button 
              variant="outlined" 
              color="warning" // Use warning color for deactivation
              onClick={() => handleBulkSetActivationStatus(false)} // Deactivate Selected
            >
              Deactivate Selected ({selectedItems.length})
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleBulkDelete}
            >
              Delete Selected ({selectedItems.length})
            </Button>
          </Stack>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedItems.length > 0 && selectedItems.length < filteredMenuItems.length}
                  checked={filteredMenuItems.length > 0 && selectedItems.length === filteredMenuItems.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all menu items' }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMenuItems.map((item) => {
              const isItemSelected = isSelected(item._id);
              return (
                <TableRow
                  hover
                  onClick={(event) => handleCheckboxClick(event, item._id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={item._id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': `menu-item-checkbox-${item._id}` }}
                    />
                  </TableCell>
                  <TableCell component="th" id={`menu-item-checkbox-${item._id}`} scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.category?.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    {item.image && <img src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover' }} />}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={item.active}
                      onChange={(event) => {
                        console.log('Switch changed for item:', item.name, 'New checked state:', event.target.checked);
                        handleToggleActive(item);
                      }}
                      color="primary"
                      inputProps={{ 'aria-label': `Toggle ${item.name} active status` }}
                    />
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
              );
            })}
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
            label="Image URL (Optional)"
            type="text"
            fullWidth
            variant="standard"
            value={newItemImage}
            onChange={(e) => {
              setNewItemImage(e.target.value);
              setSelectedFile(null);
            }}
            sx={{ mt: 2 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
            OR upload an image file:
          </Typography>
          <Input
            type="file"
            fullWidth
            sx={{ mb: 2 }}
            onChange={handleFileChange}
          />
          {newItemImage && (
            <Box sx={{ textAlign: 'center', mt: 1, mb: 2 }}>
              <img src={newItemImage} alt="Item Preview" style={{ maxWidth: '100%', maxHeight: 150, objectFit: 'contain' }} />
            </Box>
          )}
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
          <FormControlLabel
            control={
              <Switch
                checked={newItemActive}
                onChange={(e) => setNewItemActive(e.target.checked)}
                color="primary"
              />
            }
            label="Active on Menu"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>{currentMenuItem ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Operation completed successfully
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error" onClose={() => setShowError(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MenuItemManagement; 