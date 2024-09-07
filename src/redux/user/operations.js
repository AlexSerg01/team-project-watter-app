import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/users/info");
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
      const response = await axios.patch("/user/userPhoto");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
