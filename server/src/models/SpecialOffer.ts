import mongoose, { Schema, Document } from 'mongoose';

export interface ISpecialOffer extends Document {
  title: string;
  description: string;
  image: string;
  validUntil: Date;
  type: 'promotion' | 'event';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SpecialOfferSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  validUntil: { type: Date, required: true },
  type: { type: String, enum: ['promotion', 'event'], required: true },
  active: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model<ISpecialOffer>('SpecialOffer', SpecialOfferSchema); 