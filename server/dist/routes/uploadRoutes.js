"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadController_1 = require("../controllers/uploadController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Protect the upload route, only admins can upload images
router.post('/image', authMiddleware_1.protect, (0, authMiddleware_1.authorize)(['admin']), uploadController_1.uploadImage);
exports.default = router;
