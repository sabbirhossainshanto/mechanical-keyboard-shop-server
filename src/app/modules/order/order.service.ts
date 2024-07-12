import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { Cart } from '../cart/cart.model';

const createOrderIntoDB = async (payload: TOrder) => {
  const productIds = payload.product.map((p) => p.productId);
  const products = await Product.find({ _id: { $in: productIds } });

  if (products.length !== payload.product.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid product id!');
  }
  products.forEach((product) => {
    const payloadProduct = payload.product.find(
      (p) => p.productId === product._id,
    );

    if (product.isDeleted) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `${product.name} is already deleted`,
      );
    }

    if (payloadProduct && product.availableQuantity < payloadProduct.quantity) {
      throw new AppError(httpStatus.NOT_FOUND, 'Insufficient product quantity');
    }
  });

  const order = await Order.create(payload);

  await Promise.all(
    payload.product.map(async (p) => {
      await Product.findByIdAndUpdate(p.productId, {
        $inc: { availableQuantity: -p.quantity },
      });
      await Cart.findByIdAndDelete(p.cartProductId);
    }),
  );

  return order;
};

export const orderService = {
  createOrderIntoDB,
};
