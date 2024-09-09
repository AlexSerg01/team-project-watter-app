import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  registerUser,
  loginUser,
  forgotPassword,
  updatePassword,
  logoutUser,
} from "./operations";
import { updateDailyWaterIntake } from "../water/waterOperations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    forgotPassword: { isLoading: false, error: null },
    updatePassword: { isLoading: false, error: null },
    waterToday: { dailyWaterList: [] },
    waterRate: 2000,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      toast.info("You have been logged out.");
    },
    clearError(state) {
      state.error = null;
      state.forgotPassword.error = null;
      state.updatePassword.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        toast.success("Login successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateDailyWaterIntake.fulfilled, (state, action) => {
        state.user.dailyWaterIntake = action.payload.data.dailyWaterIntake;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        toast.success("Logout successful!");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
