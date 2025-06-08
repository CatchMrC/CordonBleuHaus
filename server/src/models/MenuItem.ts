import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  image?: string;
  category: mongoose.Types.ObjectId;
  active: boolean;
  featured: boolean;
  seasonal: boolean;
  specialOffer: boolean;
}

const MenuItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  active: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  seasonal: { type: Boolean, default: false },
  specialOffer: { type: Boolean, default: false }
});

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema); 