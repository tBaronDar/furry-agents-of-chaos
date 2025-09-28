import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import type { CatBreed } from '../../shared/dto/cat-breed-read';
import BreedsList from './components/breeds-list';
import useBreedsCats from './hooks/use-breed-cats';
import type { Cat } from '../../shared/dto/cat';

export type BreedsPageInnerProps = {
  breeds: Array<CatBreed>;
  isLoading: boolean;
  cats: Array<Cat>;
};

const BreedsPageInner: React.FC<BreedsPageInnerProps> = (props) => {
  const { breeds, cats } = props;
  return (
    <Stack>
      <Typography variant='h4' component='h1' gutterBottom>
        Cat Breeds
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Browse different cat breeds and their characteristics.
      </Typography>
      <BreedsList breeds={breeds} cats={cats} />
    </Stack>
  );
};

function BreedsPage() {
  const { breedsData, cats, isLoading } = useBreedsCats();
  const breeds = breedsData || [];
  return <BreedsPageInner breeds={breeds} isLoading={isLoading} cats={cats} />;
}

export default BreedsPage;
