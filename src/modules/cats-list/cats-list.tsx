import React from 'react';
import { Typography, Box } from '@mui/material';
import useCatsList from './hooks/use-cats-list';

const CatsList: React.FC = () => {
  const { data, isLoading, error } = useCatsList();
  console.log(data, isLoading, error);
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
