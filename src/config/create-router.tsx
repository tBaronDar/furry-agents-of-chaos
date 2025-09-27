import { createBrowserRouter, redirect } from 'react-router-dom';
import { lazy } from 'react';
import { type AppStore } from './store';

// Lazy load components for better performance
const Layout = lazy(() => import('../shared/components/main-layout'));
const CatsList = lazy(() => import('../modules/cats-list/cats-list'));
const BreedsList = lazy(() => import('../modules/breeds-list/breeds-list'));
const Favorites = lazy(() => import('../modules/favorites/favorites'));
const BreedModal = lazy(() => import('../shared/components/modals/breed-modal'));
const About = lazy(() => import('../modules/about/about')); //not really a module, but i'll leave it here for now

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
          path: 'breed/:id',
          element: <BreedModal />,
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
        redirect('/');
      },
    },
  ]);
}
