import { Types } from 'mongoose';

export type TOrderProduct = {
  productId: Types.ObjectId;
  cartProductId: Types.ObjectId;
  quantity: number;
  price: number;
};

export type TOrder = {
  name: string;
  email: string;
  address: string;
  phone: string;
  product: TOrderProduct[];
  isDeleted: boolean;
};
