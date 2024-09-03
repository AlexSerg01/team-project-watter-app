import { createSlice } from "@reduxjs/toolkit";
import { getNorma } from "./operations";

const dailyNormaSlice = createSlice({
  name: "norma",
  initialState: {
    value: 2.0,
    showModal: false, // Додано для управління видимістю модального вікна
    status: 'idle',
    error: null,
  },
  reducers: {
    updateNorma: (state, action) => {
      state.value = action.payload;
    },
    openModal: (state) => {
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNorma.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNorma.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newValue = action.payload / 1000;
        state.value = action.payload !== undefined ? newValue : state.value;
      })
      .addCase(getNorma.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateNorma, openModal, closeModal } = dailyNormaSlice.actions;
export const dailyNormaReducer = dailyNormaSlice.reducer;