// waterOperations.js
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
      const response = await axios.delete(`/water/${id}`);
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
  async ({ id, amount }, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/${id}`, {
        amount: amount,
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
