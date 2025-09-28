import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import type { Cat } from '../../../shared/dto/cat';
import Skeleton from '@mui/material/Skeleton';
import CardContent from '@mui/material/CardContent';
import HeartIcon from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux';
import { setSelectedCatId } from '../../../shared/reducers/app.reducer';
type CatCardProps = {
  cat: Cat;
  isLoading?: boolean;
};

export default function CatCard(props: CatCardProps) {
  const { cat, isLoading } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedCatId(cat.id));
  };

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
              fill: cat.isFavorite ? 'pink' : 'transparent',
              stroke: 'pink',
              fontSize: '40px',
            }}
          />
        </CardContent>
      )}
    </Card>
  );
}
