import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ModalType } from '../utils/enums';
import type { Guest } from '../dto/guest';

interface AppState {
  theme: 'light' | 'dark';
  guest: Guest;
  currentModal: ModalType | null;
  currentModalId: string | null;
  selectedCatId: string | null;
}

const createInitialGuest = (): Guest => ({
  id: `guest_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
  guestName: '',
  favoriteCatsIds: [],
});

const initialState: AppState = {
  theme: 'light',
  guest: createInitialGuest(),
  currentModal: null,
  currentModalId: null,
  selectedCatId: null,
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
    openModal(state, action: PayloadAction<{ type: ModalType; id: string }>) {
      state.currentModal = action.payload.type;
      state.currentModalId = action.payload.id;
    },
    closeModal(state) {
      state.selectedCatId = null;
    },
    setSelectedCat(state, action: PayloadAction<string>) {
      state.selectedCatId = action.payload;
    },
    ensureGuestExists(state) {
      if (!state.guest) {
        state.guest = createInitialGuest();
      }
    },
    toggleCatFavorite(state, action: PayloadAction<string>) {
      if (state.guest && state.guest.guestName !== '') {
        const catId = action.payload;
        const isCurrentlyFavorite = state.guest.favoriteCatsIds.includes(catId);

        if (isCurrentlyFavorite) {
          state.guest.favoriteCatsIds = state.guest.favoriteCatsIds.filter((id) => id !== catId);
        } else {
          state.guest.favoriteCatsIds.push(catId);
        }
      }
    },
  },
});

export const { setTheme, setGuest, openModal, closeModal, setSelectedCat, ensureGuestExists, toggleCatFavorite } =
  appSlice.actions;
export default appSlice.reducer;
