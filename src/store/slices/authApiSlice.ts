import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  LoginResponseSchema,
  type LoginRequestModel,
  type LoginResponseModel,
} from '../../models/loginSchema';
import { UserResponseSchema } from '../../models/userResponseSchema';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: builder => ({
    login: builder.mutation<LoginResponseModel, LoginRequestModel>({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
      transformResponse: response => {
        const parsedResponse = LoginResponseSchema.parse(response);

        localStorage.setItem('token', parsedResponse.token);

        return parsedResponse;
      },
    }),
    getUser: builder.query({
      query: () => {
        const token = localStorage.getItem('token');
        return {
          url: 'auth/me',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: response => {
        const parsedResponse = UserResponseSchema.parse(response);
        return {
          id: parsedResponse.id,
          firstName: parsedResponse.firstName,
          lastName: parsedResponse.lastName,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery } = authApiSlice;
