import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "waterInfo",
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
});

export default slice.reducer;
