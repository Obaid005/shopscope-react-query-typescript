import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background: #f9f9f9;
    margin: 0;
    padding: 0;
    color: #222;
  }

  h1 {
    text-align: center;
    font-size: 2rem;
  }
`;

export default GlobalStyles;
