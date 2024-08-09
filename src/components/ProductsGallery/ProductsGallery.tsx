import styles from './productsGallery.module.css';
import ProductListItem from '../ProductListItem/ProductListItem';
import productListMock from '../../utils/mocks/productListMock';

const ProductsGallery = () => {
  return (
    <ul className={styles.list}>
      {productListMock.map(product => (
        <li key={product.id}>
          <ProductListItem
            id={product.id}
            imageUrl={product.image}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductsGallery;
