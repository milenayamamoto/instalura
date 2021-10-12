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
  .rotate-button {
    -webkit-transition: -webkit-transform .2s ease-in-out;
    transition: transform .2s ease-in-out;
  }
  .rotate-button:hover {
    -webkit-transform: rotate(720deg);
    transform: rotate(720deg);
  }
  .menu-wrapper .input-wrapper {
    margin-bottom: 0;
  }
  .card-container {
    position: relative;
  }
  .card-image {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
  }
  .card-overlay {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }
  .card-icon {
    width: 100px;
    filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
  }
  .icon-liked {
    filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
  }
  .card-container:hover .card-image {
    opacity: 0.7;
  }
  .card-container:hover .card-overlay {
    opacity: 1;
  }
`;

export default GlobalStyle;
