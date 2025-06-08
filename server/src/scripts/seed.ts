import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';
import Category from '../models/Category';
import MenuItem, { IMenuItem } from '../models/MenuItem';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cordonbleuhaus';

// Define interfaces for CSV data
interface RawCategoryData {
  name: string;
  description?: string;
}

interface RawMenuItemData {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Read and parse CSV files
const categoriesData = parse(
  fs.readFileSync(path.join(__dirname, '../../data/categories.csv'), 'utf-8'),
  { columns: true, skip_empty_lines: true }
) as RawCategoryData[];

const menuItemsData = parse(
  fs.readFileSync(path.join(__dirname, '../../data/menu_items.csv'), 'utf-8'),
  { columns: true, skip_empty_lines: true }
) as RawMenuItemData[];

// Seed function
async function seed() {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await MenuItem.deleteMany({});
    console.log('Cleared existing data');

    // Create categories and store them in a map for easy lookup
    const categories = await Category.create(categoriesData);
    const categoryMap = new Map(categories.map(cat => [cat.name, cat]));
    console.log('Created categories');

    // Create menu items with proper category references
    const menuItems = await MenuItem.create(
      menuItemsData.map((item: RawMenuItemData) => {
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
      })
    );
    console.log('Created menu items');

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Run the seed function
seed(); 