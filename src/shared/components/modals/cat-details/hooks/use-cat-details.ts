import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../../../../config/store';
import api from '../../../../services/query/api';
import type { Cat } from '../../../../dto/cat';
import { useState } from 'react';
import type { CatBreed } from '../../../../dto/cat-breed-read';
import { setSelectedCatId } from '../../../../reducers/app.reducer';

export const useCatDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { catId } = useParams();
  const selectedCatId = catId ?? '';
  const { refetchFavorites, favoritesData } = useFavorites();

  const guest = useSelector((state: RootState) => state.app.guest);
  const [showGuestCard, setShowGuestCard] = useState(false);

  const { data } = api.useGetCatByIdQuery({ id: selectedCatId });
  const selectedCat = data ?? ({} as Cat);
  const isSelectedCat = selectedCatId === selectedCat.id;

  const [addToFavoritesMutation, { isLoading: isAddingToFavorites }] = api.useAddToFavoritesMutation();
  const [removeFromFavoritesMutation, { isLoading: isRemovingFromFavorites }] = api.useRemoveFromFavoritesMutation();
  const breedInfo: CatBreed | null = selectedCat.breeds?.[0] || null;
  const maxImageWidth = 640;
  const aspectRatio = selectedCat.width / selectedCat.height;
  const imageWidth = Math.min(selectedCat.width, maxImageWidth);
  const imageHeight = imageWidth / aspectRatio;
  const isLoading = isAddingToFavorites || isRemovingFromFavorites;

  async function toggleFavorite(id: string) {
    console.log('addToFavorites', id);
    if (guest.guestName === '') {
      setShowGuestCard(true);
    } else {
      try {
        const isCurrentlyFavorite = isSelectedCat;
        const newFavoriteStatus = !isCurrentlyFavorite;

        if (newFavoriteStatus) {
          // Add to favorites via API
          await addToFavoritesMutation({ imageId: id, subId: guest.id }).unwrap();
          await refetchFavorites();
        } else {
          const favoriteRecord = favoritesData?.find((fav) => fav.image_id === catId);
          if (favoriteRecord) {
            // Remove from favorites via API using the favorite record ID
            await removeFromFavoritesMutation({ favoriteId: favoriteRecord.id.toString() }).unwrap();
            await refetchFavorites();
          }
        }

        // Update cached cat's favorite status
        dispatch(setSelectedCatId(id));
      } catch (error) {
        console.error('Failed to update favorite:', error);
      }
    }
  }
  function handleGuestCardClose() {
    setShowGuestCard(false);
  }

  function handleCatModalClose() {
    void navigate('/cats');
  }

  return {
    favoritesData,
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
  };
};
