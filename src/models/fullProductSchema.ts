import { z } from 'zod';

const ReviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string().transform(str => new Date(str)),
  reviewerName: z.string(),
  reviewerEmail: z.string().email(),
});

const DimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});

const MetaSchema = z.object({
  createdAt: z.string().transform(str => new Date(str)),
  updatedAt: z.string().transform(str => new Date(str)),
  barcode: z.string(),
  qrCode: z.string().url(),
});

export const FullProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number().optional(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string(),
  sku: z.string(),
  weight: z.number(),
  dimensions: DimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(ReviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  meta: MetaSchema,
  images: z.array(z.string().url()),
  thumbnail: z.string().url(),
});

export type FullProductModel = z.infer<typeof FullProductSchema>;
