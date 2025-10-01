import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Guest } from '../dto/guest';

interface AppState {
  guest: Guest;
}

export const createInitialGuest = (): Guest => ({
  id: `guest_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
  guestName: '',
});

const initialState: AppState = {
  guest: createInitialGuest(),
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setGuest(state, action: PayloadAction<Guest>) {
      state.guest = action.payload;
    },
    ensureGuestExists(state) {
      if (!state.guest) {
        state.guest = createInitialGuest();
      }
    },
  },
});

export const { setGuest, ensureGuestExists } = appSlice.actions;
export default appSlice.reducer;
