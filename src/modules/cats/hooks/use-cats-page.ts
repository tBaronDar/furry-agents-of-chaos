import api from '../../../shared/services/query/api';
import { useDispatch } from 'react-redux';
import type { CatReadDTO } from '../../../shared/dto/cat-read';
import { useCallback } from 'react';
import { setFetchingMoreCats, setMaxAttemptsReached } from '../../../shared/reducers/loading.reducer';

export default function useCatsList() {
  const dispatch = useDispatch();

  const { data, isLoading: isGetRandomCatsLoading, refetch } = api.useGetRandomCatsQuery({ limit: 10 });
  const cats = data ?? [];
  //handlers
  const fetchUniqueCats = useCallback(async (): Promise<Array<CatReadDTO>> => {
    const response = await refetch();
    if (response.data) {
      return response.data;
    }
    return [];
  }, [refetch]);

  const handleGetMoreCats = async () => {
    if (isGetRandomCatsLoading) return;
    dispatch(setFetchingMoreCats(true));

    try {
      const existingCatIds = new Set([...cats].map((cat) => cat.id));
      const freshCats: Array<CatReadDTO> = [];
      let attempts = 0;
      const maxAttempts = 15;
      const targetNewCats = 10;

      while (freshCats.length < targetNewCats && attempts < maxAttempts) {
        attempts++;
        if (attempts > 1) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        const fetchedCats = await fetchUniqueCats();
        const uniqueCats = fetchedCats.filter((cat) => !existingCatIds.has(cat.id));
        freshCats.push(...uniqueCats);
        uniqueCats.forEach((cat) => existingCatIds.add(cat.id));

        if (attempts > 5 && uniqueCats.length === 0) {
          dispatch(setMaxAttemptsReached(true));
          console.warn('No unique cats found in recent attempts. API might be rate limited or out of unique cats.');
          break;
        }
      }
    } catch (fetchError) {
      console.error('Error fetching more cats:', fetchError);
    } finally {
      dispatch(setFetchingMoreCats(false));
    }
  };

  return {
    cats,
    handleGetMoreCats,
    isLoading: isGetRandomCatsLoading && cats.length === 0,
  };
}
