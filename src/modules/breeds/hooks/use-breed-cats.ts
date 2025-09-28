import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../shared/services/query/api';
import { mapCatReadToCat } from '../../../shared/utils/mapper';
import useFavorites from '../../../shared/hooks/use-favorites';
import type { RootState } from '../../../config/store';
import { setSelectedBreedId } from '../../../shared/reducers/app.reducer';

export default function useBreedCats() {
  const dispatch = useDispatch();
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

  const handleSelectBreed = (breedId: string) => {
    dispatch(setSelectedBreedId(breedId));
  };

  return {
    breedsData,
    isBreedsLoading,
    breedsError,
    cats: mappedCats,
    isLoading,
    error,
    selectedBreedId,
    handleSelectBreed,
  };
}
