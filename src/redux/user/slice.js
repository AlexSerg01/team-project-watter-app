import { createSlice } from "@reduxjs/toolkit";
import { getUserData, patchUserPhoto } from "./operations";

const initialUserState = {
  name: "",
  email: "",
  photo: "",
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
        state.email = action.payload.email;
        state.gender = action.payload.gender || "female";
        state.waterRate = action.payload.waterRate;
      })
      .addCase(getUserData.rejected, handleRejected)
      .addCase(patchUserPhoto.pending, handlePending)
      .addCase(patchUserPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.photo = action.payload.photoUrl;
      });
  },
});

export const userReducer = userSlice.reducer;
