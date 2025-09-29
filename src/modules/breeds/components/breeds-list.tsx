import Stack from '@mui/material/Stack';
import type { CatBreed } from '../../../shared/dto/cat-breed-read';
import type { Cat } from '../../../shared/dto/cat';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedBreedId } from '../../../shared/reducers/app.reducer';
import type { RootState } from '../../../config/store';
import BreedCard from './breed-card';

export type BreedsListProps = {
  breeds: Array<CatBreed>;
  cats: Array<Cat>;
};

export default function BreedsList(props: BreedsListProps) {
  const { breeds, cats } = props;
  const dispatch = useDispatch();
  const handleSelectBreed = (breedId: string) => {
    if (selectedBreedId === breedId) {
      dispatch(setSelectedBreedId(null));
    } else {
      dispatch(setSelectedBreedId(breedId));
    }
  };
  const selectedBreedId = useSelector((state: RootState) => state.app.selectedBreedId);

  return (
    <Stack
      sx={{
        gap: 2,
        py: 2,
        height: '100vh',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#c1c1c1',
          borderRadius: '4px',
          '&:hover': {
            background: '#a8a8a8',
          },
        },
      }}>
      {breeds.map((breed) => (
        <BreedCard
          key={breed.id}
          breed={breed}
          handleSelectBreed={handleSelectBreed}
          selectedBreedId={selectedBreedId}
          cats={cats}
        />
      ))}
    </Stack>
  );
}
