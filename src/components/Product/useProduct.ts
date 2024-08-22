import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { type ProductProps } from '../../types/productType';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  updateQuantity,
} from '../../store/slices/cartSlice';
import { toast } from 'react-toastify';

const useProduct = ({ product }: ProductProps) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.cart);
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);

  const cartItem = cart?.products.find(item => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const isAddedToCart = Boolean(cartItem);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const handleIncrement = () => {
    if (currentQuantity === product.stock) {
      toast.error('You have reached the maximum quantity');
      return;
    }
    dispatch(incrementQuantity(product.id));
  };

  const hasStock = product.stock <= currentQuantity;

  const handleDecrement = () => {
    if (currentQuantity === 0) {
      return;
    }

    dispatch(decrementQuantity(product.id));
  };

  const handleInputChange = (value: number) => {
    if (value > 0 && value <= product.stock) {
      dispatch(updateQuantity({ id: product.id, quantity: value }));
    }
  };

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Out of stock');
      return;
    }
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        discountPercentage: product.discountPercentage ?? 0,
        thumbnail: product.thumbnail,
      })
    );
  };

  return {
    selectedImage,
    currentQuantity,
    isAddedToCart,
    handleImageClick,
    handleIncrement,
    handleDecrement,
    handleInputChange,
    handleAddToCart,
    hasStock,
  };
};
export default useProduct;
