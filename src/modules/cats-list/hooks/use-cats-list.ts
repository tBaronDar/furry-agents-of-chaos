import api from '../../../shared/services/query/api';
import { closeModal, openModal, setSelectedCat } from '../../../shared/reducers/app.reducer';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../config/store';
import { ModalType } from '../../../shared/utils/enums';
import type { Cat } from '../../../shared/dto/cat-read';

export default function useCatsList() {
  const dispatch = useDispatch();
  const selectedCatId = useSelector((state: RootState) => state.app.selectedCatId);
  //query staff
  const { data, isLoading, error } = api.useGetRandomCatsQuery({ limit: 10 });

  //state staff

  const closeCatModal = () => dispatch(closeModal());
  const openCatModal = (id: string) => {
    dispatch(openModal({ type: ModalType.CAT, id }));
    dispatch(setSelectedCat(id));
  };

  //derived state
  const cats = data ?? [];

  let selectedCat = {} as Cat;
  if (selectedCatId) {
    dispatch(openModal({ type: ModalType.CAT, id: selectedCatId }));
    selectedCat = cats.find((cat) => cat.id === selectedCatId) as Cat;
  }

  return { cats, isLoading, error, closeCatModal, openCatModal, selectedCatId, selectedCat };
}
