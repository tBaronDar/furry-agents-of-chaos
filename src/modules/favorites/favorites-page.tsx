import React from 'react';
import { Typography, Box } from '@mui/material';
import useFavoritesPage from './hooks/use-favorites-page';
import FavoritesList from './components/favorites-list';

const FavoritesPage: React.FC = () => {
  const { favoriteCats } = useFavoritesPage();

  if (favoriteCats.length === 0) {
    return (
      <Box>
        <Typography variant='h4' component='h1' gutterBottom>
          My Favorites
        </Typography>
        <Typography variant='body1' color='warning'>
          No favorites found. Please add some.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        My Favorites
      </Typography>
      <FavoritesList favoriteCats={favoriteCats} />
    </Box>
  );
};

export default FavoritesPage;
