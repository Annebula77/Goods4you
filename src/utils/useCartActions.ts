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
import { useState } from 'react';

export const useCartActions = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.cart);
  const removedProducts = useAppSelector(state => state.cart.removedProducts);
  const [submittingProducts, setSubmittingProducts] = useState<{
    [key: number]: boolean;
  }>({});

  const setProductSubmitting = (productId: number, isSubmitting: boolean) => {
    setSubmittingProducts(prev => ({ ...prev, [productId]: isSubmitting }));
  };

  const addProductToCart = async (product: CartProductModel) => {
    if (!cart) {
      toast.error('User has no cart.');
      return;
    }

    setProductSubmitting(product.id, true);

    try {
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

        await dispatch(
          updateCart({
            cartId: cart.id,
            products: { merge: false, products: updatedProducts },
          })
        );
        return;
      }

      const existingProduct = cart.products.find(p => p.id === product.id);
      if (existingProduct) {
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

      await dispatch(
        updateCart({
          cartId: cart.id,
          products: { merge: false, products: updatedProducts },
        })
      );
    } finally {
      setProductSubmitting(product.id, false);
    }
  };

  const incrementProductQuantity = async (id: number) => {
    const result = validateCartAndProduct(cart, id);
    if (!result) return;

    setProductSubmitting(id, true);

    try {
      const { product, cart: validatedCart } = result;

      const updatedProducts = validatedCart.products.map(p =>
        p.id === id ? { ...p, quantity: product.quantity + 1 } : p
      );

      await dispatch(
        updateCart({
          cartId: validatedCart.id,
          products: { merge: false, products: updatedProducts },
        })
      );
    } finally {
      setProductSubmitting(id, false);
    }
  };

  const decrementProductQuantity = async (id: number) => {
    const result = validateCartAndProduct(cart, id);
    if (!result) return;

    setProductSubmitting(id, true);

    try {
      const { product, cart: validatedCart } = result;

      if (product.quantity <= 1) {
        const updatedProducts = validatedCart.products.filter(p => p.id !== id);

        await dispatch(
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

      await dispatch(
        updateCart({
          cartId: validatedCart.id,
          products: { merge: false, products: updatedProducts },
        })
      );
    } finally {
      setProductSubmitting(id, false);
    }
  };

  const updateProductQuantity = async (id: number, value: number) => {
    if (value < 1) {
      return;
    }

    setProductSubmitting(id, true);

    try {
      await dispatch(setQuantity({ productId: id, quantity: value }));
    } finally {
      setProductSubmitting(id, false);
    }
  };

  return {
    addProductToCart,
    incrementProductQuantity,
    decrementProductQuantity,
    updateProductQuantity,
    submittingProducts,
  };
};
