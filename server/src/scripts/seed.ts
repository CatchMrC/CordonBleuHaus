import mongoose, { Types } from 'mongoose';
import dotenv from 'dotenv';
import Category, { ICategory } from '../models/Category';
import MenuItem, { IMenuItem } from '../models/MenuItem';

dotenv.config();

// Sample data
const categories: Partial<ICategory>[] = [
  {
    name: 'Starters',
    description: 'Begin your culinary journey with our exquisite appetizers'
  },
  {
    name: 'Main Courses',
    description: 'Our signature main dishes prepared with the finest ingredients'
  },
  {
    name: 'Desserts',
    description: 'Sweet endings to your perfect meal'
  },
  {
    name: 'Beverages',
    description: 'Refreshing drinks and fine wines'
  }
];

const menuItems: Partial<IMenuItem>[] = [
  {
    name: 'Classic Cordon Bleu',
    description: 'Chicken breast filled with premium ham and Swiss cheese, breaded and fried to golden perfection',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710',
    category: undefined // Will be set after categories are created
  },
  {
    name: 'Truffle Mushroom Risotto',
    description: 'Creamy Arborio rice with wild mushrooms and black truffle',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371',
    category: undefined
  },
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan, croutons, and our house-made Caesar dressing',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
    category: undefined
  }
];

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

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories created');

    // Update menu items with category IDs
    const mainCourseCategory = createdCategories.find(cat => cat.name === 'Main Courses');
    const startersCategory = createdCategories.find(cat => cat.name === 'Starters');

    if (!mainCourseCategory || !startersCategory) {
      throw new Error('Required categories not found');
    }

    // Create menu items with proper category references
    const menuItemsWithCategories = menuItems.map(item => ({
      ...item,
      category: item === menuItems[0] || item === menuItems[1] 
        ? mainCourseCategory._id 
        : startersCategory._id
    }));

    // Insert menu items
    await MenuItem.insertMany(menuItemsWithCategories);
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