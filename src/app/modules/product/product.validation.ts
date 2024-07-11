import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Name must be a string' }),
    description: z.string({
      invalid_type_error: 'Description must be a string',
    }),
    image: z.string({ invalid_type_error: 'Image must be a string' }),
    brand: z.string({ invalid_type_error: 'Brand must be a string' }),
    availableQuantity: z.number({
      invalid_type_error: 'Available quantity must be a number',
    }),
    price: z.number({ invalid_type_error: 'Price quantity must be a number' }),
    rating: z.number({
      invalid_type_error: 'Rating quantity must be a number',
    }),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Name must be a string' }).optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .optional(),
    image: z
      .string({ invalid_type_error: 'Image must be a string' })
      .optional(),
    brand: z
      .string({ invalid_type_error: 'Brand must be a string' })
      .optional(),
    availableQuantity: z
      .number({
        invalid_type_error: 'Available quantity must be a number',
      })
      .optional(),
    price: z
      .number({ invalid_type_error: 'Price quantity must be a number' })
      .optional(),
    rating: z
      .number({
        invalid_type_error: 'Rating quantity must be a number',
      })
      .optional(),
  }),
});

export const productValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
