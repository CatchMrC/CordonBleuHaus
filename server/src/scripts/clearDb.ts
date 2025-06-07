import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category';
import MenuItem from '../models/MenuItem';

dotenv.config();

const clearDatabase = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Clear collections
    await Category.deleteMany({});
    await MenuItem.deleteMany({});
    
    console.log('Database collections cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
};

// Run the clear function
clearDatabase(); 