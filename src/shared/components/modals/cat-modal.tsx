import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { Card, Typography } from '@mui/material';
import type { Cat } from '../../dto/cat';

export type CatModalProps = {
  selectedCatId: string | null;
  selectedCat: Cat;
  closeCatModal: () => void;
};

const CatModal = (props: CatModalProps) => {
  const { selectedCatId, selectedCat, closeCatModal } = props;
  const breedInfo = selectedCat.breeds?.[0];
  return (
    <Dialog open={Boolean(selectedCatId)} onClose={() => closeCatModal()}>
      <DialogTitle>Cat Details</DialogTitle>
      <DialogContent>
        <Stack direction='row' spacing={2}>
          <Stack spacing={4}>
            <Typography variant='body1' color='text.secondary'>
              {breedInfo?.name}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              {breedInfo?.description}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              {`Temperament: ${breedInfo?.temperament}`}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              {`Origin: ${breedInfo?.origin}`}
            </Typography>
          </Stack>
          <Card>
            <CardMedia component='img' height='540' image={selectedCat.url} alt='Cat' />
          </Card>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeCatModal()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CatModal;
