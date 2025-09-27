import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import type { Cat } from '../../../shared/dto/cat-read';

type CatCardProps = {
  cat: Cat;
  openCatModal: (id: string) => void;
};

export default function CatCard(props: CatCardProps) {
  const { cat, openCatModal } = props;

  const handleClick = () => {
    openCatModal(cat.id);
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
    </Card>
  );
}
