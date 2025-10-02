import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import useFavoritesPage from './hooks/use-favorites-page';
import FavoritesList from './components/favorites-list';
import CustomLoadingSpinner from '../../shared/components/custom-loading-spinner';

const FavoritesPage: React.FC = () => {
  const { favoriteCats, isLoading } = useFavoritesPage();

  if (favoriteCats.length === 0 && !isLoading) {
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
    <Stack
      sx={{
        height: 'calc(100vh - 160px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#c1c1c1',
          borderRadius: '4px',
          '&:hover': {
            background: '#a8a8a8',
          },
        },
      }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Your Agent&apos;s Roster
      </Typography>
      {isLoading ? <CustomLoadingSpinner /> : <FavoritesList favoriteCats={favoriteCats} />}
    </Stack>
  );
};

export default FavoritesPage;
