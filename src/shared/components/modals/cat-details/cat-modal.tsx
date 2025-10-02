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
    cat,
    guest,
    refetchFavorites,
    handleGuestCardClose,
    handleCatModalClose,
    toggleFavorite,
    showModal,
    isSelectedCat,
    isTablet,
    isMobile,
  } = useCatDetails();

  return (
    <Dialog open={showModal} onClose={() => {}} maxWidth='lg' fullWidth={!isLoading || Boolean(breedInfo)}>
      {breedInfo ? (
        <>
          <DialogTitle>Cat Details</DialogTitle>
          <DialogContent sx={{ overflow: 'visible' }}>
            <Stack sx={{ flexDirection: isTablet ? 'column' : 'row', minHeight: imageHeight }}>
              <Stack justifyContent='space-between' alignItems={isTablet ? 'center' : 'flex-start'}>
                <Stack
                  spacing={isMobile ? 2 : 4}
                  sx={{ p: 2, width: isMobile ? 200 : isTablet ? 300 : 500, flexShrink: 0 }}>
                  <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h3' fontSize={isMobile ? '1.25rem' : isTablet ? '1.5rem' : '2rem'}>
                      {breedInfo?.name}
                    </Typography>
                    <IconButton
                      aria-label='toggle favorite'
                      disabled={isLoading}
                      onClick={() => toggleFavorite(cat.id)}>
                      {isLoading ? (
                        <CircularProgress size={30} />
                      ) : (
                        <HeartIcon
                          sx={{
                            cursor: 'pointer',
                            fontSize: '40px',
                            strokeWidth: '2px',
                            stroke: 'pink',
                            fill: isSelectedCat ? 'pink' : 'transparent',
                          }}
                        />
                      )}
                    </IconButton>
                  </Stack>
                  <Typography variant='body1' sx={{ textWrap: 'pretty' }} fontSize={isMobile ? '0.8rem' : '1rem'}>
                    {breedInfo?.description}
                  </Typography>
                  <Typography variant='body1' fontSize={isMobile ? '0.9rem' : '1rem'}>
                    {`Temperament: ${breedInfo?.temperament}`}
                  </Typography>
                  <Typography variant='body1' fontSize={isMobile ? '0.9rem' : '1rem'}>
                    {`Origin: ${breedInfo?.origin}`}
                  </Typography>
                </Stack>
                <Typography
                  variant='body1'
                  fontStyle='italic'
                  color='text.secondary'
                  fontSize={isMobile ? '0.8rem' : '1rem'}>
                  Click on the heart to add to favorites
                </Typography>
              </Stack>
              <Stack sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                {showGuestCard ? (
                  <GuestCard
                    handleClose={() => handleGuestCardClose()}
                    currentGuest={guest}
                    selectedCat={cat}
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
                    image={cat.url}
                    alt='Cat'
                  />
                )}
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCatModalClose}>Close</Button>
          </DialogActions>
        </>
      ) : (
        <Stack
          sx={{
            p: 4,
            flexShrink: 0,
            width: '100%',
            height: '100%',
          }}>
          <CircularProgress size={isTablet ? 80 : 160} sx={{ width: '100%', height: '100%' }} />
        </Stack>
      )}
    </Dialog>
  );
};

export default CatModal;
