import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDailyWaterIntake,
  fetchUpdateUserInfo,
  fetchUserInfo,
  fetchUserPhoto,
} from "../../fetch/fetch";

export const userInfo = createAsyncThunk("user/info", async (_, thunkApi) => {
  try {
    const response = await fetchUserInfo();
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const userPhoto = createAsyncThunk(
  "user/userPhoto",
  async (data, thunkApi) => {
    try {
      const response = await fetchUserPhoto(data);
      return response.data.photoUrl;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateInfo = createAsyncThunk(
  "user/updateInfo",
  async (data, thunkApi) => {
    try {
      console.log(data);
      const response = await fetchUpdateUserInfo(data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateUserWaterIntake = createAsyncThunk(
  "user/updateUserWaterIntake",
  async (data, thunkApi) => {
    try {
      const response = await fetchDailyWaterIntake(data);
      return response.data.dailyWaterIntake;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
