import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import useCatsList from './hooks/use-cats-list';
import { type Cat } from '../../shared/dto/cat';
import CatModal from '../../shared/components/modals/cat-modal';
import Button from '@mui/material/Button';
import CatsList from './components/cats-list';
import { useSelector } from 'react-redux';
import type { RootState } from '../../config/store';

export type CatsListProps = {
  newCats: Array<Cat>;
  oldCats: Array<Cat>;
  closeCatModal: () => void;
  openCatModal: (id: string) => void;
  selectedCatId: string | null;
  selectedCat: Cat;
  handleGetMoreCats: () => void;
};

const CatsPageInner = (props: CatsListProps) => {
  const { newCats, oldCats, selectedCatId, selectedCat, closeCatModal, openCatModal, handleGetMoreCats } = props;
  console.log('selectedCatId', selectedCatId);

  const isInitialLoading = useSelector((state: RootState) => state.loading.isInitialLoading);
  const isFetchingMoreCats = useSelector((state: RootState) => state.loading.isFetchingMoreCats);
  const maxAttemptsReached = useSelector((state: RootState) => state.loading.maxAttemptsReached);

  return (
    <>
      <CatModal selectedCatId={selectedCatId} selectedCat={selectedCat} closeCatModal={closeCatModal} />

      <Stack
        sx={{
          height: 'calc(100vh - 120px)',
          overflowY: 'auto',
          padding: '16px',
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
        <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
          <Box>
            <Typography variant='h4' component='h1' gutterBottom>
              Random Cats
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Welcome to Furry Agents of Chaos or FAC! Here yousee random cat images.
            </Typography>
          </Box>
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleGetMoreCats()}
            disabled={isFetchingMoreCats || maxAttemptsReached}>
            {isFetchingMoreCats ? 'Loading...' : 'More Agents'}
          </Button>
        </Stack>
        <Stack>
          <Typography variant='h5' component='h2' gutterBottom sx={{ mt: 2, mb: 1 }}>
            🆕 New Agents ({newCats.length})
          </Typography>
          <CatsList cats={newCats} openCatModal={openCatModal} isLoading={isInitialLoading || isFetchingMoreCats} />

          {oldCats.length > 0 && (
            <>
              <Typography variant='h5' component='h2' gutterBottom sx={{ mt: 3, mb: 1 }}>
                📚 Previous Agents ({oldCats.length})
              </Typography>
              <CatsList cats={oldCats} openCatModal={openCatModal} isLoading={false} />
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};

const CatsPage: React.FC = () => {
  const { newCats, oldCats, closeCatModal, openCatModal, selectedCatId, selectedCat, handleGetMoreCats } =
    useCatsList();

  return (
    <CatsPageInner
      newCats={newCats}
      oldCats={oldCats}
      closeCatModal={closeCatModal}
      openCatModal={openCatModal}
      selectedCatId={selectedCatId}
      selectedCat={selectedCat}
      handleGetMoreCats={handleGetMoreCats}
    />
  );
};

export default CatsPage;
