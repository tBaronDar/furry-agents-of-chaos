import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import type { FavoriteCatReadDTO } from '../../../shared/dto/favorite-cat-read';

export type FavoriteCardProps = {
  favoriteCat: FavoriteCatReadDTO;
};

export default function FavoriteCard(props: FavoriteCardProps) {
  const { favoriteCat } = props;
  return (
    <Card>
      <CardContent>
        <CardMedia image={favoriteCat.image.url} alt={favoriteCat.image.id} component='img' />
      </CardContent>
    </Card>
  );
}
