import express from 'express';
import {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  bulkUpdateMenuItems,
  bulkDeleteMenuItems
} from '../controllers/menuItemController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getAllMenuItems);
router.post('/', protect, authorize(['admin']), createMenuItem);

// Bulk Actions - MUST BE BEFORE /:id routes
router.put('/bulk-update', protect, authorize(['admin']), bulkUpdateMenuItems);
router.post('/bulk-delete', protect, authorize(['admin']), bulkDeleteMenuItems);

router.get('/:id', getMenuItem);
router.put('/:id', protect, authorize(['admin']), updateMenuItem);
router.delete('/:id', protect, authorize(['admin']), deleteMenuItem);

export default router; 