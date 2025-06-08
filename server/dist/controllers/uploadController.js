"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Set up storage engine
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
// Initialize upload middleware
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            cb(new Error('Error: Images Only! (jpeg, jpg, png, gif)'));
        }
    },
});
// Single file upload controller
const uploadImage = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err.message });
        }
        else if (!req.file) {
            res.status(400).json({ message: 'No file selected' });
        }
        else {
            // Return the path to the uploaded file
            res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
        }
    });
};
exports.uploadImage = uploadImage;
