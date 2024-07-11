import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { orderValidation } from './order.validation';
import { orderController } from './order.controller';

const router = express.Router();

router.post(
  '/create-Order',
  validateRequest(orderValidation.createOrderValidationSchema),
  orderController.createOrder,
);

export const orderRoutes = router;
