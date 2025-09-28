import Stack from '@mui/material/Stack';
import type { CatBreed } from '../../../shared/dto/cat-breed-read';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { Cat } from '../../../shared/dto/cat';
import CatsList from '../../cats/components/cats-list';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, setSelectedBreedId } from '../../../shared/reducers/app.reducer';
import type { RootState } from '../../../config/store';
import CatModal from '../../../shared/components/modals/cat-details/cat-modal';
import useFavorites from '../../../shared/hooks/use-favorites';

export type BreedsListProps = {
  breeds: Array<CatBreed>;
  cats: Array<Cat>;
};

export default function BreedsList(props: BreedsListProps) {
  const { breeds, cats } = props;
  const { refetchFavorites, favoritesData } = useFavorites();
  const dispatch = useDispatch();
  const handleSelectBreed = (breedId: string) => {
    dispatch(setSelectedBreedId(breedId));
  };
  const selectedBreedId = useSelector((state: RootState) => state.app.selectedBreedId);
  const guest = useSelector((state: RootState) => state.app.guest);
  const selectedCatId = useSelector((state: RootState) => state.app.selectedCatId);

  const selectedCat = cats.find((cat) => cat.id === selectedCatId) as Cat;
  const closeCatModal = () => dispatch(closeModal());

  return (
    <>
      <CatModal
        selectedCat={selectedCat}
        closeCatModal={closeCatModal}
        guest={guest}
        refetchFavorites={refetchFavorites}
        favoritesData={favoritesData}
      />
      <Stack>
        {breeds.map((breed) => (
          <Card key={breed.id} onClick={() => handleSelectBreed(breed.id)}>
            <CardContent>
              <Typography variant='h6'>{breed.name}</Typography>
              <Typography variant='body1'>{breed.temperament}</Typography>
              <Typography variant='body1'>{breed.origin}</Typography>
              <Typography variant='body1'>{breed.description}</Typography>
              {selectedBreedId && <CatsList cats={cats} />}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
}
