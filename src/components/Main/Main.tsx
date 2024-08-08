import { ReactNode } from 'react';
import styles from './main.module.css';

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => (
  <main className={styles.mainContainer}>{children}</main>
);

export default Main;
