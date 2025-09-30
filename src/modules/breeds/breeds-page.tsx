import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import type { CatBreed } from '../../shared/dto/cat-breed-read';
import BreedsList from './components/breeds-list';
import useBreedsCats from './hooks/use-breed-cats';
import { Outlet } from 'react-router-dom';

export type BreedsPageInnerProps = {
  breeds: Array<CatBreed>;
};

const BreedsPageInner: React.FC<BreedsPageInnerProps> = (props) => {
  const { breeds } = props;
  return (
    <Stack>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h4' component='h1' gutterBottom>
          Cat Breeds
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Browse different cat breeds and their characteristics.
        </Typography>
      </Stack>
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
        <BreedsList breeds={breeds} />
      </Stack>
      <Outlet />
    </Stack>
  );
};

function BreedsPage() {
  const { breedsData } = useBreedsCats();
  const breeds = breedsData || [];
  return <BreedsPageInner breeds={breeds} />;
}

export default BreedsPage;
