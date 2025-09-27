import api from '../../../shared/services/query/api';
import { closeModal, openModal } from '../../../shared/reducers/app.reducer';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../config/store';
import { ModalType } from '../../../shared/utils/enums';

export default function useCatsList() {
  const dispatch = useDispatch();
  //query staff
  const { data, isLoading, error } = api.useGetRandomCatsQuery({ limit: 10 });

  //state staff
  const isModalOpen = useSelector((state: RootState) => state.app.isModalOpen);

  const closeCatModal = () => dispatch(closeModal());
  const openCatModal = (id: string) => {
    dispatch(openModal({ type: ModalType.CAT, id }));
  };

  //derived state
  const cats = data ?? [];

  return { cats, isLoading, error, isModalOpen, closeCatModal, openCatModal };
}
