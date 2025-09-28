import Stack from '@mui/material/Stack';
import type { FavoriteCatReadDTO } from '../../../shared/dto/favorite-cat-read';
import FavoriteCard from './favorite-card';

export type FavoritesListProps = {
  favoriteCats: Array<FavoriteCatReadDTO>;
};

export default function FavoritesList(props: FavoritesListProps) {
  const { favoriteCats } = props;
  return (
    <Stack>
      {favoriteCats.map((fc) => (
        <FavoriteCard key={fc.id} favoriteCat={fc} />
      ))}
    </Stack>
  );
}
