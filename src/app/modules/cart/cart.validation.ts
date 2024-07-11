import { z } from 'zod';

const createBookmarkProductValidationSchema = z.object({
  body: z.object({
    product: z.string({ invalid_type_error: 'Product id must be a string' }),
    quantity: z.number({
      invalid_type_error: 'Quantity must be a number',
    }),
    price: z.number({ invalid_type_error: 'Price quantity must be a number' }),
  }),
});

const updateBookmarkProductValidationSchema = z.object({
  body: z.object({
    product: z.string({ invalid_type_error: 'Product id must be a string' }),
    quantity: z.number({
      invalid_type_error: 'Quantity must be a number',
    }),
    type: z.enum(['plus', 'minus']),
  }),
});

export const bookmarkProductValidation = {
createBookmarkProductValidationSchema,updateBookmarkProductValidationSchema
};
