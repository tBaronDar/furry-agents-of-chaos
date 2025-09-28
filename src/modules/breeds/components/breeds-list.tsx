import Stack from '@mui/material/Stack';
import type { CatBreed } from '../../../shared/dto/cat-breed-read';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export type BreedsListProps = {
  breeds: Array<CatBreed>;
  isLoading: boolean;
};

export default function BreedsList(props: BreedsListProps) {
  const { breeds } = props;
  return (
    <Stack>
      {breeds.map((breed) => (
        <Card key={breed.id}>
          <CardContent>
            <Typography variant='h6'>{breed.name}</Typography>
            <Typography variant='body1'>{breed.temperament}</Typography>
            <Typography variant='body1'>{breed.origin}</Typography>
            <Typography variant='body1'>{breed.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
