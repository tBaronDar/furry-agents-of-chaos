import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import useCatsList from './hooks/use-cats-list';
import { type Cat } from '../../shared/dto/cat-read';
import CatCard from './components/cat-card';

export type CatsListProps = {
  cats: Array<Cat>;
  isLoading: boolean;
  isModalOpen: boolean;
  closeCatModal: () => void;
  openCatModal: (id: string) => void;
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
  const { cats, isModalOpen, closeCatModal, openCatModal } = props;
  return (
    <>
      <Dialog open={isModalOpen} onClose={() => closeCatModal()}>
        <DialogTitle>Cat Details</DialogTitle>
        <DialogContent>
          <Typography variant='body1' color='text.secondary'>
            Cat details modal will be implemented here.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeCatModal()}>Close</Button>
        </DialogActions>
      </Dialog>

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
  const { cats, isLoading, isModalOpen, closeCatModal, openCatModal } = useCatsList();

  return isLoading ? (
    <CatsListSkeleton />
  ) : (
    <CatsListInner
      cats={cats}
      isLoading={isLoading}
      isModalOpen={isModalOpen}
      closeCatModal={closeCatModal}
      openCatModal={openCatModal}
    />
  );
};

export default CatsList;
