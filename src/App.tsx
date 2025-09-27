import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import { store, persistor } from './config/store'

import './App.css'

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       <React.Suspense fallback={<div>Loading...</div>}>
       <RouterProvider router={router} />
       </React.Suspense>
      </PersistGate>
    </Provider>
    )
}

export default App
