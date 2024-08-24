import { toast } from 'react-toastify';
import { type CartModel } from '../../models/cartSchema';

export const validateCartAndProduct = (cart: CartModel | null, id: number) => {
  if (!cart) {
    toast.error('User has no cart.');
    return null;
  }

  const product = cart.products.find(product => product.id === id);
  if (!product) {
    return null;
  }

  return { product, cart };
};
