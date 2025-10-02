import Stack from '@mui/material/Stack';
import CatCard from './cat-card';
import type { CatReadDTO } from '../../../shared/dto/cat-read';
import api from '../../../shared/services/query/api';
import type { RootState } from '../../../config/store';
import { useSelector } from 'react-redux';
import { chunkArray } from '../../../shared/utils/chunk-arrays';
import CustomLoadingSpinner from '../../../shared/components/custom-loading-spinner';

type CatsListProps = {
  cats: Array<CatReadDTO>;
  isLoading?: boolean;
};

export default function CatsList(props: CatsListProps) {
  const { cats, isLoading } = props;
  const guest = useSelector((state: RootState) => state.app.guest);
  const { data, isLoading: isLoadingFavorites } = api.useGetFavoritesQuery({ subId: guest.id });
  const favorites = data || [];
  const catChunks = chunkArray(cats, 10);

  const isListLoading = isLoading || isLoadingFavorites;
  return (
    <>
      {isListLoading ? (
        <CustomLoadingSpinner type='local' size={160} />
      ) : (
        cats.length > 0 &&
        catChunks.map((chunk, chunkIndex) => (
          <Stack
            key={`chunk-${chunk[0]?.id || chunkIndex}`}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
              marginTop: chunkIndex === 0 ? '16px' : '32px',
              padding: '8px',
            }}>
            {chunk.map((cat) => (
              <CatCard key={cat.id} cat={cat} isLoading={isLoading || isLoadingFavorites} favorites={favorites} />
            ))}
          </Stack>
        ))
      )}
    </>
  );
}
