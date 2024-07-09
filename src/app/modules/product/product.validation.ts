import { z } from 'zod';

const productValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Name must be a string' }),
    image: z.string({ invalid_type_error: 'Image must be a string' }),
    brand: z.string({ invalid_type_error: 'Brand must be a string' }),
    availableQuantity: z.string({
      invalid_type_error: 'Available quantity must be a number',
    }),
    price: z.string({ invalid_type_error: 'Price quantity must be a number' }),
    rating: z.string({
      invalid_type_error: 'Rating quantity must be a number',
    }),
  }),
});

export default productValidationSchema;
