import { toast } from 'react-toastify';
import { type CartModel } from '../../models/cartSchema';

export const validateCartAndProduct = (cart: CartModel | null, id: number) => {
  if (!cart) {
    // NOTE: Toasts to be modified
    toast.error('Unable to update cart. Please try again.');
    return null;
  }

  const product = cart.products.find(product => product.id === id);
  if (!product) {
    toast.error('Product is added to cart');
    return null;
  }

  return { product, cart };
};
