import api from '../../../shared/services/query/api';
import { useCallback, useState, useEffect } from 'react';
import type { CatReadDTO } from '../../../shared/dto/cat-read';

export default function useCatsList() {
  const { data, isLoading: isLoadingCats, refetch } = api.useGetRandomCatsQuery({ limit: 10 });
  const [allCats, setAllCats] = useState<Array<CatReadDTO>>([]);
  const [isLoadingMoreCats, setIsLoadingMoreCats] = useState(false);

  // Initialize with first batch of cats
  useEffect(() => {
    if (data && allCats.length === 0) {
      setAllCats(data);
    }
  }, [data, allCats.length]);

  const handleGetMoreCats = useCallback(async () => {
    if (isLoadingCats) return;
    setIsLoadingMoreCats(true);
    const result = await refetch();
    if (result.data && Array.isArray(result.data)) {
      setAllCats((prevCats) => [...(result.data as Array<CatReadDTO>), ...prevCats]);
    }
    setIsLoadingMoreCats(false);
  }, [isLoadingCats, refetch]);

  const isLoading = isLoadingCats || isLoadingMoreCats;

  return {
    cats: allCats,
    handleGetMoreCats,
    isLoading,
  };
}
