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

  const [newCats, setNewCats] = useState<Array<Cat>>([]);
  const [oldCats, setOldCats] = useState<Array<Cat>>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [maxAttemptsReached, setMaxAttemptsReached] = useState(false);

  const { data, isLoading: isGetRandomCatsLoading, error, refetch } = api.useGetRandomCatsQuery({ limit: 10 });

  // update newCats when initial data arrives
  useEffect(() => {
    if (data && newCats.length === 0) {
      setNewCats(data);
    }
  }, [data, newCats.length]);

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
      const existingCatIds = new Set([...newCats, ...oldCats].map((cat) => cat.id));
      const freshCats: Array<Cat> = [];
      let attempts = 0;
      const maxAttempts = 15;
      const targetNewCats = 10;

      console.log(
        `Starting to fetch ${targetNewCats} new cats. Current new: ${newCats.length}, old: ${oldCats.length}`
      );

      while (freshCats.length < targetNewCats && attempts < maxAttempts) {
        attempts++;

        // add small delay to avoid rate limiting
        if (attempts > 1) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        const fetchedCats = await fetchUniqueCats();
        const uniqueCats = fetchedCats.filter((cat) => !existingCatIds.has(cat.id));
        freshCats.push(...uniqueCats);
        uniqueCats.forEach((cat) => existingCatIds.add(cat.id));

        const efficiency = ((uniqueCats.length / fetchedCats.length) * 100).toFixed(1);
        console.log(
          `Attempt ${attempts}: Fetched ${fetchedCats.length} cats, ${uniqueCats.length} unique (${efficiency}% efficiency), total new: ${freshCats.length}/${targetNewCats}`
        );

        // there is no exlude ids on the api so we need to check if we are getting unique cats
        if (attempts > 5 && uniqueCats.length === 0) {
          setMaxAttemptsReached(true);
          console.warn('No unique cats found in recent attempts. API might be rate limited or out of unique cats.');
          break;
        }
      }

      if (freshCats.length > 0) {
        // Move current new cats to old cats, then set fresh cats as new cats
        setOldCats((prev) => [...newCats, ...prev]);
        setNewCats(freshCats);
        console.log(`Successfully added ${freshCats.length} new cats. Moved ${newCats.length} cats to old list.`);
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
    selectedCat = [...newCats, ...oldCats].find((cat) => cat.id === selectedCatId) as Cat;
  }

  return {
    newCats,
    oldCats,
    isLoading: isGetRandomCatsLoading || isLoadingMore,
    error,
    maxAttemptsReached,
    closeCatModal,
    openCatModal,
    selectedCatId,
    selectedCat,
    handleGetMoreCats,
  };
}
