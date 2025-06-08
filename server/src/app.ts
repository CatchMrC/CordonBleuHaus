import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import menuItemRoutes from './routes/menuItemRoutes';
import categoryRoutes from './routes/categoryRoutes';
import specialOfferRoutes from './routes/specialOfferRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/special-offers', specialOfferRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cordonbleuhaus')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

export default app; 