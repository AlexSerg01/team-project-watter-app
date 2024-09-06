import { createSlice } from "@reduxjs/toolkit";
import {
  updateInfo,
  updateUserWaterIntake,
  userInfo,
  userPhoto,
} from "./operations";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(userPhoto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userPhoto.fulfilled, (state, action) => {
        if (state.data) {
          state.data.photo = action.payload;
        }
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(userPhoto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload };
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserWaterIntake.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserWaterIntake.fulfilled, (state, action) => {
        if (state.data) {
          state.data.dailyWaterIntake = action.payload;
        }
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateUserWaterIntake.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
