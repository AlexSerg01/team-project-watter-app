import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "https://team-project-b-watter-app.onrender.com";


export const getNorma = createAsyncThunk("info", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/user/info");
        return response.data.data.dailyWaterIntake;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


export const updateDailyWaterIntake = createAsyncThunk(
  'user/newDailyWaterIntake',
  async (data, thunkAPI) => {

    try {
        const response = await axios.patch('/user/newDailyWaterIntake', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);