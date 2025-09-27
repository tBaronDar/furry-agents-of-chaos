import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import type { Cat } from '../../../shared/dto/cat-read';

type CatCardProps = {
  cat: Cat;
};

export default function CatCard(props: CatCardProps) {
  const { cat } = props;

  return (
    <Card>
      <CardMedia component='img' height='140' image={cat.url} alt='Cat' />
    </Card>
  );
}
