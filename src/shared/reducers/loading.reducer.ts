import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  loadingMessage: string | null;
}

const initialState: LoadingState = {
  isLoading: false,
  loadingMessage: null,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<{ isLoading: boolean; message?: string }>) {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message || null;
    },
    clearLoading(state) {
      state.isLoading = false;
      state.loadingMessage = null;
    },
  },
});

export const { setLoading, clearLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
