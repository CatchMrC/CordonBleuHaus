import MenuItem from '../models/MenuItem';
import { Request, Response } from 'express';

export const getAllMenuItems = async (req: Request, res: Response) => {
  try {
    const items = await MenuItem.find()
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
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

export const getMenuItem = async (req: Request, res: Response) => {
  try {
    const item = await MenuItem.findById(req.params.id)
      .populate({
        path: 'category',
        select: '_id name description'
      })
      .lean();
    
    if (!item) return res.status(404).json({ error: 'Menu item not found' });
    res.json(item);
  } catch (err) {
    console.error('Error fetching menu item:', err);
    res.status(500).json({ error: 'Failed to fetch menu item' });
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, category } = req.body;
    const item = new MenuItem({ name, description, price, image, category });
    await item.save();
    
    const populatedItem = await MenuItem.findById(item._id)
      .populate({
        path: 'category',
        select: '_id name description'
      })
      .lean();
    
    res.status(201).json(populatedItem);
  } catch (err) {
    console.error('Error creating menu item:', err);
    res.status(400).json({ error: 'Failed to create menu item' });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  console.log('updateMenuItem: Received request to update menu item.');
  console.log('updateMenuItem: Request params (id):', req.params.id);
  console.log('updateMenuItem: Request body:', req.body);
  try {
    const { name, description, price, image, category, active, featured, seasonal, specialOffer } = req.body;
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, category, active, featured, seasonal, specialOffer },
      { new: true }
    ).populate({
      path: 'category',
      select: '_id name description'
    }).lean();
    
    if (!item) {
      console.log('updateMenuItem: Menu item not found for ID:', req.params.id);
      return res.status(404).json({ error: 'Menu item not found' });
    }
    console.log('updateMenuItem: Successfully updated item:', item.name, 'New active status:', item.active);
    res.json(item);
  } catch (err) {
    console.error('updateMenuItem: Error updating menu item:', err);
    res.status(400).json({ error: 'Failed to update menu item' });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Menu item not found' });
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    console.error('Error deleting menu item:', err);
    res.status(400).json({ error: 'Failed to delete menu item' });
  }
}; 