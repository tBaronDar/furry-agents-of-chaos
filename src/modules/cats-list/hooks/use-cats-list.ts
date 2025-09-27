import api from '../../../shared/services/query/api';

export default function useCatsList() {
  const { data, isLoading, error } = api.useGetRandomCatsQuery({ limit: 10 });

  const cats = data ?? [];

  return { cats, isLoading, error };
}
