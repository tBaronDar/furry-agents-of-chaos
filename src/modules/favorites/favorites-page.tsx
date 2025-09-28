import React from 'react';
import { Typography, Box } from '@mui/material';
import CatsList from '../cats/components/cats-list';
import useFavoritesPage from './hooks/use-favorites-page';

const FavoritesPage: React.FC = () => {
  const { cats } = useFavoritesPage();
  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        My Favorites
      </Typography>
      <CatsList cats={cats} isLoading={false} />
    </Box>
  );
};

export default FavoritesPage;
