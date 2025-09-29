import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { CatBreed } from '../../../shared/dto/cat-breed-read';
import CatsList from '../../cats/components/cats-list';
import useBreedCard from '../hooks/use-breed-card';

export type BreedCardProps = {
  breed: CatBreed;
};

export default function BreedCard(props: BreedCardProps) {
  const { breed } = props;
  const { cats, isLoading, handleSelectBreed, selectedBreedId } = useBreedCard();
  return (
    <Card
      key={breed.id}
      onClick={() => handleSelectBreed(breed.id)}
      sx={{ cursor: 'pointer', minHeight: selectedBreedId === breed.id ? '100vh' : '150px' }}>
      <CardContent sx={{ minHeight: 'min-content' }}>
        <Typography variant='h6'>{breed.name}</Typography>
        <Typography variant='body1'>{breed.temperament}</Typography>
        <Typography variant='body1'>{breed.origin}</Typography>
        <Typography variant='body1'>{breed.description}</Typography>
        {selectedBreedId === breed.id && <CatsList cats={cats} isLoading={isLoading} />}
      </CardContent>
    </Card>
  );
}
