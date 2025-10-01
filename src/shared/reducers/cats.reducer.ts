import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CatReadDTO } from '../dto/cat-read';

interface LoadingState {
  cats: Array<CatReadDTO>;
}

const initialState: LoadingState = {
  cats: [],
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    setCats(state, action: PayloadAction<Array<CatReadDTO>>) {
      state.cats = action.payload;
    },
  },
});

export const { setCats } = catsSlice.actions;
export default catsSlice.reducer;
