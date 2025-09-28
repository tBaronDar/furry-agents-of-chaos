import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Cat } from '../../../dto/cat';
import GuestCard from './guest-card';
import type { Guest } from '../../../dto/guest';
import type { CatBreed } from '../../../dto/cat-breed-read';
import HeartIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToFavorites as addToFavoritesAction } from '../../../reducers/cats.reducer';

export type CatModalProps = {
  selectedCatId: string | null;
  selectedCat: Cat;
  closeCatModal: () => void;
  guest: Guest;
};

const CatModal = (props: CatModalProps) => {
  const { selectedCatId, selectedCat, closeCatModal, guest } = props;
  const [showGuestCard, setShowGuestCard] = useState(false);

  const dispatch = useDispatch();
  if (!selectedCatId || !selectedCat.breeds || !selectedCat || !guest) return null;
  const breedInfo: CatBreed | null = selectedCat.breeds?.[0] || null;
  const maxImageWidth = 640;
  const aspectRatio = selectedCat.width / selectedCat.height;
  const imageWidth = Math.min(selectedCat.width, maxImageWidth);
  const imageHeight = imageWidth / aspectRatio;

  function addToFavorites(catId: string) {
    console.log('addToFavorites', catId);
    if (guest.guestName === '') {
      setShowGuestCard(true);
    } else {
      dispatch(addToFavoritesAction({ catId, guest }));
    }
  }
  function handleClose() {
    setShowGuestCard(false);
  }

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
          <Stack sx={{ flexGrow: 1, justifyContent: 'center', position: 'relative' }}>
            {showGuestCard ? (
              <GuestCard handleClose={handleClose} />
            ) : (
              <>
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
                <Button
                  sx={{ position: 'absolute', bottom: 0, right: 0 }}
                  onClick={() => addToFavorites(selectedCat.id)}>
                  <HeartIcon
                    sx={{ fontSize: '40px', stroke: 'pink', fill: selectedCat.isFavorite ? 'pink' : 'transparent' }}
                  />
                </Button>
              </>
            )}
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
