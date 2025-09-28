import api from '../../../shared/services/query/api';
import { closeModal, openModal, setSelectedCat, ensureGuestExists } from '../../../shared/reducers/app.reducer';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../config/store';
import { ModalType } from '../../../shared/utils/enums';
import type { CatReadDTO } from '../../../shared/dto/cat-read';
import type { Cat } from '../../../shared/dto/cat';
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  setInitialLoading,
  setFetchingMoreCats,
  setMaxAttemptsReached,
} from '../../../shared/reducers/loading.reducer';
import { mapCatReadToCat } from '../../../shared/utils/mapper';

export default function useCatsList() {
  const dispatch = useDispatch();
  const selectedCatId = useSelector((state: RootState) => state.app.selectedCatId);
  const guest = useSelector((state: RootState) => state.app.guest);

  const [newCats, setNewCats] = useState<Array<Cat>>([]);
  const [oldCats, setOldCats] = useState<Array<Cat>>([]);

  const { data, isLoading: isGetRandomCatsLoading, error, refetch } = api.useGetRandomCatsQuery({ limit: 10 });

  const mappedData = useMemo(() => {
    return data?.map(mapCatReadToCat);
  }, [data]);

  useEffect(() => {
    dispatch(setInitialLoading(isGetRandomCatsLoading));
  }, [isGetRandomCatsLoading, dispatch]);

  // Ensure guest exists on mount
  useEffect(() => {
    if (!guest) {
      dispatch(ensureGuestExists());
    }
  }, [guest, dispatch]);

  // update newCats when initial data arrives
  useEffect(() => {
    if (mappedData && newCats.length === 0) {
      setNewCats(mappedData);
    }
  }, [mappedData, newCats.length]);

  //state staff
  const closeCatModal = () => dispatch(closeModal());
  const openCatModal = (id: string) => {
    dispatch(openModal({ type: ModalType.CAT, id }));
    dispatch(setSelectedCat(id));
  };

  const fetchUniqueCats = useCallback(async (): Promise<Array<CatReadDTO>> => {
    const response = await refetch();
    if (response.data) {
      return response.data;
    }
    return [];
  }, [refetch]);

  //handlers
  const handleGetMoreCats = async () => {
    if (isGetRandomCatsLoading) return;

    dispatch(setFetchingMoreCats(true));

    try {
      const existingCatIds = new Set([...newCats, ...oldCats].map((cat) => cat.id));
      const freshCats: Array<CatReadDTO> = [];
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
        const mappedFetchedCats = fetchedCats.map(mapCatReadToCat);
        const uniqueCats = mappedFetchedCats.filter((cat) => !existingCatIds.has(cat.id));
        freshCats.push(...uniqueCats);
        uniqueCats.forEach((cat) => existingCatIds.add(cat.id));

        const efficiency = ((uniqueCats.length / mappedFetchedCats.length) * 100).toFixed(1);
        console.log(
          `Attempt ${attempts}: Fetched ${mappedFetchedCats.length} cats, ${uniqueCats.length} unique (${efficiency}% efficiency), total new: ${freshCats.length}/${targetNewCats}`
        );

        // there is no exlude ids on the api so we need to check if we are getting unique cats
        if (attempts > 5 && uniqueCats.length === 0) {
          dispatch(setMaxAttemptsReached(true));
          console.warn('No unique cats found in recent attempts. API might be rate limited or out of unique cats.');
          break;
        }
      }

      if (freshCats.length > 0) {
        // Move current new cats to old cats, then set fresh cats as new cats
        setOldCats((prev) => [...newCats, ...prev]);
        setNewCats(freshCats.map(mapCatReadToCat));
        console.log(`Successfully added ${freshCats.length} new cats. Moved ${newCats.length} cats to old list.`);
      } else {
        console.log('No new unique cats found after maximum attempts');
      }
    } catch (fetchError) {
      console.error('Error fetching more cats:', fetchError);
    } finally {
      dispatch(setFetchingMoreCats(false));
    }
  };

  let selectedCat = {} as Cat;
  if (selectedCatId) {
    selectedCat = [...newCats, ...oldCats].find((cat) => cat.id === selectedCatId) as Cat;
  }

  return {
    newCats,
    oldCats,
    error,
    closeCatModal,
    openCatModal,
    selectedCatId,
    selectedCat,
    handleGetMoreCats,
    guest,
  };
}
