import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await orderService.createOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Ordered successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await orderService.getAllOrdersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders are retrieve successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await orderService.getSingleOrderFromDB(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieve successfully',
    data: result,
  });
});

const deleteSingleOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await orderService.deleteSingleOrderFromDB(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully',
    data: result,
  });
});

export const orderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  deleteSingleOrder,
};
