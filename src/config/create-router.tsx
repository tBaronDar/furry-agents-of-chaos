import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { type AppStore } from './store';

// Lazy load components for better performance
const Layout = lazy(() => import('../shared/components/main-layout'));
const CatsList = lazy(() => import('../modules/cats-list/cats-list'));
const BreedsList = lazy(() => import('../modules/breeds-list/breeds-list'));
const Favorites = lazy(() => import('../modules/favorites/favorites'));
const CatModal = lazy(() => import('../components/CatModal/CatModal'));
const BreedModal = lazy(() => import('../components/BreedModal/BreedModal'));

//do i need the store here? we'll see
export default function router(_store: AppStore) {
  return createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <CatsList />,
      },
      {
        path: 'breeds',
        element: <BreedsList />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'cat/:id',
        element: <CatModal />,
      },
      {
        path: 'breed/:id',
        element: <BreedModal />,
      },
    ],
  },
  ]);
}
