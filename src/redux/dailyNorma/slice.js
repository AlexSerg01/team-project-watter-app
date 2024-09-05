import { createSlice } from "@reduxjs/toolkit";
import { getNorma } from "./operations";

const dailyNormaSlice = createSlice({
  name: "norma",
  initialState: {
    value: null,
    showModal: false,
    error: null,
    loading: false,
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
        state.error = null;
        state.loading = true;
      })
      .addCase(getNorma.fulfilled, (state, action) => {
        const newValue = action.payload / 1000;
        state.value = action.payload !== undefined ? newValue : state.value;
        state.loading = false;
      })
      .addCase(getNorma.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload;
      });
  },
});

export const { updateNorma, openModal, closeModal } = dailyNormaSlice.actions;
export const dailyNormaReducer = dailyNormaSlice.reducer;