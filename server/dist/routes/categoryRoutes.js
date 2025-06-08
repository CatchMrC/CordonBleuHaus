"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', categoryController_1.getAllCategories);
router.get('/:id', categoryController_1.getCategory);
router.post('/', authMiddleware_1.protect, (0, authMiddleware_1.authorize)(['admin']), categoryController_1.createCategory);
router.put('/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)(['admin']), categoryController_1.updateCategory);
router.delete('/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)(['admin']), categoryController_1.deleteCategory);
exports.default = router;
