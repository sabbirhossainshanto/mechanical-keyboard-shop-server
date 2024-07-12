import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProducts } from './product.interface';
import { Product } from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createProductIntoDB = async (payload: TProducts) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find({ isDeleted: false }),
    query,
  )
    .search(['name', 'brand'])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await productQuery.modelQuery;
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const isProductExist = await Product.findById(id);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This product is not exist');
  }
  if (isProductExist.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This product is already deleted',
    );
  }
  const result = await Product.findById(id);
  return result;
};

const updateSingleProductFromDB = async (
  id: string,
  payload: Partial<TProducts>,
) => {
  const isProductExist = await Product.findById(id);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This product is not exist!');
  }
  if (isProductExist.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This product is already deleted!',
    );
  }
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSingleProductFromDB = async (id: string) => {
  const isProductExist = await Product.findById(id);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This product is not exist!');
  }
  if (isProductExist.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This product is already deleted!',
    );
  }
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
};
