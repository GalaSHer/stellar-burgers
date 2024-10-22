import { createSlice } from '@reduxjs/toolkit';

type TModalState = {
  modalIsOpen: boolean;
};

const initialState: TModalState = {
  modalIsOpen: false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalIsOpen = true;
    },
    closeModal: (state) => {
      state.modalIsOpen = false;
    }
  },
  selectors: {
    isModalOpenSelector: (state) => state.modalIsOpen
  }
});

export const { reducer } = modalSlice;
export const { openModal, closeModal } = modalSlice.actions;
export const { isModalOpenSelector } = modalSlice.selectors;
