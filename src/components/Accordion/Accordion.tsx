import { useState } from 'react';
import styles from './accordion.module.css';
import PlusIcon from '../icons/PlusIcon';

interface AccordionProps {
  question: string;
  answer: string;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <article className={styles.accordion}>
      <div className={`${styles.item} ${!isOpen ? styles.close : styles.item}`}>
        <button
          className={styles.label}
          onClick={toggleAccordion}
          aria-expanded={isOpen}
        >
          <span>{question}</span>
          <span
            className={`${styles.iconWrapper} ${isOpen ? styles.open : ''}`}
          >
            <PlusIcon
              fill="rgba(255, 255, 255, 1)"
              width={25}
              height={25}
              aria-label="Open button icon"
            />
          </span>
        </button>
        <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </article>
  );
};

export default Accordion;
