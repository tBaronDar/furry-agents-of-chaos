import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CatReadDTO } from '../dto/cat-read';

interface CatsState {
  cats: Array<CatReadDTO>;
  catsByBreed: Array<CatReadDTO>;
}

const initialState: CatsState = {
  cats: [],
  catsByBreed: [],
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    setCats(state, action: PayloadAction<Array<CatReadDTO>>) {
      state.cats = action.payload;
    },
    addMoreCats(state, action: PayloadAction<Array<CatReadDTO>>) {
      state.cats = [...state.cats, ...action.payload];
    },
    setCatsByBreed(state, action: PayloadAction<Array<CatReadDTO>>) {
      state.catsByBreed = action.payload;
    },
  },
});

export const { setCats, addMoreCats, setCatsByBreed } = catsSlice.actions;

export default catsSlice.reducer;
