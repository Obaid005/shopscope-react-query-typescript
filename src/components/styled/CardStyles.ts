import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

export const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

export const Title = styled.h3`
  font-size: 1.1rem;
  margin-top: 0.5rem;
`;

export const Price = styled.p`
  color: #333;
  font-weight: bold;
  margin-top: 0.25rem;
`;

export const FavoriteButton = styled.button`
  margin-top: 0.5rem;
  background: none;
  border: none;
  color: #e63946;
  font-size: 0.9rem;
  cursor: pointer;
`;
