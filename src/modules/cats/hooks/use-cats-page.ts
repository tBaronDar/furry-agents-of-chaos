import api from '../../../shared/services/query/api';
import { useCallback } from 'react';

export default function useCatsList() {
  const { data, isLoading, refetch } = api.useGetRandomCatsQuery({ limit: 10 });
  const cats = data || [];

  const handleGetMoreCats = useCallback(async () => {
    if (isLoading) return;
    await refetch();
  }, [isLoading, refetch]);

  return {
    cats,
    handleGetMoreCats,
    isLoading,
  };
}
