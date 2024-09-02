import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:14000";

export const fetchWaterInfo = createAsyncThunk(
  "water/fetchInfo",
  async (currentDate, thunkAPI) => {
    try {
      let { year, month } = currentDate();
      month += 1;
      const response = await axios.get(`/water/${month}/${year}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
