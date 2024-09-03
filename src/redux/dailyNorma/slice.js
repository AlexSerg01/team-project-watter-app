import { createSlice } from "@reduxjs/toolkit";
import { getNorma } from "./operations";

const dailyNormaSlice = createSlice({
  name: "norma",
  initialState: {
    value: 2.0,
    showModal: false,
    status: 'idle',
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
        state.status = 'loading';
        state.error = null;
        state.loading = true;
      })
      .addCase(getNorma.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newValue = action.payload / 1000;
        state.value = action.payload !== undefined ? newValue : state.value;
        state.loading = false;
      })
      .addCase(getNorma.rejected, (state, action) => {
        state.loading = false; 
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateNorma, openModal, closeModal } = dailyNormaSlice.actions;
export const dailyNormaReducer = dailyNormaSlice.reducer;