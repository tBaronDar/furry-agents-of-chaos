import api from '../../../shared/services/query/api';
import { closeModal, openModal } from '../../../shared/reducers/app.reducer';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../config/store';

export default function useCatsList() {
  const { data, isLoading, error } = api.useGetRandomCatsQuery({ limit: 10 });
  const isModalOpen = useSelector((state: RootState) => state.app.isModalOpen);

  const closeCatModal = closeModal;
  const openCatModal = (id: string) => openModal({ type: 'cat', id });
  const cats = data ?? [];

  return { cats, isLoading, error, isModalOpen, closeCatModal, openCatModal };
}
