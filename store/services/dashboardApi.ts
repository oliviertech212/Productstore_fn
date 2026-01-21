import { baseApi } from '../baseApi';

export interface DashboardStats {
  totalProducts: number;
  totalRevenue: number;
  activeUsers: number;
  growthRate: number;
  revenueChange: string;
  usersChange: string;
  productsChange: string;
  growthChange: string;
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<{ success: boolean; data: DashboardStats }, void>({
      query: () => '/dashboard/stats',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;