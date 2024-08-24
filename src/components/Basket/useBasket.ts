/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateCart } from '../../store/thunks/updateCartThunk';
import { type CartProductModel } from '../../models/cartSchema';
import { validateCartAndProduct } from '../../utils/functions/validateCartAndUser';
import {
  addRemovedProduct,
} from '../../store/slices/cartSlice';
import { useCartActions } from '../../utils/useCartActions';



export const useBasket = () => {
  const dispatch = useAppDispatch();

  const {
    addProductToCart,
    incrementProductQuantity,
    decrementProductQuantity,
    updateProductQuantity,
    submittingProducts,
  } = useCartActions();

  const { cart, removedProducts, loading, error } = useAppSelector(
    state => state.cart
  );

  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleAddToCart = (product: CartProductModel) => {
    addProductToCart(product);
  };

  const handleIncrement = (id: number) => {
    incrementProductQuantity(id);
  };

  const handleDecrement = (id: number) => {
    decrementProductQuantity(id);
  };

  const handleInputChange = (id: number, value: number) => {
    updateProductQuantity(id, value);
  };

  const handleRemoveFromCart = (id: number) => {
    const result = validateCartAndProduct(cart, id);
    if (!result) {
      return;
    }

    const { cart: validatedCart, product } = result;

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
  };

  const allProducts =
    (!cart?.products || cart.products.length === 0) && removedProducts.length > 0
      ? removedProducts
      : [...(cart?.products || []), ...removedProducts];

  const showProductList =
    (cart && cart.products.length > 0) || removedProducts.length > 0;

  return {
    cart,
    removedProducts,
    loading,
    error,
    hoveredItem,
    setHoveredItem,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    handleInputChange,
    handleRemoveFromCart,
    allProducts,
    showProductList,
    submittingProducts
  };
};