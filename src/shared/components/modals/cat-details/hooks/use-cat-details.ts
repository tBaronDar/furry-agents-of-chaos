import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../../../../../config/store';
import api from '../../../../services/query/api';
import type { CatReadDTO } from '../../../../dto/cat-read';
import { useState } from 'react';
import type { CatBreedReadDTO } from '../../../../dto/cat-breed-read';

export const useCatDetails = () => {
  const { pathname } = useLocation();
  const isCatModalRoute = pathname.includes('/cats');
  const isBreedModalRoute = pathname.includes('/breeds');
  const { catId } = useParams();
  const selectedCatId = catId ?? '';
  const guest = useSelector((state: RootState) => state.app.guest);
  const navigate = useNavigate();
  const { data: favoriteCatsData, refetch: refetchFavorites } = api.useGetFavoritesQuery({ subId: guest.id });
  const favoriteCats = favoriteCatsData || [];

  const [showGuestCard, setShowGuestCard] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const { data: selectedCatData, isLoading: isSelectedCatLoading } = api.useGetCatByIdQuery({ id: selectedCatId });
  const selectedCat = selectedCatData ?? ({} as CatReadDTO);

  const isSelectedCat = favoriteCats.some((fav) => fav.image_id === selectedCat.id);

  const [addToFavoritesMutation, { isLoading: isAddingToFavorites }] = api.useAddToFavoritesMutation();
  const [removeFromFavoritesMutation, { isLoading: isRemovingFromFavorites }] = api.useRemoveFromFavoritesMutation();
  const breedInfo: CatBreedReadDTO | null = selectedCat.breeds?.[0] || null;
  const maxImageWidth = 600;
  const aspectRatio = selectedCat.width / selectedCat.height;
  const imageWidth = Math.min(selectedCat.width, maxImageWidth);
  const imageHeight = imageWidth / aspectRatio;

  const isLoading = isAddingToFavorites || isRemovingFromFavorites || isSelectedCatLoading;

  async function toggleFavorite(id: string) {
    if (guest.guestName === '') {
      setShowGuestCard(true);
    } else {
      const isCurrentlyFavorite = isSelectedCat;
      const newFavoriteStatus = !isCurrentlyFavorite;

      if (newFavoriteStatus) {
        await addToFavoritesMutation({ imageId: id, subId: guest.id }).unwrap();
        api.util.invalidateTags(['Favorites']);
      } else {
        const favoriteRecord = favoriteCats.find((fav) => fav.image_id === catId);
        if (favoriteRecord) {
          await removeFromFavoritesMutation({ favoriteId: favoriteRecord.id }).unwrap();
          api.util.invalidateTags(['Favorites']);
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
    selectedCat,
    guest,
    refetchFavorites,
    selectedCatId,
    isSelectedCat,
    toggleFavorite,
    handleGuestCardClose,
    handleCatModalClose,
    showGuestCard,
    breedInfo,
    imageWidth,
    imageHeight,
    isLoading,
    showModal,
  };
};
