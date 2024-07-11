import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookmarkProductService } from './cart.service';

const addToCart = catchAsync(async (req, res) => {
  const result = await bookmarkProductService.createBookmarkProductIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product added to cart successfully!',
    data: result,
  });
});

const getAllBookmarkProducts = catchAsync(async (req, res) => {
  const result = await bookmarkProductService.getAllBookmarksFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookmarked product are retrieve successfully',
    data: result,
  });
});

const getSingleBookmarkProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result =
    await bookmarkProductService.getSingleBookmarkFromDB(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookmarked product retrieve successfully',
    data: result,
  });
});

const deleteSingleBookmarkProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result =
    await bookmarkProductService.deleteSingleBookmarkFromDB(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookmarked product deleted successfully',
    data: result,
  });
});

const updateSingleBookmarkProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await bookmarkProductService.updateSingleBookmarkFromDB(
    productId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookmarked product updated successfully',
    data: result,
  });
});

export const bookmarkProductController = {
  addToCart,
  getAllBookmarkProducts,
  getSingleBookmarkProduct,
  updateSingleBookmarkProduct,
  deleteSingleBookmarkProduct,
};
