import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import type { FavoriteCatReadDTO } from '../../../shared/dto/favorite-cat-read';
import TrashIcon from '@mui/icons-material/Delete';

export type FavoriteCardProps = {
  favoriteCat: FavoriteCatReadDTO;
};

export default function FavoriteCard(props: FavoriteCardProps) {
  const { favoriteCat } = props;
  return (
    <Card sx={{ cursor: 'pointer', position: 'relative' }}>
      <CardContent sx={{ width: 200, height: 200 }}>
        <CardMedia
          image={favoriteCat.image.url}
          alt={favoriteCat.image.id}
          component='img'
          sx={{ width: '100%', height: '100%' }}
        />
      </CardContent>
      <TrashIcon
        sx={{
          padding: '36px',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          color: 'transparent',
          '&:hover': {
            color: 'inherit',
          },
        }}
      />
    </Card>
  );
}
