import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-top: 2rem;
`;

export const LoadMore = styled.button`
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
`;

export const Message = styled.p`
  text-align: center;
  margin-top: 2rem;
`;
