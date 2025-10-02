import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import type { CatBreedReadDTO } from '../../shared/dto/cat-breed-read';
import BreedsList from './components/breeds-list';
import useBreedsCats from './hooks/use-breed-cats';
import { Outlet } from 'react-router-dom';
import CustomLoadingSpinner from '../../shared/components/custom-loading-spinner';
import { useMediaQuery } from '@mui/material';

export type BreedsPageInnerProps = {
  breeds: Array<CatBreedReadDTO>;
  isBreedsLoading: boolean;
};

const BreedsPageInner: React.FC<BreedsPageInnerProps> = (props) => {
  const { breeds, isBreedsLoading } = props;
  const isTablet = useMediaQuery('(max-width: 720px)');
  return (
    <Stack>
      <Stack direction={isTablet ? 'column' : 'row'} justifyContent='space-between' alignItems='center'>
        <Typography variant={isTablet ? 'h6' : 'h4'} component='h1' gutterBottom>
          Cat Breeds
        </Typography>
        <Typography variant='body1' color='text.secondary' fontSize={isTablet ? '0.8rem' : '1rem'}>
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
        {isBreedsLoading ? (
          <CustomLoadingSpinner type='local' size={isTablet ? 80 : 160} />
        ) : (
          <BreedsList breeds={breeds} />
        )}
      </Stack>
      <Outlet />
    </Stack>
  );
};

function BreedsPage() {
  const { breedsData, isBreedsLoading } = useBreedsCats();
  const breeds = breedsData || [];
  return <BreedsPageInner breeds={breeds} isBreedsLoading={isBreedsLoading} />;
}

export default BreedsPage;
