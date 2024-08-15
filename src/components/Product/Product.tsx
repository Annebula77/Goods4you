import Button from '../Button/Button';
import PictureGallery from '../PictureGallery/PictureGallery';
import Rating from '../Rating/Rating';
import styles from './product.module.css';
import { discountedPrice } from '../../utils/functions/discountedPrice';
import { type ProductProps } from '../../types/productType';
import QuantityButton from '../QuantityButton/QuantityButton';
import useProduct from './useProduct';

const Product: React.FC<ProductProps> = ({ product }) => {
  const {
    selectedImage,
    currentQuantity,
    isAddedToCart,
    handleImageClick,
    handleIncrement,
    handleDecrement,
    handleInputChange,
    handleAddToCart,
  } = useProduct({ product });

  const priceWithDiscount = discountedPrice(
    product.price ?? 0,
    product.discountPercentage ?? 0
  );
  const hasDiscount = priceWithDiscount < product.price;

  // NOTE: if needed to be reused, should be moved to a separate component
  const stockMessage = () => {
    if (product.stock === 0) {
      return <p className={styles.outOfStock}>Out of Stock</p>;
    }
    if (product.stock <= 15) {
      return (
        <p className={styles.inStock}>In Stock - Only {product.stock} left!</p>
      );
    }
    return <p className={styles.inStock}>In Stock - Enough in stock!</p>;
  };

  return (
    <section className={styles.productContainer}>
      <figure className={styles.infoContainer}>
        <div className={styles.gallery}>
          <img
            className={styles.picture}
            src={selectedImage}
            alt={product.title}
            loading="lazy"
            decoding="async"
          />
          {product.images.length > 1 && (
            <PictureGallery
              images={product.images}
              name={product.title}
              onImageClick={handleImageClick}
            />
          )}
        </div>
        <figcaption className={styles.detailsContainer}>
          <h1 className={styles.title}>{product.title}</h1>
          <div
            className={styles.promotionContainer}
            aria-label="rating and categories"
          >
            <Rating rating={product.rating} />
            <p className={styles.categories}>{product.category}</p>
          </div>
          <div className={styles.stockContainer}>{stockMessage()}</div>
          <p className={styles.description}>{product.description}</p>
          <div
            className={styles.timesContainer}
            aria-label="delivery and warranty"
          >
            <p className={styles.times}>{product.warrantyInformation}</p>
            <p className={styles.times}>{product.shippingInformation}</p>
          </div>
          <article className={styles.productPricing}>
            <div className={styles.priceContainer}>
              {hasDiscount ? (
                <p className={styles.paragraphContainer}>
                  <span className={styles.price}>${priceWithDiscount}</span>
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
            {isAddedToCart ? (
              <QuantityButton
                quantity={currentQuantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onInputChange={handleInputChange}
                background
              />
            ) : (
              <Button onClick={handleAddToCart}>Add to cart</Button>
            )}
          </article>
        </figcaption>
      </figure>
    </section>
  );
};

export default Product;
