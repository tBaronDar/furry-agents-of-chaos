import { createBrowserRouter, redirect } from 'react-router-dom';
import { lazy } from 'react';
import { type AppStore } from './store';
import CatModal from '../shared/components/modals/cat-details/cat-modal';

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
      loader() {
        return redirect('/cats');
      },
    },
    {
      path: '',
      element: <Layout />,
      children: [
        {
          path: 'cats',
          element: <CatsPage />,
          children: [
            {
              path: ':catId',
              element: <CatModal />,
            },
          ],
        },
        {
          path: 'breeds',
          element: <BreedsList />,
          children: [
            {
              path: ':catId',
              element: <CatModal />,
            },
          ],
        },
        {
          path: 'favorites',
          element: <FavoritesPage />,
        },
        {
          path: 'about',
          element: <About />,
        },
      ],
    },
    {
      path: '*',
      loader() {
        return redirect('/cats');
      },
    },
  ]);
}
