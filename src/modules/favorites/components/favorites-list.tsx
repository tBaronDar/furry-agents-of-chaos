import Stack from '@mui/material/Stack';
import type { FavoriteCatReadDTO } from '../../../shared/dto/favorite-cat-read';
import FavoriteCard from './favorite-card';

export type FavoritesListProps = {
  favoriteCats: Array<FavoriteCatReadDTO>;
};

export default function FavoritesList(props: FavoritesListProps) {
  const { favoriteCats } = props;
  return (
    <Stack
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginTop: '16px',
        padding: '8px',
      }}>
      {favoriteCats.map((fc) => (
        <FavoriteCard key={fc.id} favoriteCat={fc} />
      ))}
    </Stack>
  );
}
