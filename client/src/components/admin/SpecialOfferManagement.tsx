import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Chip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

interface SpecialOffer {
  _id: string;
  title: string;
  description: string;
  image: string;
  validUntil: string;
  type: 'promotion' | 'event';
  active: boolean;
}

const SpecialOfferManagement: React.FC = () => {
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<SpecialOffer | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [validUntil, setValidUntil] = useState<Date | null>(null);
  const [type, setType] = useState<'promotion' | 'event'>('promotion');
  const [active, setActive] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/special-offers');
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error('Error fetching special offers:', error);
    }
  };

  const handleOpenDialog = (offer?: SpecialOffer) => {
    if (offer) {
      setCurrentOffer(offer);
      setTitle(offer.title);
      setDescription(offer.description);
      setImage(offer.image);
      setValidUntil(new Date(offer.validUntil));
      setType(offer.type);
      setActive(offer.active);
    } else {
      setCurrentOffer(null);
      setTitle('');
      setDescription('');
      setImage('');
      setValidUntil(null);
      setType('promotion');
      setActive(true);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentOffer(null);
    setTitle('');
    setDescription('');
    setImage('');
    setValidUntil(null);
    setType('promotion');
    setActive(true);
  };

  const handleSubmit = async () => {
    try {
      const offerData = {
        title,
        description,
        image,
        validUntil: validUntil?.toISOString(),
        type,
        active
      };

      console.log('Sending offer data:', offerData);

      const url = currentOffer
        ? `http://localhost:5000/api/special-offers/${currentOffer._id}`
        : 'http://localhost:5000/api/special-offers';
      
      const method = currentOffer ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(offerData)
      });

      if (!response.ok) {
        throw new Error('Failed to save special offer');
      }

      setShowSuccess(true);
      handleCloseDialog();
      fetchOffers();
    } catch (error) {
      setShowError(true);
      setErrorMessage('Failed to save special offer');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/special-offers/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete special offer');
        }

        setShowSuccess(true);
        fetchOffers();
      } catch (error) {
        setShowError(true);
        setErrorMessage('Failed to delete special offer');
      }
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/special-offers/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to toggle offer status');
      }

      setShowSuccess(true);
      fetchOffers();
    } catch (error) {
      setShowError(true);
      setErrorMessage('Failed to toggle offer status');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Special Offers & Events</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
          Add New Offer
        </Button>
      </Box>

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: {
          xs: 'center',
          md: 'flex-start'
        }
      }}>
        {offers.map((offer) => (
          <Card 
            key={offer._id}
            sx={{
              width: { xs: '100%', md: 'calc(50% - 12px)', lg: 'calc(33.33% - 16px)' },
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" component="div">
                  {offer.title}
                </Typography>
                <Chip
                  label={offer.type === 'promotion' ? 'Special Offer' : 'Event'}
                  color={offer.type === 'promotion' ? 'primary' : 'secondary'}
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                {offer.description}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Valid until: {format(new Date(offer.validUntil), 'PPP')}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={offer.active}
                      onChange={() => handleToggleActive(offer._id)}
                      color="primary"
                    />
                  }
                  label="Active"
                />
                <IconButton onClick={() => handleOpenDialog(offer)} size="small">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(offer._id)} size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentOffer ? 'Edit Special Offer' : 'Add New Special Offer'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              label="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Valid Until"
                value={validUntil}
                onChange={(newValue: Date | null) => setValidUntil(newValue)}
              />
            </LocalizationProvider>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                label="Type"
                onChange={(e) => {
                  console.log('Select onChange value:', e.target.value);
                  setType(e.target.value as 'promotion' | 'event');
                }}
              >
                <MenuItem value="promotion">Special Offer</MenuItem>
                <MenuItem value="event">Event</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  color="primary"
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {currentOffer ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SpecialOfferManagement; 