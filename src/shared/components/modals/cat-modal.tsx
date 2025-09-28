import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Cat } from '../../dto/cat';

export type CatModalProps = {
  selectedCatId: string | null;
  selectedCat: Cat;
  closeCatModal: () => void;
};

const CatModal = (props: CatModalProps) => {
  const { selectedCatId, selectedCat, closeCatModal } = props;
  const breedInfo = selectedCat.breeds?.[0];

  const maxImageWidth = 640;
  const aspectRatio = selectedCat.width / selectedCat.height;
  const imageWidth = Math.min(selectedCat.width, maxImageWidth);
  const imageHeight = imageWidth / aspectRatio;

  return (
    <Dialog open={Boolean(selectedCatId)} onClose={() => closeCatModal()} maxWidth='lg' fullWidth>
      <DialogTitle>Cat Details</DialogTitle>
      <DialogContent>
        <Stack sx={{ display: 'flex', flexDirection: 'row', minHeight: imageHeight }}>
          {breedInfo ? (
            <Stack spacing={4} sx={{ width: 500, flexShrink: 0 }}>
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
          ) : (
            <Typography variant='body1' color='text.secondary'>
              No breed information available
            </Typography>
          )}
          <Stack sx={{ flexGrow: 1, justifyContent: 'center' }}>
            <CardMedia
              component='img'
              sx={{
                width: imageWidth,
                height: imageHeight,
                objectFit: 'contain',
              }}
              image={selectedCat.url}
              alt='Cat'
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeCatModal()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CatModal;
