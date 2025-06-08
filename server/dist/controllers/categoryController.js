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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getAllCategories = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});
exports.getAllCategories = getAllCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findById(req.params.id);
        if (!category)
            return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});
exports.getCategory = getCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const category = new Category_1.default({ name, description });
        yield category.save();
        res.status(201).json(category);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to create category' });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const category = yield Category_1.default.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
        if (!category)
            return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to update category' });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findByIdAndDelete(req.params.id);
        if (!category)
            return res.status(404).json({ error: 'Category not found' });
        res.json({ message: 'Category deleted' });
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to delete category' });
    }
});
exports.deleteCategory = deleteCategory;
