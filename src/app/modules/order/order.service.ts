import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: TOrder) => {
  const isProductExist = await Product.findById(payload.product);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This product is not exist');
  }
  if (isProductExist.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This product is already deleted');
  }
  if (isProductExist.availableQuantity < payload.quantity) {
    throw new AppError(httpStatus.NOT_FOUND, 'Insufficient product quantity');
  }
  await Product.findByIdAndUpdate(isProductExist._id, {
    $inc: { availableQuantity: -payload.quantity },
  });
  const result = await Order.create(payload);
  return result;
};

export const orderService = {
  createOrderIntoDB,
};
