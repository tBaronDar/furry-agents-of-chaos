import api from '../../../shared/services/query/api';
import { useCallback, useState, useEffect } from 'react';
import { setCats } from '../../../shared/reducers/cats.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../../config/store';

export default function useCatsList() {
  const { data, isLoading: isLoadingCats, refetch } = api.useGetRandomCatsQuery({ limit: 10 });
  const [isLoadingMoreCats, setIsLoadingMoreCats] = useState(false);
  const dispatch = useDispatch();
  const allCats = useSelector((state: RootState) => state.cats.cats);

  useEffect(() => {
    if (data && allCats.length === 0) {
      dispatch(setCats(data));
    }
  }, [data, allCats.length, dispatch]);

  const handleGetMoreCats = useCallback(async () => {
    if (isLoadingCats) return;
    setIsLoadingMoreCats(true);
    const result = await refetch();
    if (result.data && Array.isArray(result.data)) {
      dispatch(setCats([...result.data, ...allCats]));
    }
    setIsLoadingMoreCats(false);
  }, [isLoadingCats, refetch, allCats, dispatch]);

  const isLoading = isLoadingCats || isLoadingMoreCats;

  return {
    cats: allCats,
    handleGetMoreCats,
    isLoading,
  };
}
