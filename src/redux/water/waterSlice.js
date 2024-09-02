import { createSlice } from "@reduxjs/toolkit";
import { addWaterRecord, deleteWaterRecord } from "./waterOperations";

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
      .addCase(deleteWaterRecord.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteWaterRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterRecords = state.waterRecords.filter((elem)=> elem._id !== action.payload)
    })
  },
});

export const waterReducer = waterSlice.reducer;
