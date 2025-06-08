"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkDeleteMenuItems = exports.bulkUpdateMenuItems = exports.deleteMenuItem = exports.updateMenuItem = exports.createMenuItem = exports.getMenuItem = exports.getAllMenuItems = void 0;
const MenuItem_1 = __importDefault(require("../models/MenuItem"));
const getAllMenuItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield MenuItem_1.default.find()
            .populate({
            path: 'category',
            select: '_id name description'
        })
            .lean();
        console.log('Sending menu items:', items.map(item => ({
            name: item.name,
            category: item.category
        })));
        res.json(items);
    }
    catch (err) {
        console.error('Error fetching menu items:', err);
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});
exports.getAllMenuItems = getAllMenuItems;
const getMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield MenuItem_1.default.findById(req.params.id)
            .populate({
            path: 'category',
            select: '_id name description'
        })
            .lean();
        if (!item)
            return res.status(404).json({ error: 'Menu item not found' });
        res.json(item);
    }
    catch (err) {
        console.error('Error fetching menu item:', err);
        res.status(500).json({ error: 'Failed to fetch menu item' });
    }
});
exports.getMenuItem = getMenuItem;
const createMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, image, category } = req.body;
        const item = new MenuItem_1.default({ name, description, price, image, category });
        yield item.save();
        const populatedItem = yield MenuItem_1.default.findById(item._id)
            .populate({
            path: 'category',
            select: '_id name description'
        })
            .lean();
        res.status(201).json(populatedItem);
    }
    catch (err) {
        console.error('Error creating menu item:', err);
        res.status(400).json({ error: 'Failed to create menu item' });
    }
});
exports.createMenuItem = createMenuItem;
const updateMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('updateMenuItem: Received request to update menu item.');
    console.log('updateMenuItem: Request params (id):', req.params.id);
    console.log('updateMenuItem: Request body:', req.body);
    try {
        const { name, description, price, image, category, active, featured, seasonal, specialOffer } = req.body;
        const item = yield MenuItem_1.default.findByIdAndUpdate(req.params.id, { name, description, price, image, category, active, featured, seasonal, specialOffer }, { new: true }).populate({
            path: 'category',
            select: '_id name description'
        }).lean();
        if (!item) {
            console.log('updateMenuItem: Menu item not found for ID:', req.params.id);
            return res.status(404).json({ error: 'Menu item not found' });
        }
        console.log('updateMenuItem: Successfully updated item:', item.name, 'New active status:', item.active);
        res.json(item);
    }
    catch (err) {
        console.error('updateMenuItem: Error updating menu item:', err);
        res.status(400).json({ error: 'Failed to update menu item' });
    }
});
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield MenuItem_1.default.findByIdAndDelete(req.params.id);
        if (!item)
            return res.status(404).json({ error: 'Menu item not found' });
        res.json({ message: 'Menu item deleted' });
    }
    catch (err) {
        console.error('Error deleting menu item:', err);
        res.status(400).json({ error: 'Failed to delete menu item' });
    }
});
exports.deleteMenuItem = deleteMenuItem;
const bulkUpdateMenuItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('bulkUpdateMenuItems: Received bulk update request.');
    console.log('bulkUpdateMenuItems: Request body:', req.body);
    try {
        const { itemIds, updates } = req.body;
        if (!Array.isArray(itemIds) || itemIds.length === 0 || !updates) {
            return res.status(400).json({ error: 'Invalid request body: itemIds and updates are required.' });
        }
        const result = yield MenuItem_1.default.updateMany({ _id: { $in: itemIds } }, { $set: updates });
        console.log('bulkUpdateMenuItems: Successfully updated', result.modifiedCount, 'items.');
        res.json({ message: `Successfully updated ${result.modifiedCount} items.`, modifiedCount: result.modifiedCount });
    }
    catch (err) {
        console.error('bulkUpdateMenuItems: Error during bulk update:', err);
        res.status(400).json({ error: 'Failed to bulk update menu items' });
    }
});
exports.bulkUpdateMenuItems = bulkUpdateMenuItems;
const bulkDeleteMenuItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('bulkDeleteMenuItems: Received bulk delete request.');
    console.log('bulkDeleteMenuItems: Request body:', req.body);
    try {
        const { itemIds } = req.body;
        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            return res.status(400).json({ error: 'Invalid request body: itemIds array is required.' });
        }
        const result = yield MenuItem_1.default.deleteMany({ _id: { $in: itemIds } });
        console.log('bulkDeleteMenuItems: Successfully deleted', result.deletedCount, 'items.');
        res.json({ message: `Successfully deleted ${result.deletedCount} items.`, deletedCount: result.deletedCount });
    }
    catch (err) {
        console.error('bulkDeleteMenuItems: Error during bulk delete:', err);
        res.status(400).json({ error: 'Failed to bulk delete menu items' });
    }
});
exports.bulkDeleteMenuItems = bulkDeleteMenuItems;
