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
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sync_1 = require("csv-parse/sync");
const dotenv_1 = __importDefault(require("dotenv"));
const Category_1 = __importDefault(require("../models/Category"));
const MenuItem_1 = __importDefault(require("../models/MenuItem"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cordonbleuhaus';
// Connect to MongoDB
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
// Read and parse CSV files
const categoriesData = (0, sync_1.parse)(fs_1.default.readFileSync(path_1.default.join(__dirname, '../../data/categories.csv'), 'utf-8'), { columns: true, skip_empty_lines: true });
const menuItemsData = (0, sync_1.parse)(fs_1.default.readFileSync(path_1.default.join(__dirname, '../../data/menu_items.csv'), 'utf-8'), { columns: true, skip_empty_lines: true });
// Seed function
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Clear existing data
            yield Category_1.default.deleteMany({});
            yield MenuItem_1.default.deleteMany({});
            console.log('Cleared existing data');
            // Create categories and store them in a map for easy lookup
            const categories = yield Category_1.default.create(categoriesData);
            const categoryMap = new Map(categories.map(cat => [cat.name, cat]));
            console.log('Created categories');
            // Create menu items with proper category references
            const menuItems = yield MenuItem_1.default.create(menuItemsData.map((item) => {
                const category = categoryMap.get(item.category);
                if (!category) {
                    throw new Error(`Category not found for menu item: ${item.name}`);
                }
                return {
                    name: item.name,
                    description: item.description,
                    price: parseFloat(item.price),
                    image: item.image,
                    category: category._id,
                    active: true,
                    featured: false,
                    seasonal: false,
                    specialOffer: false
                };
            }));
            console.log('Created menu items');
            console.log('Seeding completed successfully');
        }
        catch (error) {
            console.error('Error seeding database:', error);
        }
        finally {
            mongoose_1.default.disconnect();
        }
    });
}
// Run the seed function
seed();
