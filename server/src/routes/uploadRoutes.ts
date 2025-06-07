import express from 'express';
import { uploadImage } from '../controllers/uploadController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Protect the upload route, only admins can upload images
router.post('/image', protect, authorize(['admin']), uploadImage);

export default router; 