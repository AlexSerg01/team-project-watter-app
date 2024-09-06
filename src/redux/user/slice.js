import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "./operations";

const initialUserState = {
  gender: "",
  waterRate: null,
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
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
        state.gender = action.payload.gender || "";
        state.waterRate = action.payload.waterRate;
      })
      .addCase(fetchUserData.rejected, handleRejected);
  },
});

export const userReducer = userSlice.reducer;
