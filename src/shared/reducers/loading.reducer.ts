import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isInitialLoading: boolean;
  isFetchingMoreCats: boolean;
  maxAttemptsReached: boolean;
}

const initialState: LoadingState = {
  isInitialLoading: false,
  isFetchingMoreCats: false,
  maxAttemptsReached: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setInitialLoading(state, action: PayloadAction<boolean>) {
      state.isInitialLoading = action.payload;
    },
    setFetchingMoreCats(state, action: PayloadAction<boolean>) {
      state.isFetchingMoreCats = action.payload;
    },
    setMaxAttemptsReached(state, action: PayloadAction<boolean>) {
      state.maxAttemptsReached = action.payload;
    },
    clearAllLoading(state) {
      state.isInitialLoading = false;
      state.isFetchingMoreCats = false;
      state.maxAttemptsReached = false;
    },
  },
});

export const { setInitialLoading, setFetchingMoreCats, setMaxAttemptsReached, clearAllLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
