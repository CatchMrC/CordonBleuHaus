import { Request, Response } from 'express';
import SpecialOffer from '../models/SpecialOffer';

// Get all special offers
export const getSpecialOffers = async (req: Request, res: Response) => {
  try {
    const offers = await SpecialOffer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch special offers' });
  }
};

// Create a new special offer
export const createSpecialOffer = async (req: Request, res: Response) => {
  try {
    const { title, description, image, validUntil, type } = req.body;
    const offer = new SpecialOffer({
      title,
      description,
      image,
      validUntil,
      type
    });
    await offer.save();
    res.status(201).json(offer);
  } catch (err: any) {
    console.error('Error creating special offer:', err);
    res.status(400).json({ error: err.message || 'Failed to create special offer' });
  }
};

// Update a special offer
export const updateSpecialOffer = async (req: Request, res: Response) => {
  try {
    const { title, description, image, validUntil, type, active } = req.body;
    const offer = await SpecialOffer.findByIdAndUpdate(
      req.params.id,
      { title, description, image, validUntil, type, active },
      { new: true }
    );
    
    if (!offer) {
      return res.status(404).json({ error: 'Special offer not found' });
    }
    res.json(offer);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update special offer' });
  }
};

// Delete a special offer
export const deleteSpecialOffer = async (req: Request, res: Response) => {
  try {
    const offer = await SpecialOffer.findByIdAndDelete(req.params.id);
    if (!offer) {
      return res.status(404).json({ error: 'Special offer not found' });
    }
    res.json({ message: 'Special offer deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete special offer' });
  }
};

// Toggle active status
export const toggleActive = async (req: Request, res: Response) => {
  try {
    const offer = await SpecialOffer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ error: 'Special offer not found' });
    }
    offer.active = !offer.active;
    await offer.save();
    res.json(offer);
  } catch (err) {
    res.status(400).json({ error: 'Failed to toggle special offer status' });
  }
}; 