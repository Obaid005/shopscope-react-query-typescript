import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts, searchProducts } from "../services/product.service";
import { IRootProducts } from "../types/product";

/**
 * Custom hook for fetching products with infinite pagination and search functionality
 *
 * @param search - Search query string to filter products by title
 * @returns Infinite query result with products data, pagination controls, and loading states
 *
 * Features:
 * - Infinite pagination with "Load More" functionality
 * - Search products by title with debounced input
 * - Automatic cache management via React Query
 * - Loading, error, and success states
 */
export const useProducts = (search: string) => {
  return useInfiniteQuery({
    // Unique query key that includes search term for proper cache management
    // When search changes, React Query will automatically refetch data
    queryKey: ["products", search],

    // Query function that fetches data for each page
    // pageParam represents the current page offset (skip value)
    queryFn: ({ pageParam = 0 }) =>
      search
        ? searchProducts(search, pageParam as number) // Search API when search term exists
        : getProducts(pageParam as number), // Regular products API when no search

    // Determines if there are more pages to load and calculates next page offset
    // This enables the "Load More" button functionality
    getNextPageParam: (lastPage: IRootProducts) => {
      // Check if current page + limit is less than total products
      const hasMore = lastPage.skip + lastPage.limit < lastPage.total;

      // Return next page offset if more data exists, undefined if no more pages
      return hasMore ? lastPage.skip + lastPage.limit : undefined;
    },

    // Starting page parameter (offset = 0 for first page)
    initialPageParam: 0,
  });
};
