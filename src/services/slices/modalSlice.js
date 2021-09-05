import { createSlice } from '@reduxjs/toolkit';

const preloadedState = {
  editModalOpened: false,
  deleteModalOpened: false,
  addModalOpened: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: preloadedState,
  reducers: {
    toggleModal: (state, action) => { state[`${action.payload}ModalOpened`] = !state[`${action.payload}ModalOpened`]; },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
