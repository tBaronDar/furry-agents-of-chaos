import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  theme: 'light' | 'dark';
  guestId: string;
  isModalOpen: boolean;
  currentModal: 'cat' | 'breed' | null;
  currentModalId: string | null;
}

const initialState: AppState = {
  theme: 'light',
  guestId: `guest_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
  isModalOpen: false,
  currentModal: null,
  currentModalId: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setGuestId: (state, action: PayloadAction<string>) => {
      state.guestId = action.payload;
    },
    openModal: (state, action: PayloadAction<{ type: 'cat' | 'breed'; id: string }>) => {
      state.isModalOpen = true;
      state.currentModal = action.payload.type;
      state.currentModalId = action.payload.id;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.currentModal = null;
      state.currentModalId = null;
    },
  },
});

export const { setTheme, setGuestId, openModal, closeModal } = appSlice.actions;
export default appSlice.reducer;
