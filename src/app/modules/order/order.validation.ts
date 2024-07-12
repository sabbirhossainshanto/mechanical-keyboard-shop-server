import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    product: z
      .array(
        z.object({
          productId: z.string({
            invalid_type_error: 'ProductId must be a string',
          }),
          cartProductId: z.string({
            invalid_type_error: 'Cart product id must be a string',
          }),
          quantity: z
            .number({
              invalid_type_error: 'Quantity must be a number',
            })
            .min(1, 'Quantity must be at least 1'),
          price: z.number({
            invalid_type_error: 'Price must be a number',
          }),
        }),
      )
      .nonempty({ message: 'Product array must contain at least one product' }),
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
      })
      .min(1, 'Name is required'),
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email address'),
    address: z
      .string({
        invalid_type_error: 'Address must be a string',
      })
      .min(1, 'Address is required'),
    phone: z
      .string({
        invalid_type_error: 'Phone must be a string',
      })
      .min(1, 'Phone is required'),
    isDeleted: z.boolean().optional(),
  }),
});

export const orderValidation = {
  createOrderValidationSchema,
};
