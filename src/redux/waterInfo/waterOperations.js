import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://team-project-b-watter-app.onrender.com";

export const fetchWaterInfo = createAsyncThunk(
  "water/fetchInfo",
  async (currentDate, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user.accessToken;
      let { year, month } = currentDate();
      month += 1;
      const response = await axios.get(`/water/${month}/${year}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
