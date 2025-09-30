import { useState } from 'react';
import api from '../../../shared/services/query/api';

export default function useBreedCard() {
  const [selectedBreedId, setSelectedBreedId] = useState<string | null>(null);
  const { data, isLoading, error } = api.useGetCatsByBreedQuery(
    { breedId: selectedBreedId!, limit: 20 },
    { skip: !selectedBreedId }
  );
  const handleSelectBreed = (breedId: string | null) => {
    if (selectedBreedId === breedId) {
      setSelectedBreedId(null);
    } else if (!breedId || breedId !== selectedBreedId) {
      setSelectedBreedId(breedId);
    }
  };
  const cats = data ?? [];
  return {
    cats,
    isLoading,
    error,
    handleSelectBreed,
    selectedBreedId,
  };
}
