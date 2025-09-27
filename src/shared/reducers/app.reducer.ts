import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ModalType } from '../utils/enums';

interface AppState {
  theme: 'light' | 'dark';
  guestId: string;
  currentModal: ModalType | null;
  currentModalId: string | null;
  selectedCatId: string | null;
}

const initialState: AppState = {
  theme: 'light',
  guestId: `guest_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
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
    setGuestId(state, action: PayloadAction<string>) {
      state.guestId = action.payload;
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
  },
});

export const { setTheme, setGuestId, openModal, closeModal, setSelectedCat } = appSlice.actions;
export default appSlice.reducer;
