import api from '../../../shared/services/query/api';
import { useDispatch, useSelector } from 'react-redux';
import type { CatReadDTO } from '../../../shared/dto/cat-read';
import { useCallback, useEffect } from 'react';
import { setFetchingMoreCats, setMaxAttemptsReached } from '../../../shared/reducers/loading.reducer';
import { addCatsToOldCats, setNewCats, setOldCats } from '../../../shared/reducers/cats.reducer';
import type { RootState } from '../../../config/store';

export default function useCatsList() {
  const dispatch = useDispatch();
  const newCats = useSelector((state: RootState) => state.cats.newCats);
  const oldCats = useSelector((state: RootState) => state.cats.oldCats);
  const { data, isLoading: isGetRandomCatsLoading, refetch } = api.useGetRandomCatsQuery({ limit: 10 });

  useEffect(() => {
    if (data && newCats && newCats.length === 0 && oldCats && oldCats.length === 0) {
      dispatch(setNewCats(data));
    }
  }, [data, newCats, oldCats, dispatch]);
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
      if (oldCats && oldCats.length === 0) {
        dispatch(setOldCats(newCats));

        const fetchedCats = await fetchUniqueCats();
        dispatch(setNewCats(fetchedCats));
      } else {
        const existingCatIds = new Set([...newCats, ...oldCats].map((cat) => cat.id));
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

          if (attempts > 5 && uniqueCats && uniqueCats.length === 0) {
            dispatch(setMaxAttemptsReached(true));
            console.warn('No unique cats found in recent attempts. API might be rate limited or out of unique cats.');
            break;
          }
        }

        if (freshCats && freshCats.length > 0) {
          dispatch(addCatsToOldCats(newCats));
          dispatch(setNewCats(freshCats.slice(0, 10)));
        }
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
    isLoading: isGetRandomCatsLoading && newCats.length === 0,
  };
}
