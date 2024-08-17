import { FullProductModel } from '../models/fullProductSchema';

export type ProductType = Pick<
  FullProductModel,
  | 'id'
  | 'title'
  | 'category'
  | 'thumbnail'
  | 'images'
  | 'price'
  | 'description'
  | 'discountPercentage'
  | 'rating'
  | 'stock'
  | 'warrantyInformation'
  | 'shippingInformation'
>;

export interface ProductProps {
  product: ProductType;
}

export type ListProductType = Pick<
  FullProductModel,
  'id' | 'title' | 'thumbnail' | 'price' | 'discountPercentage' | 'stock'
>;

export interface ProductWithCartInfo extends ListProductType {
  currentQuantity: number;
  isAddedToCart: boolean;
}
