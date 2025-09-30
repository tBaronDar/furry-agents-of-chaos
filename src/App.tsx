import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom';
import { store, persistor } from './config/store';
import createRouter from './config/create-router';
import ErrorBoundary from './shared/components/error-boundary';

// import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={createRouter(store)} fallbackElement={<div>Loading...</div>} />
          </React.Suspense>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
