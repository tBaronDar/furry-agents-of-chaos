import Stack from '@mui/material/Stack';
import type { CatBreed } from '../../../shared/dto/cat-breed-read';
import type { Cat } from '../../../shared/dto/cat';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, setSelectedBreedId } from '../../../shared/reducers/app.reducer';
import type { RootState } from '../../../config/store';
import CatModal from '../../../shared/components/modals/cat-details/cat-modal';
import useFavorites from '../../../shared/hooks/use-favorites';
import BreedCard from './breed-card';

export type BreedsListProps = {
  breeds: Array<CatBreed>;
  cats: Array<Cat>;
};

export default function BreedsList(props: BreedsListProps) {
  const { breeds, cats } = props;
  const { refetchFavorites, favoritesData } = useFavorites();
  const dispatch = useDispatch();
  const handleSelectBreed = (breedId: string) => {
    if (selectedBreedId === breedId) {
      dispatch(setSelectedBreedId(null));
    } else {
      dispatch(setSelectedBreedId(breedId));
    }
  };
  const selectedBreedId = useSelector((state: RootState) => state.app.selectedBreedId);
  const guest = useSelector((state: RootState) => state.app.guest);
  const selectedCatId = useSelector((state: RootState) => state.app.selectedCatId);

  const selectedCat = cats.find((cat) => cat.id === selectedCatId) as Cat;
  const closeCatModal = () => dispatch(closeModal());

  console.log(breeds);
  console.log('selectedBreedId', selectedBreedId);

  return (
    <>
      {selectedCat && selectedCatId && (
        <CatModal
          selectedCat={selectedCat}
          closeCatModal={closeCatModal}
          guest={guest}
          refetchFavorites={refetchFavorites}
          favoritesData={favoritesData}
        />
      )}
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
    </>
  );
}
