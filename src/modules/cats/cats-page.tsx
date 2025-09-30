import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useCatsList from './hooks/use-cats-page';
import Button from '@mui/material/Button';
import CatsList from './components/cats-list';
import { useSelector } from 'react-redux';
import type { RootState } from '../../config/store';
import { Outlet } from 'react-router-dom';
import type { CatReadDTO } from '../../shared/dto/cat-read';

export type CatsListProps = {
  newCats: Array<CatReadDTO>;
  oldCats: Array<CatReadDTO>;
  handleGetMoreCats: () => void;
  isLoading: boolean;
};

const CatsPageInner = (props: CatsListProps) => {
  const { newCats, oldCats, handleGetMoreCats, isLoading } = props;

  const isInitialLoading = useSelector((state: RootState) => state.loading.isInitialLoading);
  const isFetchingMoreCats = useSelector((state: RootState) => state.loading.isFetchingMoreCats);
  const maxAttemptsReached = useSelector((state: RootState) => state.loading.maxAttemptsReached);

  return (
    <Stack
      sx={{
        height: 'calc(100vh - 120px)',
        overflowY: 'hidden',
        padding: '16px',
      }}>
      <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
        <Typography variant='h4' component='h1' gutterBottom>
          Here you can browse random cat agents.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleGetMoreCats()}
          disabled={isFetchingMoreCats || maxAttemptsReached}>
          {isFetchingMoreCats ? 'Loading...' : 'More Agents'}
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
        <Typography variant='h6' component='h2' gutterBottom sx={{ mt: 2, mb: 1 }}>
          New Agents ({newCats.length})
        </Typography>
        <CatsList cats={newCats} isLoading={isLoading || isInitialLoading || isFetchingMoreCats} />

        {oldCats && oldCats.length > 0 && (
          <>
            <Typography variant='h6' component='h2' gutterBottom sx={{ mt: 2, mb: 1 }}>
              Previous Agents ({oldCats.length})
            </Typography>
            <CatsList cats={oldCats} isLoading={false} />
          </>
        )}
      </Stack>
      <Outlet />
    </Stack>
  );
};

const CatsPage: React.FC = () => {
  const { newCats, oldCats, handleGetMoreCats, isLoading } = useCatsList();
  return (
    <CatsPageInner newCats={newCats} oldCats={oldCats} handleGetMoreCats={handleGetMoreCats} isLoading={isLoading} />
  );
};

export default CatsPage;
