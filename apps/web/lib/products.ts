import { authFetch } from "./auth-fetch";
import { BACKEND_URL } from "./constants";
import { asyncWrapper } from "./utils";

const baseUrl = BACKEND_URL + "/products";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  stockQuantity: number;
  category: { name: string };
  imageUrl: string;
  createdAt: string;
};

export const getProductsCount = async () => {
  return asyncWrapper(async () => {
    return authFetch<{ count: number }>(baseUrl + "/count", { method: "GET" });
  });
};

export const getAll = async (page: number, limit: number) => {
  return asyncWrapper(async () => {
    return authFetch<{ products: Product[]; count: number }>(
      baseUrl + `?page=${page}&limit=${limit}`,
      {
        method: "GET",
      },
    );
  });
};

export const findProduct = (productId: number) => {
  return asyncWrapper(async () => {
    return authFetch<Product>(baseUrl + `/${productId}`, {
      method: "GET",
    });
  });
};
