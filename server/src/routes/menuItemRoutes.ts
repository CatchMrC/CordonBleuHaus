import express from 'express';
import {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menuItemController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getAllMenuItems);
router.get('/:id', getMenuItem);
router.post('/', protect, authorize(['admin']), createMenuItem);
router.put('/:id', protect, authorize(['admin']), updateMenuItem);
router.delete('/:id', protect, authorize(['admin']), deleteMenuItem);

export default router; 