import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  LoginRequestSchema,
  LoginResponseSchema,
  type LoginRequestModel,
  type LoginResponseModel,
} from '../../models/loginSchema';
import { UserResponseSchema } from '../../models/userResponseSchema';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['User'],
  endpoints: builder => ({
    login: builder.mutation<LoginResponseModel, LoginRequestModel>({
      query: credentials => {
        const parsedCredentials = LoginRequestSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new Error(
            parsedCredentials.error.errors.map(err => err.message).join(', ')
          );
        }
        return {
          url: 'auth/login',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: parsedCredentials.data,
        };
      },
      transformResponse: response => {
        const parsedResponse = LoginResponseSchema.parse(response);

        localStorage.setItem('token', parsedResponse.token);

        return parsedResponse;
      },
      invalidatesTags: ['User'],
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
      transformErrorResponse: response => {
        if (response.status === 401 || response.status === 500) {
          localStorage.removeItem('token');
          window.location.replace('/login');
        }
        return response;
      },
      providesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery } = authApiSlice;
