import api from '../../../shared/services/query/api';

export default function useBreedCats() {
  const { data: breedsData, isLoading: isBreedsLoading, error: breedsError } = api.useGetCatBreedsQuery();

  return {
    breedsData,
    isBreedsLoading,
    breedsError,
  };
}
