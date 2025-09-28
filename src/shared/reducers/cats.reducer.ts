import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Cat } from '../dto/cat';
import type { CatBreed } from '../dto/cat-breed-read';
import type { CatReadDTO } from '../dto/cat-read';
import { mapCatReadToCat } from '../utils/mapper';

interface CatsState {
  cachedCats: Record<string, Cat>;
  cachedBreeds: Record<string, CatBreed>;
  lastViewedCats: Array<string>;
}

const initialState: CatsState = {
  cachedCats: {},
  cachedBreeds: {},
  lastViewedCats: [],
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    cacheCat(state, action: PayloadAction<CatReadDTO>) {
      state.cachedCats[action.payload.id] = mapCatReadToCat(action.payload);
    },
    cacheCats(state, action: PayloadAction<Array<Cat>>) {
      action.payload.forEach((cat) => {
        state.cachedCats[cat.id] = cat;
      });
    },
    cacheBreed(state, action: PayloadAction<CatBreed>) {
      state.cachedBreeds[action.payload.id] = action.payload;
    },
    cacheBreeds(state, action: PayloadAction<Array<CatBreed>>) {
      action.payload.forEach((breed) => {
        state.cachedBreeds[breed.id] = breed;
      });
    },
    setCatFavorite(state, action: PayloadAction<{ catId: string; isFavorite: boolean }>) {
      const { catId, isFavorite } = action.payload;

      // Update cached cat's isFavorite status
      if (state.cachedCats[catId]) {
        state.cachedCats[catId].isFavorite = isFavorite;
      }
    },
    addToLastViewed(state, action: PayloadAction<string>) {
      const catId = action.payload;
      state.lastViewedCats = state.lastViewedCats.filter((id) => id !== catId);
      state.lastViewedCats.unshift(catId);
      // Keep only last 20 viewed cats
      if (state.lastViewedCats.length > 20) {
        state.lastViewedCats = state.lastViewedCats.slice(0, 20);
      }
    },
  },
});

export const { cacheCat, cacheCats, cacheBreed, cacheBreeds, setCatFavorite, addToLastViewed } = catsSlice.actions;

export default catsSlice.reducer;
