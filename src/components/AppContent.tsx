import React, { useState } from "react";
import { ProductGrid } from "./ui/ProductGrid";
import { useFavoriteProducts } from "../context/FavouritesContext";
import { SearchBar } from "./ui/SearchBar";
import { AppWrapper, Header, FavoritesBadge } from "./styled/AppContentStyles";

export const AppContent: React.FC = () => {
  const { favoriteProducts, isLoading } = useFavoriteProducts();
  const [search, setSearch] = useState("");
  const favoritesCount = Object.keys(favoriteProducts).length;

  return (
    <AppWrapper>
      <Header>
        <h1>🛍️ ShopScope</h1>
        {!isLoading && favoritesCount > 0 && (
          <FavoritesBadge>
            ❤️ {favoritesCount}{" "}
            {favoritesCount === 1 ? "favorite" : "favorites"}
          </FavoritesBadge>
        )}
      </Header>
      <SearchBar onSearchChange={setSearch} />
      <ProductGrid search={search} />
    </AppWrapper>
  );
};

