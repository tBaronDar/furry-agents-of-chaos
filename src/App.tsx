import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { store, persistor } from './config/store';
import createRouter from './config/create-router';
import theme from './config/theme';
import CustomLoadingSpinner from './shared/components/custom-loading-spinner';

// import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={<CustomLoadingSpinner />} persistor={persistor}>
          <React.Suspense fallback={<CustomLoadingSpinner />}>
            <RouterProvider router={createRouter(store)} />
          </React.Suspense>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
