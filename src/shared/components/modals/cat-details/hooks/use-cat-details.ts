import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../../../../../config/store';
import api from '../../../../services/query/api';
import type { CatReadDTO } from '../../../../dto/cat-read';
import type { CatBreedReadDTO } from '../../../../dto/cat-breed-read';
import { useMediaQuery } from '@mui/material';

export const useCatDetails = () => {
  const isTablet = useMediaQuery('(max-width: 720px)');
  const isMobile = useMediaQuery('(max-width: 480px)');
  const [showGuestCard, setShowGuestCard] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const [addToFavoritesMutation, { isLoading: isAddingToFavorites }] = api.useAddToFavoritesMutation();
  const [removeFromFavoritesMutation, { isLoading: isRemovingFromFavorites }] = api.useRemoveFromFavoritesMutation();
  //paths and params
  const { pathname } = useLocation();
  const isCatModalRoute = pathname.includes('/cats');
  const isBreedModalRoute = pathname.includes('/breeds');
  const { catId } = useParams();
  const selectedCatId = catId ?? '';

  //redux
  const guest = useSelector((state: RootState) => state.app.guest);
  //fetching
  const { data: favoriteCatsData } = api.useGetFavoritesQuery({ subId: guest.id });
  const favoriteCats = favoriteCatsData || [];
  const { data: selectedCatData, isLoading: isSelectedCatLoading } = api.useGetCatByIdQuery({ id: selectedCatId });
  const cat = selectedCatData ?? ({} as CatReadDTO);

  const favoriteCat = favoriteCats.find((fav) => fav.image_id === catId);

  const breedInfo: CatBreedReadDTO | null = cat.breeds?.[0] || null;
  //image staff
  const aspectRatio = cat.width / cat.height;
  const maxImageHeight = isMobile ? 200 : isTablet ? 400 : 600;
  const maxImageWidth = isMobile ? 200 : isTablet ? 400 : 600;
  let imageHeight = 0;
  let imageWidth = 0;
  if (aspectRatio < 1.2) {
    imageHeight = Math.min(cat.height, maxImageHeight);
    imageWidth = imageHeight * aspectRatio;
  } else if (aspectRatio > 1.2) {
    imageWidth = Math.min(cat.width, maxImageWidth);
    imageHeight = imageWidth / aspectRatio;
  } else {
    imageHeight = Math.min(cat.height, maxImageHeight);
    imageWidth = Math.min(cat.width, maxImageWidth);
  }

  const [isSelectedCat, setIsSelectedCat] = useState<boolean>(Boolean(favoriteCat));

  const isLoading = isAddingToFavorites || isRemovingFromFavorites || isSelectedCatLoading;

  async function toggleFavorite(id: string) {
    if (guest.guestName === '') {
      setShowGuestCard(true);
    } else {
      const isCurrentlyFavorite = Boolean(favoriteCat);
      const newFavoriteStatus = !isCurrentlyFavorite;

      if (newFavoriteStatus) {
        setIsSelectedCat(true);
        await addToFavoritesMutation({ imageId: id, subId: guest.id }).unwrap();
      } else {
        if (favoriteCat) {
          setIsSelectedCat(false);
          await removeFromFavoritesMutation({ favoriteId: favoriteCat.id }).unwrap();
        }
      }
    }
  }
  function handleGuestCardClose() {
    setShowGuestCard(false);
  }

  async function handleCatModalClose() {
    setShowModal(false);
    if (isCatModalRoute) {
      await navigate('/cats');
    } else if (isBreedModalRoute) {
      await navigate('/breeds');
    }
  }

  return {
    cat,
    guest,
    selectedCatId,
    toggleFavorite,
    handleGuestCardClose,
    handleCatModalClose,
    showGuestCard,
    breedInfo,
    imageWidth,
    imageHeight,
    isLoading,
    showModal,
    isSelectedCat,
    isTablet,
    isMobile,
    setIsSelectedCat,
  };
};
