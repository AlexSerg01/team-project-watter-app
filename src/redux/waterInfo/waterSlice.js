// import { createSlice } from "@reduxjs/toolkit";
// import { fetchWaterInfo } from "./waterOperations";

// const slice = createSlice({
//   name: "waterInfo",
//   initialState: {
//     items: [],
//     loading: false,
//     error: false,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWaterInfo.pending, (state) => {
//         state.error = false;
//         state.loading = true;
//       })
//       .addCase(fetchWaterInfo.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchWaterInfo.rejected, (state) => {
//         state.loading = false;
//         state.error = true;
//       });
//   },
// });

// export default slice.reducer;
