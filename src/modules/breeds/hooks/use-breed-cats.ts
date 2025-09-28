import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import api from '../../../shared/services/query/api';
import { mapCatReadToCat } from '../../../shared/utils/mapper';
import useFavorites from '../../../shared/hooks/use-favorites';
import type { RootState } from '../../../config/store';

export default function useBreedCats() {
  const selectedBreedId = useSelector((state: RootState) => state.app.selectedBreedId);

  const { favoriteIds, updateCatsWithFavorites } = useFavorites();

  const { data, isLoading, error } = api.useGetCatsByBreedQuery(
    { breedId: selectedBreedId!, limit: 20 },
    { skip: !selectedBreedId }
  );
  const { data: breedsData, isLoading: isBreedsLoading, error: breedsError } = api.useGetCatBreedsQuery();

  const mappedCats = useMemo(() => {
    if (!data) return [];

    const catsWithFavorites = data.map((catRead) => mapCatReadToCat(catRead, favoriteIds));
    return updateCatsWithFavorites(catsWithFavorites);
  }, [data, favoriteIds, updateCatsWithFavorites]);

  return {
    breedsData,
    selectedBreedId,
    isBreedsLoading,
    breedsError,
    cats: mappedCats,
    isLoading,
    error,
  };
}
