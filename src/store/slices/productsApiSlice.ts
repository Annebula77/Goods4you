import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type FullProductModel } from '../../models/fullProductSchema';

export interface SearchParams {
  q: string;
  limit: number;
  skip: number;
}

export const productsApiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  tagTypes: ['Products'],
  endpoints: builder => ({
    getProducts: builder.query<
      { products: FullProductModel[]; total: number },
      SearchParams
    >({
      query: ({ q, limit, skip }) => ({
        url: `/products/search`,
        params: { q, limit, skip },
      }),
      transformResponse: (response: {
        data: { products: FullProductModel[]; total: number };
      }) => {
        return response.data;
      },
      providesTags: ['Products'],
    }),
    getProductById: builder.query<FullProductModel, number>({
      query: id => `/products/${id}`,
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
