"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menuItemController_1 = require("../controllers/menuItemController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', menuItemController_1.getAllMenuItems);
router.post('/', authMiddleware_1.protect, (0, authMiddleware_1.authorize)(['admin']), menuItemController_1.createMenuItem);
// Bulk Actions - MUST BE BEFORE /:id routes
router.put('/bulk-update', authMiddleware_1.protect, (0, authMiddleware_1.authorize)(['admin']), menuItemController_1.bulkUpdateMenuItems);
router.post('/bulk-delete', authMiddleware_1.protect, (0, authMiddleware_1.authorize)(['admin']), menuItemController_1.bulkDeleteMenuItems);
router.get('/:id', menuItemController_1.getMenuItem);
router.put('/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)(['admin']), menuItemController_1.updateMenuItem);
router.delete('/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)(['admin']), menuItemController_1.deleteMenuItem);
exports.default = router;
