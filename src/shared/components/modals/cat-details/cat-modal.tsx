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
    showModal,
  } = useCatDetails();

  return (
    <Dialog open={showModal} onClose={() => {}} maxWidth='lg' fullWidth>
      <DialogTitle>Cat Details</DialogTitle>
      <DialogContent sx={{ overflow: 'visible' }}>
        <Stack sx={{ flexDirection: 'row', minHeight: imageHeight }}>
          {breedInfo ? (
            <Stack justifyContent='space-between'>
              <Stack spacing={4} sx={{ p: 2, width: 500, flexShrink: 0 }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Typography variant='h3'>{breedInfo?.name}</Typography>
                  <IconButton
                    aria-label='toggle favorite'
                    disabled={isLoading}
                    onClick={() => toggleFavorite(selectedCat.id)}>
                    {isLoading ? (
                      <CircularProgress size={30} />
                    ) : (
                      <HeartIcon
                        sx={{
                          fontSize: '40px',
                          strokeWidth: '2px',
                          stroke: 'pink',
                          fill: isSelectedCat ? 'pink' : 'transparent',
                        }}
                      />
                    )}
                  </IconButton>
                </Stack>
                <Typography variant='body1' sx={{ textWrap: 'pretty' }}>
                  {breedInfo?.description}
                </Typography>
                <Typography variant='body1'>{`Temperament: ${breedInfo?.temperament}`}</Typography>
                <Typography variant='body1'>{`Origin: ${breedInfo?.origin}`}</Typography>
              </Stack>
              <Typography variant='body1' fontStyle='italic' color='text.secondary'>
                Click on the heart to add to favorites
              </Typography>
            </Stack>
          ) : (
            <Typography variant='body1' color='text.secondary'>
              No breed information available
            </Typography>
          )}
          <Stack sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            {showGuestCard ? (
              <GuestCard
                handleClose={() => handleGuestCardClose()}
                currentGuest={guest}
                selectedCat={selectedCat}
                refetchFavorites={refetchFavorites}
              />
            ) : (
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
