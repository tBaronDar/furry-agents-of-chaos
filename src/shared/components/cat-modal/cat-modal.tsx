import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import type { Cat } from '../../../shared/dto/cat-read';

export type CatModalProps = {
  selectedCatId: string | null;
  selectedCat: Cat;
  closeCatModal: () => void;
};

const CatModal = (props: CatModalProps) => {
  const { selectedCatId, selectedCat, closeCatModal } = props;

  return (
    <Dialog open={Boolean(selectedCatId)} onClose={() => closeCatModal()}>
      <DialogTitle>Cat Details</DialogTitle>
      <DialogContent>
        <Stack>
          <Typography variant='body1' color='text.secondary'>
            {selectedCat.id}
          </Typography>
          <CardMedia component='img' height='740' image={selectedCat.url} alt='Cat' />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeCatModal()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CatModal;
