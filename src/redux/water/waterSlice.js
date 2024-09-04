import { createSlice } from "@reduxjs/toolkit";
import { addWaterRecord, deleteWaterRecord, updateWaterRecord } from "./waterOperations";

const initialState = {
  isLoading: false,
  error: null,
  waterRecords: [],
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWaterRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWaterRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addWaterRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterRecords.push(action.payload);
        console.log(state.waterRecords.length);
      })
      .addCase(deleteWaterRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWaterRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterRecords = state.waterRecords.filter(
          (elem) => elem.data._id !== action.payload
        );
      })
      .addCase(updateWaterRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWaterRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateWaterRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.waterRecords.findIndex(
          (record) => record._id === action.payload._id
        );
        if (index !== -1) {
          state.waterRecords[index] = action.payload;
        }
      });
  },
});

export const waterReducer = waterSlice.reducer;