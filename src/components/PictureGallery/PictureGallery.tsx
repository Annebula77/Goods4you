import { useState } from 'react';
import { GalleryItem } from '../../types/productType';
import styles from './pictureGallery.module.css';

interface PictureGalleryProps {
  images: GalleryItem[];
  name: string;
  width?: number;
  height?: number;
  onImageClick: (url: string) => void;
}

const PictureGallery: React.FC<PictureGalleryProps> = ({
  images,
  name,
  width = 70,
  height = 70,
  onImageClick,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleImageClick = (url: string, index: number) => {
    setActiveIndex(index);
    onImageClick(url);
  };
  return (
    <ul className={styles.pictureGallery}>
      {images.map((image, index) => (
        <li
          key={index}
          className={`{styles.pictureGalleryItem} ${width} ${height}`}
        >
          <img
            className={`${styles.pictureGalleryImage} 
            ${activeIndex === index ? styles.active : ''}`}
            src={image.url}
            alt={`${name} ${index + 1}`}
            loading="lazy"
            decoding="async"
            onClick={() => handleImageClick(image.url, index)}
          />
        </li>
      ))}
    </ul>
  );
};

export default PictureGallery;
