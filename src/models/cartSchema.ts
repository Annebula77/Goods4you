import { z } from 'zod';

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  total: z.number(),
  discountPercentage: z.number(),
  discountedTotal: z.number(),
  thumbnail: z.string().url(),
});

export type CartProductModel = z.infer<typeof ProductSchema>;

export const CartSchema = z.object({
  id: z.number(),
  products: z.array(ProductSchema),
  total: z.number(),
  discountedTotal: z.number(),
  userId: z.number(),
  totalProducts: z.number(),
  totalQuantity: z.number(),
});

export type CartModel = z.infer<typeof CartSchema>;

export const CartResponseSchema = z.object({
  carts: z.array(CartSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type CartResponseModel = z.infer<typeof CartResponseSchema>;

const CartProductSchema = z.object({
  id: z.number().min(1, 'Product ID must be a positive integer'),
  quantity: z.number(),
});

export const UpdateCartRequestSchema = z.object({
  merge: z.boolean().optional().default(false),
  products: z.array(CartProductSchema),
});

export type UpdateCartRequestModel = z.infer<typeof UpdateCartRequestSchema>;

const UpdateResponseProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  total: z.number(),
  discountPercentage: z.number(),
  discountedPrice: z.number(),
  thumbnail: z.string().url(),
});

export const UpdateResponseCartSchema = z.object({
  id: z.number(),
  products: z.array(UpdateResponseProductSchema),
  total: z.number(),
  discountedTotal: z.number(),
  userId: z.number(),
  totalProducts: z.number(),
  totalQuantity: z.number(),
});

export type UpdateResponseCartModel = z.infer<typeof UpdateResponseCartSchema>;
