import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type FullProductModel } from '../../models/fullProductSchema';

export interface SearchParams {
  q: string;
  limit: number;
  skip: number;
}

export const productsApiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Products'],
  endpoints: builder => ({
    getProducts: builder.query<
      { products: FullProductModel[]; total: number },
      SearchParams
    >({
      query: ({ q, limit, skip }) => ({
        url: `auth/products/search`,
        params: { q, limit, skip },
      }),
      providesTags: ['Products'],
    }),
    getProductById: builder.query<FullProductModel, number>({
      query: id => `auth/products/${id}`,
      providesTags: (result, error, id) => {
        if (error) {
          return [];
        }
        return result ? [{ type: 'Products', id }] : [];
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;
