import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/user/info");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const patchUserPhoto = createAsyncThunk(
  "user/patchUserPhoto",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch("/user/userPhoto", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const patchUserInfo = createAsyncThunk(
  "user/patchUserInfo",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch("/user/updateInfo", data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const patchDailyWater = createAsyncThunk(
  "user/patchDailyWater",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch("/user/newDailyWaterIntake", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
