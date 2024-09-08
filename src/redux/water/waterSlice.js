import { createSlice } from "@reduxjs/toolkit";
import {
  addWaterRecord,
  deleteWaterRecord,
  getAllWaterRecordsPerDay,
  updateWaterRecord,
  fetchWaterMonthInfo,
} from "./waterOperations";

const initialState = {
  isLoading: false,
  error: null,
  waterRecords: [],
  items: [],
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
         const { id, ...restParams } = action.payload.data;
        state.waterRecords.push({ ...restParams , _id:id});
       

        // ========== оновлення відсотків в календарі, при додаванні води ===========================
        const dayIndex = state.items.findIndex(
          (item) => item.date === action.payload.data.date
        );
        if (dayIndex !== -1) {
          state.items[dayIndex] = action.payload.data;
        }
        // ============================================
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
          (elem) => elem._id !== action.payload
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
          (record) => record._id === action.payload.data.id
        );
        
        if (index !== -1) {
          const { id, ...restParams} = action.payload.data
          state.waterRecords[index] = { ...restParams , _id:id};
        }
        // ========== оновлення відсотків в календарі, при оновленні води ================
        const dayIndex = state.items.findIndex(
          (item) => item.date === action.payload.data.date
        );
        if (dayIndex !== -1) {
          state.items[dayIndex] = action.payload.data;
        }
        // =====================================
      })

      .addCase(getAllWaterRecordsPerDay.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWaterRecordsPerDay.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllWaterRecordsPerDay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterRecords = action.payload.dailyRecords;
        console.log(state.waterRecords);
        
      })
      // =========================================
      .addCase(fetchWaterMonthInfo.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchWaterMonthInfo.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWaterMonthInfo.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const waterReducer = waterSlice.reducer;
