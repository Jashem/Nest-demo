import { Document } from 'mongoose';

export interface Car extends Document {
  readonly name: string;
  readonly year: number;
  readonly manufacturer: string;
  readonly image: string;
}
