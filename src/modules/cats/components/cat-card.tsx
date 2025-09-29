import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import type { CatReadDTO } from '../../../shared/dto/cat-read';
import Skeleton from '@mui/material/Skeleton';
import CardContent from '@mui/material/CardContent';
import HeartIcon from '@mui/icons-material/Favorite';
import { useMatch, useNavigate } from 'react-router-dom';
import type { FavoriteCatReadDTO } from '../../../shared/dto/favorite-cat-read';

type CatCardProps = {
  cat: CatReadDTO;
  isLoading?: boolean;
  favorites: Array<FavoriteCatReadDTO>;
};

export default function CatCard(props: CatCardProps) {
  const { cat, isLoading, favorites } = props;
  const navigate = useNavigate();
  const isCatModalRoute = useMatch('/cats');
  const isBreedModalRoute = useMatch('/breeds');
  const handleClick = async () => {
    if (isCatModalRoute) {
      await navigate(`/cats/${cat.id}`);
    } else if (isBreedModalRoute) {
      await navigate(`/breeds/${cat.id}`);
    }
  };

  const isFavorite = favorites.some((favorite) => favorite.image_id === cat.id);

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
        borderRadius: '12px',
        overflow: 'hidden',
      }}
      onClick={handleClick}>
      {isLoading ? (
        <Skeleton variant='rectangular' height='200' />
      ) : (
        <CardContent sx={{ padding: 1, position: 'relative' }}>
          <CardMedia
            component='img'
            height='200'
            image={cat.url}
            alt={`Cat ${cat.id}`}
            sx={{
              objectFit: 'cover',
              width: '100%',
            }}
          />
          <HeartIcon
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              fill: isFavorite ? 'pink' : 'transparent',
              stroke: 'pink',
              fontSize: '40px',
            }}
          />
        </CardContent>
      )}
    </Card>
  );
}
