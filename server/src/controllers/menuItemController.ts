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

export const bulkUpdateMenuItems = async (req: Request, res: Response) => {
  console.log('bulkUpdateMenuItems: Received bulk update request.');
  console.log('bulkUpdateMenuItems: Request body:', req.body);
  try {
    const { itemIds, updates } = req.body;
    if (!Array.isArray(itemIds) || itemIds.length === 0 || !updates) {
      return res.status(400).json({ error: 'Invalid request body: itemIds and updates are required.' });
    }

    const result = await MenuItem.updateMany(
      { _id: { $in: itemIds } },
      { $set: updates }
    );
    console.log('bulkUpdateMenuItems: Successfully updated', result.modifiedCount, 'items.');
    res.json({ message: `Successfully updated ${result.modifiedCount} items.`, modifiedCount: result.modifiedCount });
  } catch (err) {
    console.error('bulkUpdateMenuItems: Error during bulk update:', err);
    res.status(400).json({ error: 'Failed to bulk update menu items' });
  }
};

export const bulkDeleteMenuItems = async (req: Request, res: Response) => {
  console.log('bulkDeleteMenuItems: Received bulk delete request.');
  console.log('bulkDeleteMenuItems: Request body:', req.body);
  try {
    const { itemIds } = req.body;
    if (!Array.isArray(itemIds) || itemIds.length === 0) {
      return res.status(400).json({ error: 'Invalid request body: itemIds array is required.' });
    }

    const result = await MenuItem.deleteMany(
      { _id: { $in: itemIds } }
    );
    console.log('bulkDeleteMenuItems: Successfully deleted', result.deletedCount, 'items.');
    res.json({ message: `Successfully deleted ${result.deletedCount} items.`, deletedCount: result.deletedCount });
  } catch (err) {
    console.error('bulkDeleteMenuItems: Error during bulk delete:', err);
    res.status(400).json({ error: 'Failed to bulk delete menu items' });
  }
}; 