import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../../../../config/store';
import api from '../../../../services/query/api';
import type { Cat } from '../../../../dto/cat';
import { useEffect, useState } from 'react';
import type { CatBreed } from '../../../../dto/cat-breed-read';
import { setSelectedCatId } from '../../../../reducers/app.reducer';
import { setFavoriteCats } from '../../../../reducers/favorites.reducer';

export const useCatDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { catId } = useParams();
  const selectedCatId = catId ?? '';
  const guest = useSelector((state: RootState) => state.app.guest);
  const favoriteCats = useSelector((state: RootState) => {
    if (state.favorites && state.favorites.favoriteCats) {
      return state.favorites.favoriteCats;
    }
    return [];
  });
  const { data: favoriteCatsData, refetch: refetchFavorites } = api.useGetFavoritesQuery({ subId: guest.id });

  useEffect(() => {
    if (favoriteCatsData && favoriteCats.length === 0) {
      dispatch(setFavoriteCats(favoriteCatsData));
    }
  }, [favoriteCatsData, favoriteCats, dispatch]);

  const [showGuestCard, setShowGuestCard] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const { data } = api.useGetCatByIdQuery({ id: selectedCatId });
  const selectedCat = data ?? ({} as Cat);
  const isSelectedCat = favoriteCats.some((fav) => fav.image_id === selectedCat.id);

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
          const favoriteRecord = favoriteCats.find((fav) => fav.image_id === catId);
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
    setShowModal(false);
    void navigate('/cats');
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
