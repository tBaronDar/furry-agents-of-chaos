import api from '../../../shared/services/query/api';
import { useDispatch } from 'react-redux';
import type { CatReadDTO } from '../../../shared/dto/cat-read';
import { useCallback } from 'react';
import { setFetchingMoreCats, setMaxAttemptsReached } from '../../../shared/reducers/loading.reducer';

export default function useCatsList() {
  const dispatch = useDispatch();

  const { data, isLoading: isGetRandomCatsLoading, refetch } = api.useGetRandomCatsQuery({ limit: 10 });
  let newCats: Array<CatReadDTO> = data || [];
  let oldCats: Array<CatReadDTO> = [];
  const fetchUniqueCats = useCallback(async (): Promise<Array<CatReadDTO>> => {
    const response = await refetch();
    if (response.data) {
      return response.data;
    }
    return [];
  }, [refetch]);

  //handlers
  const handleGetMoreCats = async () => {
    if (isGetRandomCatsLoading) return;

    dispatch(setFetchingMoreCats(true));

    try {
      const existingCatIds = new Set([...newCats, ...oldCats].map((cat) => cat.id));
      const freshCats: Array<CatReadDTO> = [];
      let attempts = 0;
      const maxAttempts = 15;
      const targetNewCats = 10;

      while (freshCats.length < targetNewCats && attempts < maxAttempts) {
        attempts++;

        // add small delay to avoid rate limiting
        if (attempts > 1) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        const fetchedCats = await fetchUniqueCats();
        const uniqueCats = fetchedCats.filter((cat) => !existingCatIds.has(cat.id));
        freshCats.push(...uniqueCats);
        uniqueCats.forEach((cat) => existingCatIds.add(cat.id));

        // there is no exlude ids on the api so we need to check if we are getting unique cats
        if (attempts > 5 && uniqueCats.length === 0) {
          dispatch(setMaxAttemptsReached(true));
          console.warn('No unique cats found in recent attempts. API might be rate limited or out of unique cats.');
          break;
        }
      }

      if (freshCats.length > 0) {
        // Move current new cats to old cats, then set fresh cats as new cats
        oldCats = [...newCats, ...oldCats];
        newCats = freshCats;
      }
    } catch (fetchError) {
      console.error('Error fetching more cats:', fetchError);
    } finally {
      dispatch(setFetchingMoreCats(false));
    }
  };

  return {
    newCats,
    oldCats,
    handleGetMoreCats,
  };
}
