import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import type { FavoriteCatReadDTO } from '../../../shared/dto/favorite-cat-read';
import TrashIcon from '@mui/icons-material/Delete';
import api from '../../../shared/services/query/api';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';

export type FavoriteCardProps = {
  favoriteCat: FavoriteCatReadDTO;
};

export default function FavoriteCard(props: FavoriteCardProps) {
  const { favoriteCat } = props;
  const [removeFromFavoritesMutation, removeFromFavoritesResult] = api.useRemoveFromFavoritesMutation();
  const { isLoading: isRemovingFromFavorites } = removeFromFavoritesResult;
  const [isSelectedCat, setIsSelectedCat] = useState<boolean>(Boolean(favoriteCat));

  const handleDeleteFavorite = async (id: number) => {
    setIsSelectedCat(false);
    await removeFromFavoritesMutation({ favoriteId: id }).unwrap();
  };

  return (
    <>
      {isSelectedCat && (
        <Tooltip arrow placement='top' title='Click to remove from favorites'>
          <Card
            elevation={5}
            onClick={() => handleDeleteFavorite(favoriteCat.id)}
            sx={{ cursor: 'pointer', position: 'relative' }}>
            <CardContent>
              {isRemovingFromFavorites ? (
                <CircularProgress size={100} />
              ) : (
                <CardMedia
                  component='img'
                  height='200'
                  image={favoriteCat.image.url}
                  alt={favoriteCat.image.id}
                  sx={{
                    objectFit: 'cover',
                    width: '100%',
                    borderRadius: '12px',
                  }}
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
                transition: 'color 0.3s ease-in-out',
                color: 'transparent',
                '&:hover': {
                  color: 'inherit',
                },
              }}
            />
          </Card>
        </Tooltip>
      )}
    </>
  );
}
