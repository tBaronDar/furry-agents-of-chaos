import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Cat, CatBreed } from '../services/query/api';

interface CatsState {
  cachedCats: Record<string, Cat>;
  cachedBreeds: Record<string, CatBreed>;
  favoriteIds: string[];
  lastViewedCats: string[];
}

const initialState: CatsState = {
  cachedCats: {},
  cachedBreeds: {},
  favoriteIds: [],
  lastViewedCats: [],
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    cacheCat: (state, action: PayloadAction<Cat>) => {
      state.cachedCats[action.payload.id] = action.payload;
    },
    cacheCats: (state, action: PayloadAction<Cat[]>) => {
      action.payload.forEach(cat => {
        state.cachedCats[cat.id] = cat;
      });
    },
    cacheBreed: (state, action: PayloadAction<CatBreed>) => {
      state.cachedBreeds[action.payload.id] = action.payload;
    },
    cacheBreeds: (state, action: PayloadAction<CatBreed[]>) => {
      action.payload.forEach(breed => {
        state.cachedBreeds[breed.id] = breed;
      });
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favoriteIds = state.favoriteIds.filter(id => id !== action.payload);
    },
    addToLastViewed: (state, action: PayloadAction<string>) => {
      const catId = action.payload;
      state.lastViewedCats = state.lastViewedCats.filter(id => id !== catId);
      state.lastViewedCats.unshift(catId);
      // Keep only last 20 viewed cats
      if (state.lastViewedCats.length > 20) {
        state.lastViewedCats = state.lastViewedCats.slice(0, 20);
      }
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favoriteIds = action.payload;
    },
  },
});

export const {
  cacheCat,
  cacheCats,
  cacheBreed,
  cacheBreeds,
  addToFavorites,
  removeFromFavorites,
  addToLastViewed,
  setFavorites,
} = catsSlice.actions;

export default catsSlice.reducer;
