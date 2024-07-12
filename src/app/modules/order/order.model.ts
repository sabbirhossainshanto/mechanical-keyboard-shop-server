import { Schema, model } from 'mongoose';
import { TOrder, TOrderProduct } from './order.interface';

const productOrderSchema = new Schema<TOrderProduct>({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  cartProductId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Cart',
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema<TOrder>(
  {
    product: {
      type: [productOrderSchema],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>('Order', orderSchema);
