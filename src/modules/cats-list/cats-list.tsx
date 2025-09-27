import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import useCatsList from './hooks/use-cats-list';
import { type Cat } from '../../shared/dto/cat-read';

export type CatsListProps = {
  cats: Array<Cat>;
  isLoading: boolean;
  // error: Error | null;
};

const CatsListSkeleton = () => {
  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        Random Cats
      </Typography>
    </Box>
  );
};

const CatsListInner = (props: CatsListProps) => {
  const { cats, isLoading } = props;

  console.log(cats, isLoading);
  return (
    <Stack>
      <Box>
        <Typography variant='h4' component='h1' gutterBottom>
          Random Cats
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Welcome to CatLover! Here you&apos;ll see random cat images.
        </Typography>
      </Box>
    </Stack>
  );
};

const CatsList: React.FC = () => {
  const { cats, isLoading } = useCatsList();
  return isLoading ? <CatsListSkeleton /> : <CatsListInner cats={cats} isLoading={isLoading} />;
};

export default CatsList;
