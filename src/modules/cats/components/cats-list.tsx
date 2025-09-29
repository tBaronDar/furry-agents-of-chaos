import Stack from '@mui/material/Stack';
import CatCard from './cat-card';
import type { CatReadDTO } from '../../../shared/dto/cat-read';
import api from '../../../shared/services/query/api';
import type { RootState } from '../../../config/store';
import { useSelector } from 'react-redux';

type CatsListProps = {
  cats: Array<CatReadDTO>;
  isLoading?: boolean;
};

export default function CatsList(props: CatsListProps) {
  const { cats, isLoading } = props;
  const guest = useSelector((state: RootState) => state.app.guest);
  const { data } = api.useGetFavoritesQuery({ subId: guest.id });
  const favorites = data || [];
  return (
    <Stack
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginTop: '16px',
        padding: '8px',
      }}>
      {cats.map((cat) => (
        <CatCard key={cat.id} cat={cat} isLoading={isLoading} favorites={favorites} />
      ))}
    </Stack>
  );
}
