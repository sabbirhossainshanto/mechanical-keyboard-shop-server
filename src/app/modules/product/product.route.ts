import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import productValidationSchema from './product.validation';
import { productController } from './product.controller';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(productValidationSchema),
  productController.createProduct,
);

router.get('/', productController.getAllProducts);

router.get('/:productId', productController.getSingleProduct);

router.patch(
  '/:productId',
  validateRequest(productValidationSchema),
  productController.updateSingleProduct,
);

export const productRoutes = router;
