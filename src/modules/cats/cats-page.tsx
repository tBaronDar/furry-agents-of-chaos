import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useCatsList from './hooks/use-cats-page';
import Button from '@mui/material/Button';
import CatsList from './components/cats-list';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

const CatsPage: React.FC = () => {
  const { cats, handleGetMoreCats, isLoading } = useCatsList();
  const isTablet = useMediaQuery('(max-width: 720px)');
  return (
    <Stack
      sx={{
        height: 'calc(100vh - 60px)',
        overflowY: 'hidden',
        padding: isTablet ? '8px' : '16px',
        pb: '24px',
      }}>
      <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
        <Typography variant={isTablet ? 'h6' : 'h4'} component='h1' gutterBottom>
          Here you can browse random cat agents.
        </Typography>
        <Button variant='contained' color='primary' onClick={() => handleGetMoreCats()} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'More Agents'}
        </Button>
      </Stack>
      <Stack
        sx={{
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
        <Typography
          variant='h6'
          component='h2'
          gutterBottom
          sx={{ mt: 2, mb: 1, fontSize: isTablet ? '1rem' : '1.25rem' }}>
          Cat Agents ({cats.length})
        </Typography>
        <CatsList cats={cats} isLoading={isLoading} />
      </Stack>
      <Outlet />
    </Stack>
  );
};

export default CatsPage;
