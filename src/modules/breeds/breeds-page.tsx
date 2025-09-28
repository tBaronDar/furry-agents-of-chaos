import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useBreedsPage from './hooks/use-breeds-page';
import type { CatBreed } from '../../shared/dto/cat-breed-read';
import BreedsList from './components/breeds-list';

export type BreedsPageInnerProps = {
  breeds: Array<CatBreed>;
  isLoading: boolean;
};

const BreedsPageInner: React.FC<BreedsPageInnerProps> = (props) => {
  const { breeds, isLoading } = props;
  return (
    <Stack>
      <Typography variant='h4' component='h1' gutterBottom>
        Cat Breeds
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Browse different cat breeds and their characteristics.
      </Typography>
      <BreedsList breeds={breeds} isLoading={isLoading} />
    </Stack>
  );
};

function BreedsPage() {
  const { data, isLoading } = useBreedsPage();
  const breeds = data || [];
  return <BreedsPageInner breeds={breeds} isLoading={isLoading} />;
}

export default BreedsPage;
