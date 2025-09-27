import React from 'react';
import { Typography, Box } from '@mui/material';

const BreedModal: React.FC = () => {
  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        Breed Details
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Breed details modal will be implemented here.
      </Typography>
    </Box>
  );
};

export default BreedModal;
