import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import type { FavoriteCatReadDTO } from '../../../shared/dto/favorite-cat-read';
import TrashIcon from '@mui/icons-material/Delete';
import api from '../../../shared/services/query/api';
import CircularProgress from '@mui/material/CircularProgress';

export type FavoriteCardProps = {
  favoriteCat: FavoriteCatReadDTO;
};

export default function FavoriteCard(props: FavoriteCardProps) {
  const { favoriteCat } = props;
  const [removeFromFavoritesMutation, removeFromFavoritesResult] = api.useRemoveFromFavoritesMutation();
  const { isLoading: isRemovingFromFavorites } = removeFromFavoritesResult;

  const handleDeleteFavorite = async (id: number) => {
    await removeFromFavoritesMutation({ favoriteId: id.toString() }).unwrap();
    api.util.invalidateTags(['Favorites']);
  };

  return (
    <Card onClick={() => handleDeleteFavorite(favoriteCat.id)} sx={{ cursor: 'pointer', position: 'relative' }}>
      <CardContent sx={{ width: 200, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {isRemovingFromFavorites ? (
          <CircularProgress size={100} />
        ) : (
          <CardMedia
            image={favoriteCat.image.url}
            alt={favoriteCat.image.id}
            component='img'
            sx={{ width: '100%', height: '100%' }}
          />
        )}
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
