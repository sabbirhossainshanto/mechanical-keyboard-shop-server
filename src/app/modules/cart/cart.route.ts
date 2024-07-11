import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookmarkProductValidation } from './cart.validation';
import { bookmarkProductController } from './cart.controller';

const router = express.Router();

router.post(
  '/create-bookmark',
  validateRequest(
    bookmarkProductValidation.createBookmarkProductValidationSchema,
  ),
  bookmarkProductController.addToCart,
);

router.get('/', bookmarkProductController.getAllBookmarkProducts);

router.get('/:productId', bookmarkProductController.getSingleBookmarkProduct);

router.delete(
  '/:productId',
  bookmarkProductController.deleteSingleBookmarkProduct,
);

router.put(
  '/:productId',
  validateRequest(
    bookmarkProductValidation.updateBookmarkProductValidationSchema,
  ),
  bookmarkProductController.updateSingleBookmarkProduct,
);

export const cartRoutes = router;
