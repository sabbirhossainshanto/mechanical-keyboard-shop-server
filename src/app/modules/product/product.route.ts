import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { productController } from './product.controller';
import { productValidation } from './product.validation';
const router = express.Router();

router.post(
  '/create-product',
  validateRequest(productValidation.createProductValidationSchema),
  productController.createProduct,
);

router.get('/', productController.getAllProducts);

router.get('/:productId', productController.getSingleProduct);

router.put(
  '/:productId',
  validateRequest(productValidation.updateProductValidationSchema),
  productController.updateSingleProduct,
);
router.delete('/:productId', productController.deleteSingleProduct);

export const productRoutes = router;
