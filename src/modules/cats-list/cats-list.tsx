import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import useCatsList from './hooks/use-cats-list';
import { type Cat } from '../../shared/dto/cat-read';
import CatCard from './components/cat-card';
import CatModal from '../../shared/components/modals/cat-modal';
import Button from '@mui/material/Button';

export type CatsListProps = {
  cats: Array<Cat>;
  isLoading: boolean;
  closeCatModal: () => void;
  openCatModal: (id: string) => void;
  selectedCatId: string | null;
  selectedCat: Cat;
  handleGetMoreCats: () => void;
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
  const { cats, isLoading, selectedCatId, selectedCat, closeCatModal, openCatModal, handleGetMoreCats } = props;
  console.log('selectedCatId', selectedCatId);

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
          <Button variant='contained' color='primary' onClick={() => handleGetMoreCats()} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'More Agents'}
          </Button>
        </Stack>
        <Stack
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '16px',
            padding: '8px',
          }}>
          {cats.map((cat) => (
            <CatCard key={cat.id} cat={cat} openCatModal={openCatModal} />
          ))}
        </Stack>
      </Stack>
    </>
  );
};

const CatsList: React.FC = () => {
  const { cats, isLoading, closeCatModal, openCatModal, selectedCatId, selectedCat, handleGetMoreCats } = useCatsList();

  return isLoading ? (
    <CatsListSkeleton />
  ) : (
    <CatsListInner
      cats={cats}
      isLoading={isLoading}
      closeCatModal={closeCatModal}
      openCatModal={openCatModal}
      selectedCatId={selectedCatId}
      selectedCat={selectedCat}
      handleGetMoreCats={handleGetMoreCats}
    />
  );
};

export default CatsList;
