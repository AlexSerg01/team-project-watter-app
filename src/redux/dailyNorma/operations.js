import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://team-project-b-watter-app.onrender.com";

export const getNorma = createAsyncThunk("user/info", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.user.accessToken;

    const response = await axios.get(`/user/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.dailyWaterIntake;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateDailyWaterIntake = createAsyncThunk(
  "user/newDailyWaterIntake",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user.accessToken;
      const response = await axios.patch("/user/newDailyWaterIntake", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
