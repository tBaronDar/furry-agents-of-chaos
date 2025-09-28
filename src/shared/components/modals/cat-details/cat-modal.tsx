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
import type { FavoriteCat } from '../../../dto/favorite-cat-read';
import HeartIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCatFavorite } from '../../../reducers/cats.reducer';
import api from '../../../services/query/api';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import type { RootState } from '../../../../config/store';

export type CatModalProps = {
  selectedCat: Cat;
  closeCatModal: () => void;
  guest: Guest;
  refetchFavorites: () => void;
  favoritesData: Array<FavoriteCat> | undefined;
};

const CatModal = (props: CatModalProps) => {
  //maybe create a hook for all this logic
  const { selectedCat, closeCatModal, guest, refetchFavorites, favoritesData } = props;
  const [showGuestCard, setShowGuestCard] = useState(false);

  const dispatch = useDispatch();
  const selectedCatId = useSelector((state: RootState) => state.app.selectedCatId);
  const [addToFavoritesMutation, { isLoading: isAddingToFavorites }] = api.useAddToFavoritesMutation();
  const [removeFromFavoritesMutation, { isLoading: isRemovingFromFavorites }] = api.useRemoveFromFavoritesMutation();
  if (!selectedCatId || !selectedCat.breeds || !selectedCat || !guest) return null;
  const breedInfo: CatBreed | null = selectedCat.breeds?.[0] || null;
  const maxImageWidth = 640;
  const aspectRatio = selectedCat.width / selectedCat.height;
  const imageWidth = Math.min(selectedCat.width, maxImageWidth);
  const imageHeight = imageWidth / aspectRatio;
  const isLoading = isAddingToFavorites || isRemovingFromFavorites;

  async function toggleFavorite(catId: string) {
    console.log('addToFavorites', catId);
    if (guest.guestName === '') {
      setShowGuestCard(true);
    } else {
      try {
        const isCurrentlyFavorite = selectedCat.isFavorite;
        const newFavoriteStatus = !isCurrentlyFavorite;

        if (newFavoriteStatus) {
          // Add to favorites via API
          await addToFavoritesMutation({ imageId: catId, subId: guest.id }).unwrap();
          refetchFavorites();
        } else {
          const favoriteRecord = favoritesData?.find((fav) => fav.image_id === catId);
          if (favoriteRecord) {
            // Remove from favorites via API using the favorite record ID
            await removeFromFavoritesMutation({ favoriteId: favoriteRecord.id.toString() }).unwrap();
            refetchFavorites();
          }
        }

        // Update cached cat's favorite status
        dispatch(setCatFavorite({ catId, isFavorite: newFavoriteStatus }));
      } catch (error) {
        console.error('Failed to update favorite:', error);
      }
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
              <GuestCard
                handleClose={handleClose}
                currentGuest={guest}
                selectedCat={selectedCat}
                refetchFavorites={refetchFavorites}
              />
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
                <IconButton
                  aria-label='toggle favorite'
                  disabled={isLoading}
                  sx={{ position: 'absolute', bottom: 0, right: 0 }}
                  onClick={() => toggleFavorite(selectedCat.id)}>
                  {isLoading ? (
                    <CircularProgress size={30} />
                  ) : (
                    <HeartIcon
                      sx={{ fontSize: '40px', stroke: 'pink', fill: selectedCat.isFavorite ? 'pink' : 'transparent' }}
                    />
                  )}
                </IconButton>
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
