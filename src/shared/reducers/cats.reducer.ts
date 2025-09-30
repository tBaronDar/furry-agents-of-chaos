import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CatReadDTO } from '../dto/cat-read';

interface CatsState {
  newCats: Array<CatReadDTO>;
  oldCats: Array<CatReadDTO>;
  catsByBreed: Array<CatReadDTO>;
}

const initialState: CatsState = {
  newCats: [],
  oldCats: [],
  catsByBreed: [],
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    setNewCats(state, action: PayloadAction<Array<CatReadDTO>>) {
      state.newCats = action.payload || [];
    },
    setOldCats(state, action: PayloadAction<Array<CatReadDTO>>) {
      state.oldCats = action.payload || [];
    },
    addCatsToOldCats(state, action: PayloadAction<Array<CatReadDTO>>) {
      state.oldCats = [...(state.oldCats || []), ...(action.payload || [])];
    },
    setCatsByBreed(state, action: PayloadAction<Array<CatReadDTO>>) {
      state.catsByBreed = action.payload || [];
    },
  },
});

export const { setNewCats, addCatsToOldCats, setCatsByBreed, setOldCats } = catsSlice.actions;

export default catsSlice.reducer;
