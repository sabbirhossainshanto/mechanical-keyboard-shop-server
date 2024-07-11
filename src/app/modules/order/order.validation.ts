import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    product: z.string({ invalid_type_error: 'Product must be a string' }),
    name: z.string({ invalid_type_error: 'Name must be a string' }),
    email: z.string({ invalid_type_error: 'Email must be a string' }),
    address: z.string({ invalid_type_error: 'Address must be a string' }),
    phone: z.string({ invalid_type_error: 'Phone must be a string' }),
    quantity: z.number({
      invalid_type_error: 'Quantity must be a number',
    }),
    price: z.number({ invalid_type_error: 'Price quantity must be a number' }),
  }),
});

export const orderValidation = {
  createOrderValidationSchema,
};
