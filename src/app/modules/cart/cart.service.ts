import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { TCart } from './cart.interface';
import { Cart } from './cart.model';

const createBookmarkProductIntoDB = async (payload: TCart) => {
  const isProductExist = await Product.findById(payload.product);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This product is not exist');
  }
  if (isProductExist.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This product is already deleted',
    );
  }
  const isOrderExist = await Cart.findOne({ productId: payload.product });

  if (
    isOrderExist &&
    isProductExist?.availableQuantity < isOrderExist?.quantity
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient order quantity');
  }

  if (isOrderExist) {
    const existQuantity = isOrderExist.quantity;
    const newOrder = await Cart.findOneAndUpdate(
      { productId: isOrderExist.product },
      {
        quantity: existQuantity + payload.quantity,
      },
    );
    await Product.findByIdAndUpdate(payload.product, {
      $inc: { availableQuantity: -payload.quantity },
    });
    return newOrder;
  }
  await Product.findByIdAndUpdate(payload.product, {
    $inc: { availableQuantity: -payload.quantity },
  });

  const result = await Cart.create(payload);

  return result;
};

const getAllBookmarksFromDB = async () => {
  const result = await Cart.find().populate('product');
  return result;
};

const getSingleBookmarkFromDB = async (id: string) => {
  const result = await Cart.findById(id);
  return result;
};

const deleteSingleBookmarkFromDB = async (id: string) => {
  const result = await Cart.findOneAndDelete({ _id: id });
  return result;
};
const updateSingleBookmarkFromDB = async (
  id: string,
  payload: { quantity: number; type: 'plus' | 'minus' },
) => {
  const result = await Cart.findByIdAndUpdate(id, {
    $inc: {
      quantity:
        payload.type === 'minus' ? -payload.quantity : +payload.quantity,
    },
  });
  return result;
};

export const bookmarkProductService = {
  createBookmarkProductIntoDB,
  getAllBookmarksFromDB,
  getSingleBookmarkFromDB,
  updateSingleBookmarkFromDB,
  deleteSingleBookmarkFromDB,
};
