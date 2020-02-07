import { Schema } from 'mongoose';

export const ManufacturerSchema = new Schema({
  name: String,
  country: String,
  logo: String
});
