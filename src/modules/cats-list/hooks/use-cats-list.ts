import api from '../../../shared/services/query/api';
import { closeModal, openModal, setSelectedCat } from '../../../shared/reducers/app.reducer';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../config/store';
import { ModalType } from '../../../shared/utils/enums';
import type { Cat } from '../../../shared/dto/cat-read';
import { useState, useEffect, useCallback } from 'react';

export default function useCatsList() {
  const dispatch = useDispatch();
  const selectedCatId = useSelector((state: RootState) => state.app.selectedCatId);

  const [allCats, setAllCats] = useState<Array<Cat>>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, isLoading: isGetRandomCatsLoading, error, refetch } = api.useGetRandomCatsQuery({ limit: 10 });

  // Update allCats when initial data arrives
  useEffect(() => {
    if (data && allCats.length === 0) {
      setAllCats(data);
    }
  }, [data, allCats.length]);

  //state staff
  const closeCatModal = () => dispatch(closeModal());
  const openCatModal = (id: string) => {
    dispatch(openModal({ type: ModalType.CAT, id }));
    dispatch(setSelectedCat(id));
  };

  const fetchUniqueCats = useCallback(async (): Promise<Array<Cat>> => {
    const response = await refetch();
    if (response.data) {
      return response.data;
    }
    return [];
  }, [refetch]);

  //handlers
  const handleGetMoreCats = async () => {
    if (isGetRandomCatsLoading || isLoadingMore) return;

    setIsLoadingMore(true);

    try {
      const existingCatIds = new Set(allCats.map((cat) => cat.id));
      const newCats: Array<Cat> = [];
      let attempts = 0;
      const maxAttempts = 20;

      while (newCats.length < 10 && attempts < maxAttempts) {
        attempts++;
        const fetchedCats = await fetchUniqueCats();
        const uniqueCats = fetchedCats.filter((cat) => !existingCatIds.has(cat.id));
        newCats.push(...uniqueCats);
        uniqueCats.forEach((cat) => existingCatIds.add(cat.id));

        console.log(
          `Attempt ${attempts}: Fetched ${fetchedCats.length} cats, ${uniqueCats.length} unique, total new: ${newCats.length}`
        );
      }

      if (newCats.length > 0) {
        // new cats at the top of the list
        setAllCats((prev) => [...newCats, ...prev]);
        console.log(`Added ${newCats.length} new cats to the top`);
      } else {
        console.log('No new unique cats found after maximum attempts');
      }
    } catch (fetchError) {
      console.error('Error fetching more cats:', fetchError);
    } finally {
      setIsLoadingMore(false);
    }
  };

  let selectedCat = {} as Cat;
  if (selectedCatId) {
    selectedCat = allCats.find((cat) => cat.id === selectedCatId) as Cat;
  }

  return {
    cats: allCats,
    isLoading: isGetRandomCatsLoading || isLoadingMore,
    error,
    closeCatModal,
    openCatModal,
    selectedCatId,
    selectedCat,
    handleGetMoreCats,
  };
}
