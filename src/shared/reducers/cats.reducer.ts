import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CatReadDTO } from '../dto/cat-read';

interface CatsState {
  newCats: Array<CatReadDTO>;
  oldCats: Array<CatReadDTO>;
}

const initialState: CatsState = {
  newCats: [],
  oldCats: [],
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    setNewCats(state, action: PayloadAction<Array<CatReadDTO>>) {
      state.newCats = action.payload;
    },
    setOldCats(state, action: PayloadAction<Array<CatReadDTO>>) {
      state.oldCats = action.payload;
    },
    addMoreCats(state, action: PayloadAction<{ newCats: Array<CatReadDTO>; oldCats: Array<CatReadDTO> }>) {
      state.newCats = action.payload.newCats;
      state.oldCats = action.payload.oldCats;
    },
  },
});

export const { setNewCats, setOldCats, addMoreCats } = catsSlice.actions;

export default catsSlice.reducer;
