import React from "react";
import { IProduct } from "../../types/product";
import { useFavoriteProducts } from "../../context/FavouritesContext";
import {
  Card,
  Image,
  Title,
  Price,
  FavoriteButton,
} from "../styled/CardStyles";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleFavorite, isProductFavorite, isLoading } =
    useFavoriteProducts();
  const isFavorite = isProductFavorite(product.id);

  return (
    <Card>
      <Image src={product.thumbnail} alt={product.title} />
      <Title>{product.title}</Title>
      <Price>${product.price}</Price>
      <FavoriteButton
        onClick={() => toggleFavorite(product)}
        disabled={isLoading}
      >
        {/* 
          Show loading indicator while favorites are being loaded from localStorage
          This prevents showing incorrect favorite state during the race condition
        */}
        {isLoading ? "⏳" : isFavorite ? "❤️" : "🤍"}
      </FavoriteButton>
    </Card>
  );
};
