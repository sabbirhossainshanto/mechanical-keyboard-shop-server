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
  if (isProductExist?.availableQuantity < payload.quantity) {
    throw new AppError(httpStatus.NOT_FOUND, 'Insufficient product quantity!');
  }

  const isBookmarkExist = await Cart.findOne({ product: payload.product });

  if (
    isBookmarkExist &&
    isProductExist?.availableQuantity < isBookmarkExist?.quantity
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient order quantity');
  }

  if (isBookmarkExist) {
    const existQuantity = isBookmarkExist.quantity;
    const newBookmark = await Cart.findOneAndUpdate(
      { product: isBookmarkExist.product },
      {
        quantity: existQuantity + payload.quantity,
      },
    );
    return newBookmark;
  }

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
  const isBookmarkExist = await Cart.findById(id);

  if (!isBookmarkExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This cart product is not found!');
  }
  const result = await Cart.findByIdAndDelete(id);
  return result;
};
const updateSingleBookmarkFromDB = async (
  id: string,
  payload: { quantity: number; type: 'plus' | 'minus' },
) => {
  const isBookmarkExist = await Cart.findById(id);

  if (!isBookmarkExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This cart product is not found!');
  }
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
