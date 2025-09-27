import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import useCatsList from './hooks/use-cats-list';
import { type Cat } from '../../shared/dto/cat-read';
import CatCard from './components/cat-card';
import CatModal from '../../shared/components/modals/cat-modal';

export type CatsListProps = {
  cats: Array<Cat>;
  isLoading: boolean;
  closeCatModal: () => void;
  openCatModal: (id: string) => void;
  selectedCatId: string | null;
  selectedCat: Cat;
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
  const { cats, selectedCatId, selectedCat, closeCatModal, openCatModal } = props;
  console.log('selectedCatId', selectedCatId);

  return (
    <>
      <CatModal selectedCatId={selectedCatId} selectedCat={selectedCat} closeCatModal={closeCatModal} />

      <Stack>
        <Box>
          <Typography variant='h4' component='h1' gutterBottom>
            Random Cats
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Welcome to Furry Agents of Chaos or FAC! Here yousee random cat images.
          </Typography>
        </Box>
        <Stack direction='row' spacing={2}>
          {cats.map((cat) => (
            <CatCard key={cat.id} cat={cat} openCatModal={openCatModal} />
          ))}
        </Stack>
      </Stack>
    </>
  );
};

const CatsList: React.FC = () => {
  const { cats, isLoading, closeCatModal, openCatModal, selectedCatId, selectedCat } = useCatsList();

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
    />
  );
};

export default CatsList;
