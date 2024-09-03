import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "https://team-project-b-watter-app.onrender.com";


export const getNorma = createAsyncThunk("info", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/user/info");
        console.log(response.data.data.dailyWaterIntake);
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
        console.log(response.data);
      return response.data;
    } catch (error) {
        console.log(data);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);