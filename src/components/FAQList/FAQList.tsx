import Accordion from '../Accordion/Accordion';
import styles from './faqList.module.css';
import faqData from '../../utils/mocks/faqData';

const FAQList = () => {
  return (
    <section className={styles.faqContainer}>
      <h2 id="faq" className={styles.title}>
        FAQ
      </h2>
      <ul className={styles.list}>
        {faqData.map((faq, index) => (
          <li key={`faq-${index}`}>
            <Accordion
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FAQList;
