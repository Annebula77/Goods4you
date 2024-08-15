import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { type ProductProps } from '../../types/productType';

const useProduct = ({ product }: ProductProps) => {
  const cart = useAppSelector(state => state.cart.cart);

  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [currentQuantity, setCurrentQuantity] = useState(product.stock);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const handleIncrement = () => {
    setCurrentQuantity(prevStock => {
      if (prevStock < product.stock) {
        return prevStock + 1;
      }
      return prevStock;
    });
  };

  const handleDecrement = () => {
    setCurrentQuantity(prevStock => (prevStock > 1 ? prevStock - 1 : 0));
  };

  const handleInputChange = (value: number) => {
    if (value > 0) {
      setCurrentQuantity(value);
    }
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setCurrentQuantity(1);
  };

  useEffect(() => {
    const cartItem = cart?.products.find(item => item.id === product.id);
    if (cartItem) {
      setCurrentQuantity(cartItem.quantity);
      setIsAddedToCart(true);
    }
  }, [cart, product.id]);

  useEffect(() => {
    if (currentQuantity === 0) {
      setIsAddedToCart(false);
    }
  }, [currentQuantity]);

  return {
    selectedImage,
    currentQuantity,
    isAddedToCart,
    handleImageClick,
    handleIncrement,
    handleDecrement,
    handleInputChange,
    handleAddToCart,
  };
};
export default useProduct;
