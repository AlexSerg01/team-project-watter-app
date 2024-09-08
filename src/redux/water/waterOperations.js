import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://team-project-b-watter-app.onrender.com";

export const getAllWaterRecordsPerDay = createAsyncThunk(
  "water/getAllWaterRecordsPerDay",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/water");
      return response.data.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const addWaterRecord = createAsyncThunk(
  "water/addWaterRecord",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/water", {
        amount: data.amount,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const deleteWaterRecord = createAsyncThunk(
  "water/deleteWaterRecord",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/water/${id}`);
      return id;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const updateWaterRecord = createAsyncThunk(
  "water/updateWaterRecord",
  async ({ id, amount, time }, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/${id}`, {
        amount: amount,
        time: time
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const fetchWaterMonthInfo = createAsyncThunk(
  "water/fetchMonthInfo",
  async (currentDate, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user.accessToken;
      console.log(token)
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
