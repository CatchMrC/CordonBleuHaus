import mongoose, { Types } from 'mongoose';
import dotenv from 'dotenv';
import Category, { ICategory } from '../models/Category';
import MenuItem, { IMenuItem } from '../models/MenuItem';
import fs from 'fs';
import csv from 'csv-parser';

dotenv.config();

interface RawCategoryData {
  name: string;
  description: string;
}

interface RawMenuItemData {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const categoriesFilePath = './data/categories.csv';
const menuItemsFilePath = './data/menu_items.csv';

async function readCsv<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Function to seed the database
const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Category.deleteMany({});
    await MenuItem.deleteMany({});
    console.log('Cleared existing data');

    // Read and insert categories
    const rawCategories: RawCategoryData[] = await readCsv<RawCategoryData>(categoriesFilePath);
    console.log('Raw categories:', rawCategories);
    const categoriesToInsert: Partial<ICategory>[] = rawCategories.map(cat => ({
      name: cat.name,
      description: cat.description
    }));
    const createdCategories = (await Category.insertMany(categoriesToInsert)) as (ICategory & { _id: Types.ObjectId })[];
    console.log('Created categories:', createdCategories.map(c => ({ name: c.name, id: c._id })));

    const categoryMap = new Map<string, Types.ObjectId>();
    createdCategories.forEach(cat => {
      if (typeof cat.name !== 'string' || cat.name.trim() === '') {
        throw new Error(`Invalid or missing name for category: ${JSON.stringify(cat)}`);
      }
      categoryMap.set(cat.name, cat._id);
    });
    console.log('Category map:', Object.fromEntries(categoryMap));

    // Read and insert menu items
    const rawMenuItems: RawMenuItemData[] = await readCsv<RawMenuItemData>(menuItemsFilePath);
    console.log('First few menu items:', rawMenuItems.slice(0, 3));
    const menuItemsToInsert: Partial<IMenuItem>[] = rawMenuItems.map(item => {
      if (typeof item.category !== 'string' || item.category.trim() === '') {
        throw new Error(`Invalid or missing category for menu item '${item.name}'`);
      }
      const categoryId = categoryMap.get(item.category);
      if (!categoryId) {
        throw new Error(`Category '${item.category}' not found for menu item '${item.name}'. Available categories: ${Array.from(categoryMap.keys()).join(', ')}`);
      }
      return {
        name: item.name,
        description: item.description,
        price: parseFloat(item.price),
        image: '/uploads/image.jpg',
        category: categoryId
      };
    });

    await MenuItem.insertMany(menuItemsToInsert);
    console.log('Menu items created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 