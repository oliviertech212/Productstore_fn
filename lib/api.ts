import axios from 'axios';
import type { LoginData, RegisterData, AuthResponse, Product, ApiResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (data: LoginData) => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data;
  },
  register: async (data: RegisterData) => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data;
  },
};

export const productApi = {
  getAll: async (params?: any) => {
    const response = await api.get<ApiResponse<Product[]>>('/products', { params });
    return response.data;
  },
  getPublic: async (params?: any) => {
    const response = await api.get<ApiResponse<Product[]>>('/products/public', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data;
  },
  getBySlug: async (slug: string) => {
    const response = await api.get<ApiResponse<Product>>(`/products/public/slug/${slug}`);
    return response.data;
  },
  create: async (data: Partial<Product>) => {
    const response = await api.post<ApiResponse<Product>>('/products', data);
    return response.data;
  },
  update: async (id: string, data: Partial<Product>) => {
    const response = await api.patch<ApiResponse<Product>>(`/products/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/products/${id}`);
    return response.data;
  },
};

export default api;
