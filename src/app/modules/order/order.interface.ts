import { Types } from 'mongoose';

export type TOrder = {
  name: string;
  email: string;
  address: string;
  phone: string;
  product: Types.ObjectId;
  price: number;
  quantity: number;
  isDeleted:boolean
};
