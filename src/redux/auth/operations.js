import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://team-project-b-watter-app.onrender.com"; // add URL!!!!

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      toast.success("Registration successful!");
      return response.data.data; // Припускаємо, що дані знаходяться у полі `data.data`
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      return response.data.data; // Припускаємо, що дані знаходяться у полі `data.data`
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
