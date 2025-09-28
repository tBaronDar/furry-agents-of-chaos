import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Cat } from '../dto/cat';

interface CatsState {
  cachedCats: Record<string, Cat>;
}

const initialState: CatsState = {
  cachedCats: {},
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    setCatFavorite(state, action: PayloadAction<{ catId: string; isFavorite: boolean }>) {
      const { catId, isFavorite } = action.payload;

      // Update cached cat's isFavorite status
      if (state.cachedCats[catId]) {
        state.cachedCats[catId].isFavorite = isFavorite;
      }
    },
  },
});

export const { setCatFavorite } = catsSlice.actions;

export default catsSlice.reducer;
