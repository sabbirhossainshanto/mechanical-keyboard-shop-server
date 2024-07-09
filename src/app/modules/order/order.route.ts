import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import orderValidationSchema from './order.validation';
import { orderController } from './order.controller';

const router = express.Router();

router.post(
  '/create-order',
  validateRequest(orderValidationSchema),
  orderController.createOrder,
);

router.get('/', orderController.getAllOrders);

router.get('/:orderId', orderController.getSingleOrder);

router.delete(
  '/:orderId',
  orderController.deleteSingleOrder
);

export const orderRoutes = router;
