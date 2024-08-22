import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateCart } from '../store/thunks/updateCartThunk';
import {
  setQuantity,
  addRemovedProduct,
  setRemovedProducts,
} from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import { CartProductModel } from '../models/cartSchema';
import { validateCartAndProduct } from '../utils/functions/validateCartAndUser';

export const useCartActions = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.cart);
  const removedProducts = useAppSelector(state => state.cart.removedProducts);

  const addProductToCart = (product: CartProductModel) => {
    if (!cart) {
      toast.error('Unable to update cart. Please try again.');
      return;
    }

    const removedProductIndex = removedProducts.findIndex(
      p => p.id === product.id
    );

    if (removedProductIndex !== -1) {
      const removedProduct = removedProducts[removedProductIndex];
      const restoredProduct = { ...removedProduct, quantity: 1 };

      const updatedRemovedProducts = removedProducts.filter(
        (_, index) => index !== removedProductIndex
      );

      dispatch(setRemovedProducts(updatedRemovedProducts));

      const updatedProducts = [...cart.products, restoredProduct];

      dispatch(
        updateCart({
          cartId: cart.id,
          products: { merge: false, products: updatedProducts },
        })
      );
      return;
    }

    const existingProduct = cart.products.find(p => p.id === product.id);
    if (existingProduct) {
      toast.info('Product is already in the cart');
      return;
    }

    const newProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      discountPercentage: product.discountPercentage ?? 0,
      thumbnail: product.thumbnail,
    };

    const updatedProducts = [...cart.products, newProduct];

    dispatch(
      updateCart({
        cartId: cart.id,
        products: { merge: false, products: updatedProducts },
      })
    );
  };

  const incrementProductQuantity = (id: number) => {
    const result = validateCartAndProduct(cart, id);
    if (!result) return;

    const { product, cart: validatedCart } = result;

    const updatedProducts = validatedCart.products.map(p =>
      p.id === id ? { ...p, quantity: product.quantity + 1 } : p
    );

    dispatch(
      updateCart({
        cartId: validatedCart.id,
        products: { merge: false, products: updatedProducts },
      })
    );
  };

  const decrementProductQuantity = (id: number) => {
    const result = validateCartAndProduct(cart, id);
    if (!result) return;

    const { product, cart: validatedCart } = result;

    if (product.quantity <= 1) {
      const updatedProducts = validatedCart.products.filter(p => p.id !== id);

      dispatch(
        updateCart({
          cartId: validatedCart.id,
          products: { merge: false, products: updatedProducts },
        })
      ).then(response => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(addRemovedProduct({ ...product, quantity: 0 }));
        }
      });

      return;
    }

    const updatedProducts = validatedCart.products.map(p =>
      p.id === id ? { ...p, quantity: product.quantity - 1 } : p
    );

    dispatch(
      updateCart({
        cartId: validatedCart.id,
        products: { merge: false, products: updatedProducts },
      })
    );
  };

  const updateProductQuantity = (id: number, value: number) => {
    if (value < 1) {
      toast.info('Quantity must be at least 1.');
      return;
    }
    dispatch(setQuantity({ productId: id, quantity: value }));
  };

  return {
    addProductToCart,
    incrementProductQuantity,
    decrementProductQuantity,
    updateProductQuantity,
  };
};
