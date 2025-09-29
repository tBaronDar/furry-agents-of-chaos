import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ModalType } from '../utils/enums';
import type { Guest } from '../dto/guest';

interface AppState {
  theme: 'light' | 'dark';
  guest: Guest;
  currentModal: ModalType | null;
  currentModalId: string | null;
  selectedCatId: string | null;
  selectedBreedId: string | null;
}

export const createInitialGuest = (): Guest => ({
  id: `guest_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
  guestName: '',
});

const initialState: AppState = {
  theme: 'light',
  guest: createInitialGuest(),
  currentModal: null,
  currentModalId: null,
  selectedCatId: null,
  selectedBreedId: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
    },
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

export const { setTheme, setGuest, ensureGuestExists } = appSlice.actions;
export default appSlice.reducer;
