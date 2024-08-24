import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './Counter';
import styles from './counter.module.css';

describe('Counter', () => {
  it('renders with small container when quantity is less than 10', () => {
    render(<Counter quantity={5} />);

    expect(screen.getByText('5')).toBeInTheDocument();

    const container = screen.getByText('5').parentElement;
    expect(container).toHaveClass(styles.container);
    expect(container).toHaveClass(styles.small);
  });

  it('renders with large container when quantity is 10 or more', () => {
    render(<Counter quantity={25} />);

    expect(screen.getByText('25')).toBeInTheDocument();

    const container = screen.getByText('25').parentElement;
    expect(container).toHaveClass(styles.container);
    expect(container).toHaveClass(styles.large);
  });

  it('does not render when quantity is undefined', () => {
    const { container } = render(<Counter quantity={undefined} />);

    expect(container).toBeEmptyDOMElement();
  });
});
