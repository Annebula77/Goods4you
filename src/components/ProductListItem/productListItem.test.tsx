import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductListItem from './ProductListItem';
import { BrowserRouter as Router } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const defaultProps = {
  id: 1,
  thumbnail: 'test-thumbnail.jpg',
  title: 'Test Product',
  price: 100,
  stock: 10,
  discountPercentage: 20,
  currentQuantity: 0,
  isAddedToCart: false,
  onAddToCart: vi.fn(),
  onIncrement: vi.fn(),
  onDecrement: vi.fn(),
  onInputChange: vi.fn(),
  disabled: false,
};

describe('ProductListItem', () => {
  it('should render the product information correctly', () => {
    render(
      <Router>
        <ProductListItem {...defaultProps} />
      </Router>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$80')).toBeInTheDocument(); // 20% discount from $100
    expect(screen.getByAltText('Test Product')).toHaveAttribute(
      'src',
      'test-thumbnail.jpg'
    );
  });

  it('should call navigate when the product is clicked', () => {
    render(
      <Router>
        <ProductListItem {...defaultProps} />
      </Router>
    );

    const listItem = screen.getByRole('article');
    fireEvent.click(listItem);

    expect(mockNavigate).toHaveBeenCalledWith('/product/1');
  });

  it('should display "Add to cart" button when not added to cart', () => {
    render(
      <Router>
        <ProductListItem {...defaultProps} stock={3} />
      </Router>
    );

    const addToCartButton = screen.getByTestId('add-to-cart-button');

    expect(addToCartButton).toBeInTheDocument();
  });

  it('should display quantity controls when added to cart', () => {
    render(
      <Router>
        <ProductListItem
          {...defaultProps}
          isAddedToCart={true}
          currentQuantity={1}
        />
      </Router>
    );

    expect(screen.getByDisplayValue('1 item')).toBeInTheDocument();
  });

  it('should call onAddToCart when "Add to cart" button is clicked', () => {
    render(
      <Router>
        <ProductListItem {...defaultProps} />
      </Router>
    );
    const addToCartButton = screen.getByTestId('add-to-cart-button');
    fireEvent.click(addToCartButton);

    expect(defaultProps.onAddToCart).toHaveBeenCalledWith(1);
  });

  it('should not add to cart if stock is 0', () => {
    render(
      <Router>
        <ProductListItem {...defaultProps} stock={0} />
      </Router>
    );

    const addToCartButton = screen.getByTestId('add-to-cart-button');

    expect(addToCartButton).toBeDisabled();

    fireEvent.click(addToCartButton);

    expect(defaultProps.onAddToCart).not.toHaveBeenCalled();
  });

  it('should increment the quantity when increment button is clicked', () => {
    render(
      <Router>
        <ProductListItem
          {...defaultProps}
          isAddedToCart={true}
          currentQuantity={1}
        />
      </Router>
    );
    const incrementButton = screen.getByTestId('increment-button');
    fireEvent.click(incrementButton);

    expect(defaultProps.onIncrement).toHaveBeenCalledWith(1);
  });

  it('should not increment the quantity if currentQuantity >= stock', () => {
    render(
      <Router>
        <ProductListItem
          {...defaultProps}
          isAddedToCart={true}
          currentQuantity={10}
          stock={10}
        />
      </Router>
    );

    const incrementButton = screen.getByTestId('increment-button');
    fireEvent.click(incrementButton);

    expect(defaultProps.onIncrement).not.toHaveBeenCalled();
  });
});
