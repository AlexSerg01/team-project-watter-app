// waterOperations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://team-project-b-watter-app.onrender.com";

export const getAllWaterRecordsPerDay = createAsyncThunk(
  "water/getAllWaterRecordsPerDay",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user.accessToken;

      if (!token) {
        return thunkAPI.rejectWithValue("Token not found");
      }

      const response = await axios.get("/water", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(response.data.data);

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
      const state = thunkAPI.getState();
      const token = state.auth.user.accessToken;

      if (!token) {
        return thunkAPI.rejectWithValue("Token not found");
      }

      const response = await axios.post(
        "/water",
        {
          amount: data.amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data.data);

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
      const state = thunkAPI.getState();
      const token = state.auth.user.accessToken;

      if (!token) {
        return thunkAPI.rejectWithValue("Token not found");
      }

      const response = await axios.delete(`/water/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(state.water.waterRecords.length);

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
      console.log(id);
      const state = thunkAPI.getState();
      const token = state.auth.user.accessToken;

      if (!token) {
        return thunkAPI.rejectWithValue("Token not found");
      }

      const response = await axios.patch(
        `/water/${id}`,
        {
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

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
