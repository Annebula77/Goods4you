import styles from './productsGallery.module.css';
import ProductListItem from '../ProductListItem/ProductListItem';
import { type ListProductType } from '../../types/productType';

interface ProductsGalleryProps {
  products: ListProductType[] | undefined;
}
const ProductsGallery: React.FC<ProductsGalleryProps> = ({ products }) => {
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
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductsGallery;
