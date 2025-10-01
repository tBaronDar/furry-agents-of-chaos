import Stack from '@mui/material/Stack';
import type { CatBreedReadDTO } from '../../../shared/dto/cat-breed-read';
import BreedCard from './breed-card';

export type BreedsListProps = {
  breeds: Array<CatBreedReadDTO>;
};

export default function BreedsList(props: BreedsListProps) {
  const { breeds } = props;

  return (
    <Stack
      sx={{
        gap: 2,
        py: 2,
        px: 2,
      }}>
      {breeds.map((breed) => (
        <BreedCard key={breed.id} breed={breed} />
      ))}
    </Stack>
  );
}
