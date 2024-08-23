import styles from './productsGallery.module.css';
import ProductListItem from '../ProductListItem/ProductListItem';
import { type ProductWithCartInfo } from '../../types/productType';

interface ProductsGalleryProps {
  products: ProductWithCartInfo[] | undefined;
  onAddToCart: (product: ProductWithCartInfo) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onInputChange: (id: number, value: number) => void;
  disabled?: boolean;
  submittingProducts?: { [key: number]: boolean };
}
const ProductsGallery: React.FC<ProductsGalleryProps> = ({
  products,
  onAddToCart,
  onIncrement,
  onDecrement,
  onInputChange,
  submittingProducts,
}) => {
  return (
    <ul className={styles.list}>
      {products?.map(product => (
        <li key={product.id}>
          <ProductListItem
            id={product.id}
            thumbnail={product.thumbnail}
            title={product.title}
            price={product.price}
            discountPercentage={product.discountPercentage}
            stock={product.stock}
            currentQuantity={product.currentQuantity}
            isAddedToCart={product.isAddedToCart}
            onAddToCart={() => onAddToCart(product)}
            onIncrement={() => onIncrement(product.id)}
            onDecrement={() => onDecrement(product.id)}
            onInputChange={value => onInputChange(product.id, value)}
            disabled={submittingProducts?.[product.id]}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductsGallery;
