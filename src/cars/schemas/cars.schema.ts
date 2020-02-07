import { Schema } from 'mongoose';

export const CarSchema = new Schema({
  name: String,
  year: Number,
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
  image: String
});
