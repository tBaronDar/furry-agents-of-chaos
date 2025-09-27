import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';
import { store, persistor } from './config/store';
import theme from './config/theme';
import createRouter from './config/create-router';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <React.Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={createRouter(store)} />
          </React.Suspense>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
