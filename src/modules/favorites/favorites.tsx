import React from 'react';
import { Typography, Box } from '@mui/material';

const Favorites: React.FC = () => {
  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        My Favorites
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Your favorite cat images will appear here.
      </Typography>
    </Box>
  );
};

export default Favorites;
