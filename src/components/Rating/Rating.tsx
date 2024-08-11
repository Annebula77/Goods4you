import StarIcon from '../icons/StarIcon';
import styles from './rating.module.css';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  starSize?: number;
}

const Rating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  starSize = 17,
}) => {
  const stars = Array.from({ length: maxRating }, (_, index) => {
    const fillColor =
      index < rating ? 'rgba(241, 79, 79, 1)' : 'rgba(213, 213, 213, 1)';
    return (
      <StarIcon
        key={index}
        width={starSize}
        height={starSize}
        fill={fillColor}
      />
    );
  });

  return <div className={styles.rating}>{stars}</div>;
};

export default Rating;
