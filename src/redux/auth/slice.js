// import { createSlice } from '@reduxjs/toolkit'
// import { toast } from 'react-toastify'

// import {
//   registerUser,
//   loginUser,
//   forgotPassword,
//   updatePassword,
// } from './operations'

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     status: 'idle', // idle, loading, succeeded, failed
//     error: null,
//     forgotPassword: { isloading: false, error: null },
//     updatePassword: { isloading: false, error: null },

//   },
//   reducers: {
//     logout(state) {
//       state.user = null
//       state.isAuthenticated = false
//       toast.info('You have been logged out.')
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.status = 'loading'
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload
//         state.isAuthenticated = true
//         state.status = 'succeeded'
//         toast.success('Login successful!')
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.payload
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.status = 'loading'
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.user = action.payload
//         state.isAuthenticated = true
//         state.status = 'succeeded'
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.payload
//       })
//       .addCase(forgotPassword.pending, (state) => {
//         state.status = 'loading'
//       })
//       .addCase(forgotPassword.fulfilled, (state) => {
//         state.status = 'succeeded'
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.payload
//       })
//       .addCase(updatePassword.pending, (state) => {
//         state.status = 'loading'
//       })
//       .addCase(updatePassword.fulfilled, (state) => {
//         state.status = 'succeeded'
//       })
//       .addCase(updatePassword.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.payload
//       })
//   },
// })

// export const { logout } = authSlice.actions
// export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  registerUser,
  loginUser,
  forgotPassword,
  updatePassword,
} from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    status: "idle", // idle, loading, succeeded, failed
    error: null,
    forgotPassword: { isLoading: false, error: null },
    updatePassword: { isLoading: false, error: null },
    waterToday: { dailyWaterList: [] }, // Додано waterToday
    waterRate: 2000, // Додано waterRate, приклад значення
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      toast.info("You have been logged out.");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "succeeded";
        toast.success("Login successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
