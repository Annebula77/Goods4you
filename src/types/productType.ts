export type ProductType = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  categories: string[];
  rating: number;
  image: string;
  deliveryTimeInDays: number;
  warrantyPeriodInMonths: number;
  price: number;
  discountedPrice: number;
  discountPercentage: number;
  status: boolean;
};
