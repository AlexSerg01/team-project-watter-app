import { createSlice } from "@reduxjs/toolkit";
import {
  getUserData,
  patchUserInfo,
  patchUserPhoto,
  patchDailyWater,
} from "./operations";

const initialUserState = {
  data: null,
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, handlePending)
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUserData.rejected, handleRejected)

      .addCase(patchUserPhoto.pending, handlePending)
      .addCase(patchUserPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.data.photo = action.payload.photoUrl;
      })
      .addCase(patchUserPhoto.rejected, handleRejected)

      .addCase(patchUserInfo.pending, handlePending)
      .addCase(patchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(patchUserInfo.rejected, handleRejected)

      .addCase(patchDailyWater.pending, handlePending)
      .addCase(patchDailyWater.fulfilled, (state, action) => {
        state.loading = false;
        state.data.dailyWaterIntake = action.payload.dailyWaterIntake;
      })
      .addCase(patchDailyWater.rejected, handleRejected);
  },
});

export const userReducer = userSlice.reducer;
