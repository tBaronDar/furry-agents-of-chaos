import useFavoritesPageHook from '../../../shared/hooks/use-favorites';
import api from '../../../shared/services/query/api';
import type { CatReadDTO } from '../../../shared/dto/cat-read';
import { useMemo } from 'react';
import { mapCatReadToCat } from '../../../shared/utils/mapper';

export default function useFavoritesPage() {
  const { favoriteIds, updateCatsWithFavorites } = useFavoritesPageHook();

  const catsReadDTO = useMemo(() => [] as Array<CatReadDTO>, []);
  favoriteIds.forEach((favorite) => {
    const { data: catsData, isLoading: isLoadingCats } = api.useGetCatByIdQuery({ id: favorite });
    if (catsData && !isLoadingCats) {
      catsReadDTO.push(catsData);
    }
  });

  const mappedCats = useMemo(() => {
    if (!catsReadDTO) return [];

    const catsWithFavorites = catsReadDTO.map((catRead) => mapCatReadToCat(catRead, favoriteIds));
    return updateCatsWithFavorites(catsWithFavorites);
  }, [catsReadDTO, favoriteIds, updateCatsWithFavorites]);
  return {
    cats: mappedCats,
  };
}
