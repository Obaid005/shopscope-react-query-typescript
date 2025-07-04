import React from "react";
import styled from "styled-components";
import { useProducts } from "../../hooks/useProducts";
import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ search }: { search: string }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useProducts(search);

  if (isLoading) {
    return <LoadingMessage>Loading products...</LoadingMessage>;
  }

  if (isError) {
    return (
      <ErrorMessage>Error loading products. Please try again.</ErrorMessage>
    );
  }

  if (!data?.pages.length || data.pages[0].products.length === 0) {
    return <NoResultsMessage>No products found.</NoResultsMessage>;
  }

  return (
    <Container>
      <Grid>
        {data.pages.map((page) =>
          page.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Grid>

      {hasNextPage && (
        <LoadMore onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </LoadMore>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const LoadMore = styled.button`
  margin: 2rem auto 0;
  display: block;
  padding: 0.75rem 1.5rem;
  background: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:disabled {
    background: #888;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #333;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #e63946;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #666;
`;
