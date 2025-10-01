import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CatBreedReadDTO } from '../dto/cat-breed-read';

interface BreedsState {
  breeds: Array<CatBreedReadDTO>;
}

const initialState: BreedsState = {
  breeds: [],
};

const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    setBreeds(state, action: PayloadAction<Array<CatBreedReadDTO>>) {
      state.breeds = action.payload;
    },
  },
});

export const { setBreeds } = breedsSlice.actions;

export default breedsSlice.reducer;
