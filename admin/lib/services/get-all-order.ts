import { apiFetch } from "@/lib/api";
import { AllFoodOrders } from "@/types";

export type OrdersResponse = {
  orders: AllFoodOrders[];
  total: number;
  page: number;
  pages: number;
};

export const fetchAllOrders = (): Promise<OrdersResponse> =>
  apiFetch<OrdersResponse>("/api/orders?limit=50");
