import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: TOrder) => {
  const isProductExist = await Product.findById(payload.productId);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This product is not exist');
  } else if (isProductExist.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This product is already deleted',
    );
  }
  const isOrderExist = await Order.findOne({ productId: payload.productId });

  if (
    isOrderExist &&
    isProductExist?.availableQuantity < isOrderExist?.quantity
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient order quantity');
  }

  if (isOrderExist) {
    const existQuantity = isOrderExist.quantity;
    const newOrder = await Order.findOneAndUpdate(
      { productId: isOrderExist.productId },
      {
        quantity: existQuantity + payload.quantity,
      },
    );
    await Product.findByIdAndUpdate(payload.productId, {
      $inc: { availableQuantity: -payload.quantity },
    });
    return newOrder;
  }
  await Product.findByIdAndUpdate(payload.productId, {
    $inc: { availableQuantity: -payload.quantity },
  });

  const result = await Order.create(payload);

  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id);
  return result;
};

const deleteSingleOrderFromDB = async (id: string) => {
  const result = await Order.findOneAndDelete({ _id: id });
  return result;
};

export const orderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  deleteSingleOrderFromDB,
};
