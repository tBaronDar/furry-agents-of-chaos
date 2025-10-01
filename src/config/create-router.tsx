import { createBrowserRouter, redirect } from 'react-router-dom';
import { lazy } from 'react';
import { type AppStore } from './store';
import CatModal from '../shared/components/modals/cat-details/cat-modal';
import RouterErrorFallback from '../shared/components/router-error-fallback';

// Lazy load components for better performance
const Layout = lazy(() => import('../shared/components/main-layout'));
const CatsPage = lazy(() => import('../modules/cats/cats-page'));
const BreedsList = lazy(() => import('../modules/breeds/breeds-page'));
const FavoritesPage = lazy(() => import('../modules/favorites/favorites-page'));
const About = lazy(() => import('../modules/about/about')); //not really a module, but i'll leave it here for now

//do i need the store here? we'll see
export default function router(_store: AppStore) {
  return createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <RouterErrorFallback />,
      loader() {
        return redirect('/cats');
      },
    },
    {
      path: '',
      element: <Layout />,
      errorElement: <RouterErrorFallback />,
      children: [
        {
          path: 'cats',
          element: <CatsPage />,
          errorElement: <RouterErrorFallback />,
          children: [
            {
              path: ':catId',
              element: <CatModal />,
              errorElement: <RouterErrorFallback />,
            },
          ],
        },
        {
          path: 'breeds',
          element: <BreedsList />,
          errorElement: <RouterErrorFallback />,
          children: [
            {
              path: ':catId',
              element: <CatModal />,
              errorElement: <RouterErrorFallback />,
            },
          ],
        },
        {
          path: 'favorites',
          element: <FavoritesPage />,
          errorElement: <RouterErrorFallback />,
        },
        {
          path: 'about',
          element: <About />,
          errorElement: <RouterErrorFallback />,
        },
      ],
    },
    {
      path: '*',
      errorElement: <RouterErrorFallback />,
      loader() {
        return redirect('/cats');
      },
    },
  ]);
}
