import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FavoriteCatReadDTO } from '../dto/favorite-cat-read';

interface FavoritesState {
  favoriteCats: Array<FavoriteCatReadDTO>;
}

const initialState: FavoritesState = {
  favoriteCats: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoriteCats(state, action: PayloadAction<Array<FavoriteCatReadDTO>>) {
      state.favoriteCats = action.payload;
    },
  },
});

export const { setFavoriteCats } = favoritesSlice.actions;

export default favoritesSlice.reducer;
