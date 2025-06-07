import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Initialize upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Images Only! (jpeg, jpg, png, gif)'));
    }
  },
});

// Single file upload controller
export const uploadImage = (req: Request, res: Response) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else if (!req.file) {
      res.status(400).json({ message: 'No file selected' });
    } else {
      // Return the path to the uploaded file
      res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
    }
  });
}; 