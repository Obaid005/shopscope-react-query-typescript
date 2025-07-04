import axios from "axios";
import { IRootProducts } from "../types/product";
import { BASE_URL, PAGE_LIMIT } from "../utils/constants";

const api = axios.create({ baseURL: BASE_URL });

/**
 * Fetches a paginated list of products from the API
 *
 * @param skip - Number of products to skip (for pagination)
 * @returns Promise<IRootProducts> - Paginated products data
 */
export const getProducts = async (skip = 0): Promise<IRootProducts> => {
  const { data } = await api.get<IRootProducts>("/products", {
    params: { limit: PAGE_LIMIT, skip },
  });
  return data;
};

/**
 * Searches for products by title with pagination support
 *
 * @param query - Search query string to filter products by title
 * @param skip - Number of products to skip (for pagination)
 * @returns Promise<IRootProducts> - Paginated search results
 */
export const searchProducts = async (
  query: string,
  skip = 0
): Promise<IRootProducts> => {
  const { data } = await api.get<IRootProducts>("/products/search", {
    params: { q: query, limit: PAGE_LIMIT, skip },
  });
  return data;
};
