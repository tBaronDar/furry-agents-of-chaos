import api from '../../../shared/services/query/api';

export default function useBreedsPage() {
  const { data, isLoading, error } = api.useGetCatBreedsQuery();
  return {
    data,
    isLoading,
    error,
  };
}
