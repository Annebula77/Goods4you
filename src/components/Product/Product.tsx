import { type ProductType } from '../../types/productType';
import { monthConverter } from '../../utils/functions/monthConverter';
import { pluralConverter } from '../../utils/functions/pluralConverter';
import Button from '../Button/Button';
import styles from './product.module.css';

interface ProductProps {
  product: ProductType;
}
const Product: React.FC<ProductProps> = ({ product }) => {
  const hasDiscount = product.discountedPrice < product.price;
  const deliveryTime = monthConverter(product.deliveryTimeInDays);
  const warrantyTime = pluralConverter(product.warrantyPeriodInMonths, 'month');
  return (
    <section className={styles.productContainer}>
      <figure className={styles.infoContainer}>
        <div className={styles.gallery}>
          <img
            className={styles.picture}
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption className={styles.detailsContainer}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <div
            className={styles.timesContainer}
            aria-label="delivery and warranty"
          >
            <p className={styles.times}>{warrantyTime} warranty</p>
            <p className={styles.times}>Ships in {deliveryTime}</p>
          </div>
          <article className={styles.productPricing}>
            <div className={styles.priceContainer}>
              {hasDiscount ? (
                <p className={styles.paragraphContainer}>
                  <span className={styles.price}>
                    ${product.discountedPrice}
                  </span>
                  <span className={styles.originalPrice}>
                    <del>${product.price}</del>
                  </span>
                </p>
              ) : (
                <p>
                  <span className={styles.price}>${product.price}</span>
                </p>
              )}
              <p className={styles.discount}>
                Your discount:
                <span className={styles.discountPercentage}>
                  {product.discountPercentage}%
                </span>
              </p>
            </div>
            <Button>Add to cart</Button>
          </article>
        </figcaption>
      </figure>
    </section>
  );
};

export default Product;
