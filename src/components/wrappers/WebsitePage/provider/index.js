import React from 'react';
import PropTypes from 'prop-types';
import SnackbarProvider from 'react-simple-snackbar';
import { ThemeProvider } from 'styled-components';
import theme from '../../../../theme';
import GlobalStyle from '../../../../theme/GlobalStyle';

export default function WebsiteGlobalProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <GlobalStyle />
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  );
}

WebsiteGlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
