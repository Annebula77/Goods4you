import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { type ProductProps } from '../../types/productType';
import { useCartActions } from '../../utils/useCartActions';
import { type CartProductModel } from '../../models/cartSchema';

const useProduct = ({ product }: ProductProps) => {
  const cart = useAppSelector(state => state.cart.cart);

  const [selectedImage, setSelectedImage] = useState(product.thumbnail);

  const cartItem = cart?.products.find(item => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const isAddedToCart = Boolean(cartItem);

  const {
    addProductToCart,
    incrementProductQuantity,
    decrementProductQuantity,
    updateProductQuantity,
  } = useCartActions();

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const handleAddToCart = () => {
    const productForCart: CartProductModel = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      discountPercentage: product.discountPercentage ?? 0,
      thumbnail: product.thumbnail,
      total: product.price * 1,
      discountedTotal:
        product.price * (1 - (product.discountPercentage ?? 0) / 100),
    };

    addProductToCart(productForCart);
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

  const noStock = product.stock <= currentQuantity;

  return {
    selectedImage,
    currentQuantity,
    isAddedToCart,
    handleImageClick,
    handleIncrement,
    handleDecrement,
    handleInputChange,
    handleAddToCart,
    noStock,
  };
};
export default useProduct;
