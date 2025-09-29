import api from '../../../shared/services/query/api';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../config/store';

export default function useFavoritesPage() {
  const guest = useSelector((state: RootState) => state.app.guest);
  const { data, isLoading, error } = api.useGetFavoritesQuery(
    { subId: guest.id },
    { skip: !guest.guestName || guest.guestName === '' }
  );
  const favoriteCats = data || [];

  return {
    isLoading,
    error,
    favoriteCats,
  };
}
