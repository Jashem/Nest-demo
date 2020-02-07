import { Document } from 'mongoose';

export interface Manufacturer extends Document {
  readonly name: string;
  readonly country: string;
  readonly logo: string;
}
