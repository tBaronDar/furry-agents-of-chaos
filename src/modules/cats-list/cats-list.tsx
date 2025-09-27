import React from 'react';
import { Typography, Box } from '@mui/material';

const CatsList: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Random Cats
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome to CatLover! Here you'll see random cat images.
      </Typography>
    </Box>
  );
};

export default CatsList;
