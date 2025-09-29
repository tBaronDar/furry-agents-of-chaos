import api from '../../../shared/services/query/api';

export default function useBreedCats() {
  const { data, isLoading: isBreedsLoading, error: breedsError } = api.useGetCatBreedsQuery();
  const breedsData = data || [];
  return {
    breedsData,
    isBreedsLoading,
    breedsError,
  };
}
