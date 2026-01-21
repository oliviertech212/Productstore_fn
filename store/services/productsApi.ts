import { baseApi } from '../baseApi';
import type { Product, ApiResponse } from '@/types';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse<Product[]>, any>({
      query: (params) => ({
        url: '/products',
        params,
      }),
      providesTags: ['Products'],
    }),
    getPublicProducts: builder.query<ApiResponse<Product[]>, any>({
      query: (params) => ({
        url: '/products/public',
        params,
      }),
      providesTags: ['Products'],
    }),
    getProductById: builder.query<ApiResponse<Product>, string>({
      query: (id) => `/products/${id}`,
      providesTags: ['Products'],
    }),
    getProductBySlug: builder.query<ApiResponse<Product>, string>({
      query: (slug) => `/products/public/slug/${slug}`,
      providesTags: ['Products'],
    }),
    createProduct: builder.mutation<ApiResponse<Product>, Partial<Product>>({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<ApiResponse<Product>, { id: string; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetPublicProductsQuery,
  useGetProductByIdQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
