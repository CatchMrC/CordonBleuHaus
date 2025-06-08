import express from 'express';
import {
  getSpecialOffers,
  createSpecialOffer,
  updateSpecialOffer,
  deleteSpecialOffer,
  toggleActive
} from '../controllers/specialOfferController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getSpecialOffers);

// Protected routes
router.post('/', authenticateToken, createSpecialOffer);
router.put('/:id', authenticateToken, updateSpecialOffer);
router.delete('/:id', authenticateToken, deleteSpecialOffer);
router.patch('/:id/toggle', authenticateToken, toggleActive);

export default router; 