import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GuestCard from './guest-card';
import HeartIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { useCatDetails } from './hooks/use-cat-details';

const CatModal = () => {
  const {
    showGuestCard,
    breedInfo,
    imageWidth,
    imageHeight,
    isLoading,
    selectedCat,
    guest,
    refetchFavorites,
    isSelectedCat,
    handleGuestCardClose,
    handleCatModalClose,
    toggleFavorite,
  } = useCatDetails();

  return (
    <Dialog open={true} onClose={() => {}} maxWidth='lg' fullWidth>
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
                handleClose={() => handleGuestCardClose()}
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
                      sx={{ fontSize: '40px', stroke: 'pink', fill: isSelectedCat ? 'pink' : 'transparent' }}
                    />
                  )}
                </IconButton>
              </>
            )}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCatModalClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CatModal;
