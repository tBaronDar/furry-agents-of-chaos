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
    <Card sx={{ cursor: 'pointer' }} onClick={handleClick}>
      <CardMedia component='img' height='140' image={cat.url} alt='Cat' />
    </Card>
  );
}
