import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  ${normalize}
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fontFamily};
  }
  /* Full height layout */
  html, body {
    display: flex;
    min-height: 100vh;
    width: 100%;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .menu-button {
    -webkit-transition: -webkit-transform .3s ease-in-out;
    transition: transform .3s ease-in-out;
  }
  .menu-button:hover {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  .menu-wrapper .input-wrapper {
    margin-bottom: 0;
  }
`;

export default GlobalStyle;
