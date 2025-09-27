import React from 'react';
import { Typography, Box } from '@mui/material';

const BreedsList: React.FC = () => {
  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        Cat Breeds
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Browse different cat breeds and their characteristics.
      </Typography>
    </Box>
  );
};

export default BreedsList;
