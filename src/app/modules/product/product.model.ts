import { Schema, model } from 'mongoose';
import { TProducts } from './product.interface';

const productSchema = new Schema<TProducts>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      unique: true,
    },
    availableQuantity: {
      type: Number,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProducts>('Product', productSchema);
