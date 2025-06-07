import express from 'express';
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/', protect, authorize(['admin']), createCategory);
router.put('/:id', protect, authorize(['admin']), updateCategory);
router.delete('/:id', protect, authorize(['admin']), deleteCategory);

export default router; 