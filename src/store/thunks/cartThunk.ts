import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartModel, CartResponseSchema } from '../../models/cartSchema';
import { toast } from 'react-toastify';
import { getCartUrl } from '../../utils/functions/getCartUrl';

interface FetchCartParams {
  userId: number;
}

export const fetchCart = createAsyncThunk<
  CartModel | null,
  FetchCartParams,
  { rejectValue: string }
>('cart/fetchCart', async ({ userId }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getCartUrl(userId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.replace('/login');
      return rejectWithValue('Unauthorized. Redirecting to login.');
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch cart data: ${response.status}`);
    }
    const data = await response.json();
    const result = CartResponseSchema.safeParse(data);
    if (!result.success) {
      console.error('Data validation failed:', result.error.format());
      return rejectWithValue('Data validation failed');
    }

    if (result.data.carts.length === 0) {
      return null;
    }

    const firstCart = result.data.carts[0];
    return firstCart;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Something went wrong! Try again later.`);
      return rejectWithValue(`Error fetching cart data: ${error.message}`);
    }
    return rejectWithValue('Something went wrong!');
  }
});
