import { z } from 'zod';

const orderValidationSchema = z.object({
  body: z.object({
    productId: z.string({ invalid_type_error: 'Product id must be a string' }),
    quantity: z.number({
      invalid_type_error: 'Quantity must be a number',
    }),
    price: z.number({ invalid_type_error: 'Price quantity must be a number' }),
  }),
});

export default orderValidationSchema;
