import { authFetch } from "./auth-fetch";
import { BACKEND_URL } from "./constants";
import { asyncWrapper } from "./utils";

const baseUrl = BACKEND_URL + "/orders";

export type Order = {
  id: number;
  userId: number;
  totalAmount: string;
  status: string;
  createdAt: Date;
};

export const getTotalSales = async () => {
  return asyncWrapper(async () => {
    return authFetch<{ totalSales: number }>(
      baseUrl + "/total-sales-last-month",
      {
        method: "GET",
      },
    );
  });
};

export const getRecentOrdersCount = async () => {
  return await asyncWrapper(async () => {
    const res = await authFetch<{ count: number }>(
      baseUrl + "/recent-orders-count",
      {
        method: "GET",
      },
    );
    return res;
  });
};

export const getRecentOrders = async (page: number, limit: number) => {
  return asyncWrapper(async () => {
    return authFetch<{
      orders: (Omit<Order, "userId"> & { user: string })[];
      count: number;
    }>(baseUrl + `?page=${page}&limit=${limit}`, {
      method: "GET",
    });
  });
};
