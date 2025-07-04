import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { IProduct } from "../types/product";
import { getFromStorage, setToStorage } from "../utils/storage";

/* ------------------------------------------------------------------
   Types
-------------------------------------------------------------------*/

type FavoriteProductsDictionary = Record<number, IProduct>;

interface FavoriteProductsContextValue {
  favoriteProducts: FavoriteProductsDictionary;
  toggleFavorite: (product: IProduct) => void;
  isProductFavorite: (productId: number) => boolean;
  isLoading: boolean; // Loading state to prevent race conditions
}

/* ------------------------------------------------------------------
   Constants
-------------------------------------------------------------------*/

const FAVORITES_STORAGE_KEY = "shopscope_favorites";

/* ------------------------------------------------------------------
   Context
-------------------------------------------------------------------*/

const FavoriteProductsContext =
  createContext<FavoriteProductsContextValue | null>(null);

export const FavoriteProductsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] =
    useState<FavoriteProductsDictionary>({});

  /**
   * Loading state to prevent race conditions during localStorage operations
   *
   * RACE CONDITION PROBLEM:
   * - Components try to access favorites immediately on render
   * - localStorage operations are asynchronous (useEffect runs after render)
   * - This causes components to see empty favorites even when data exists in localStorage
   *
   * SOLUTION:
   * - Start with isLoading = true
   * - Only allow components to access favorites after localStorage is loaded
   * - Prevent premature saving to localStorage during initial load
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load favorites from localStorage on component mount
   *
   * This useEffect runs once when the component mounts and:
   * 1. Reads data from localStorage synchronously
   * 2. Updates the state with loaded favorites
   * 3. Sets isLoading to false to signal that data is ready
   * 4. Handles any errors gracefully by falling back to empty favorites
   */
  useEffect(() => {
    try {
      const storedFavorites = getFromStorage<FavoriteProductsDictionary>(
        FAVORITES_STORAGE_KEY,
        {}
      );
      setFavoriteProducts(storedFavorites);
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavoriteProducts({});
    } finally {
      // Always set loading to false, even if there's an error
      setIsLoading(false);
    }
  }, []);

  /**
   * Save favorites to localStorage whenever they change
   *
   * IMPORTANT: Only save when isLoading is false to prevent:
   * - Saving empty state during initial load
   * - Overwriting localStorage with empty data
   * - Race conditions between loading and saving
   */
  useEffect(() => {
    if (!isLoading) {
      setToStorage(FAVORITES_STORAGE_KEY, favoriteProducts);
    }
  }, [favoriteProducts, isLoading]);

  /**
   * Toggle favorite status for a product
   *
   * This function is safe to call even during loading state
   * as it only updates the local state, not localStorage directly
   */
  const toggleFavorite = (product: IProduct) => {
    setFavoriteProducts((previousFavoriteProducts) => {
      // Always work with a shallow copy to keep state immutable
      const updatedFavoriteProducts: FavoriteProductsDictionary = {
        ...previousFavoriteProducts,
      };

      if (updatedFavoriteProducts[product.id]) {
        // If the product is already a favourite, remove it
        delete updatedFavoriteProducts[product.id];
      } else {
        // Otherwise add it
        updatedFavoriteProducts[product.id] = product;
      }

      return updatedFavoriteProducts;
    });
  };

  /**
   * Memoized context value to prevent unnecessary re-renders
   * Includes isLoading state so components can handle loading properly
   */
  const value: FavoriteProductsContextValue = useMemo(
    () => ({
      favoriteProducts,
      toggleFavorite,
      isProductFavorite: (productId: number) => productId in favoriteProducts,
      isLoading,
    }),
    [favoriteProducts, isLoading]
  );

  return (
    <FavoriteProductsContext.Provider value={value}>
      {children}
    </FavoriteProductsContext.Provider>
  );
};

/* ------------------------------------------------------------------
   Hook
-------------------------------------------------------------------*/

export const useFavoriteProducts = (): FavoriteProductsContextValue => {
  const context = useContext(FavoriteProductsContext);
  if (context === null) {
    throw new Error(
      "useFavoriteProducts must be used within a FavoriteProductsProvider"
    );
  }
  return context;
};
