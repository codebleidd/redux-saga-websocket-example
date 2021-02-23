import * as React from 'react';
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './component/ColorModeSwitcher/ColorModeSwitcher';
import { Logo } from './component/icon/Logo/Logo';
import { Provider } from 'react-redux';
import { store } from './store/app.store';
import { Router } from './router/router';

export const App = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  </Provider>
);
