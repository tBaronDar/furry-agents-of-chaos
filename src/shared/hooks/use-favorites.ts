import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import api from '../services/query/api';
import type { RootState } from '../../config/store';
import type { Cat } from '../dto/cat';

export default function useFavorites() {
  const guest = useSelector((state: RootState) => state.app.guest);

  // Get favorites from API only if guest has a name
  const { data: favoritesData, refetch: refetchFavorites } = api.useGetFavoritesQuery(
    { subId: guest.id },
    { skip: !guest.guestName || guest.guestName === '' }
  );

  // Get cached cats for immediate updates
  const cachedCats = useSelector((state: RootState) => state.cats.cachedCats);

  // Helper function to update cats with favorite status
  const updateCatsWithFavorites = useMemo(() => {
    const favoriteIds = favoritesData?.map((fav) => fav.image_id) || [];

    return (cats: Array<Cat>) =>
      cats.map((cat) => {
        // Use cached favorite status if available, otherwise use API data
        const cachedFavorite = cachedCats[cat.id]?.isFavorite;
        const apiFavorite = guest?.guestName !== '' ? favoriteIds.includes(cat.id) : false;

        return {
          ...cat,
          isFavorite: cachedFavorite !== undefined ? cachedFavorite : apiFavorite,
        };
      });
  }, [favoritesData, guest?.guestName, cachedCats]);

  return {
    favoritesData,
    refetchFavorites,
    updateCatsWithFavorites,
    favoriteIds: favoritesData?.map((fav) => fav.image_id) || [],
  };
}
