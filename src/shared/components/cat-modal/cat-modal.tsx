import React from 'react';
import { Typography, Box } from '@mui/material';

const CatModal: React.FC = () => {
  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        Cat Details
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Cat details modal will be implemented here.
      </Typography>
    </Box>
  );
};

export default CatModal;
