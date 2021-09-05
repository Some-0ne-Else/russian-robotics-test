import { createSlice } from '@reduxjs/toolkit';

const preloadedState = {
  modalOpened: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: preloadedState,
  reducers: {
    toggleModal: (state) => { state.modalOpened = !state.modalOpened; },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
