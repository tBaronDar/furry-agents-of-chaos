import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import type { CatReadDTO } from '../../../shared/dto/cat-read';
import Skeleton from '@mui/material/Skeleton';
import CardContent from '@mui/material/CardContent';
import HeartIcon from '@mui/icons-material/Favorite';
import { useMatch, useNavigate } from 'react-router-dom';
import type { FavoriteCatReadDTO } from '../../../shared/dto/favorite-cat-read';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import Tooltip from '@mui/material/Tooltip';

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
    <Tooltip arrow placement='top' title='Click to see more agent information'>
      <Card
        elevation={5}
        sx={{
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
          borderRadius: '16px',
          overflow: 'hidden',
          pb: 0,
        }}
        onClick={handleClick}>
        {isLoading ? (
          <Skeleton variant='rectangular' height='200px' />
        ) : (
          <CardContent sx={{ padding: 1 }}>
            <CardMedia
              component='img'
              height='200'
              image={cat.url}
              alt={`Cat ${cat.id}`}
              sx={{
                objectFit: 'cover',
                width: '100%',
                borderRadius: '12px',
              }}
            />
          </CardContent>
        )}
        <CardActionArea
          sx={{
            px: '10px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {isFavorite && !isLoading ? (
            <>
              <HeartIcon sx={{ fontSize: '12px', fill: 'pink' }} />
              <Typography sx={{ fontSize: '12px', fontStyle: 'italic', textAlign: 'right', py: '2px' }} variant='body1'>
                This beauty is in your favorites!
              </Typography>
            </>
          ) : (
            <Box height='16px' />
          )}
        </CardActionArea>
      </Card>
    </Tooltip>
  );
}
