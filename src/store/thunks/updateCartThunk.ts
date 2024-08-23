import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  type UpdateCartRequestModel,
  UpdateCartRequestSchema,
  UpdateResponseCartSchema,
  type UpdateResponseCartModel,
} from '../../models/cartSchema';
import { toast } from 'react-toastify';
import { updateCartUrl } from '../../utils/functions/updateCartUrl';

interface UpdateCartParams {
  cartId: number;
  products: UpdateCartRequestModel;
}

export const updateCart = createAsyncThunk<
  UpdateResponseCartModel,
  UpdateCartParams,
  { rejectValue: string }
>('cart/updateCart', async ({ cartId, products }, { rejectWithValue }) => {
  try {
    const parsedBody = UpdateCartRequestSchema.safeParse(products);
    if (!parsedBody.success) {
      console.error('Request validation failed:', parsedBody.error.format());
      return rejectWithValue('Request validation failed');
    }
    const token = localStorage.getItem('token');
    const response = await fetch(updateCartUrl(cartId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(parsedBody.data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update cart: ${response.status}`);
    }

    const data = await response.json();
    const result = UpdateResponseCartSchema.safeParse(data);
    if (!result.success) {
      console.error('Data validation failed:', result.error.format());
      return rejectWithValue('Data validation failed');
    }

    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Something went wrong! Try again later.`);
      return rejectWithValue(`Error updating cart: ${error.message}`);
    }
    return rejectWithValue('Something went wrong!');
  }
});
