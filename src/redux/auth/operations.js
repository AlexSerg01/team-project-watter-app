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
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.accessToken}`;
      return response.data.data;
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
      const token = response.data.data.accessToken;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Додавання forgotPassword та updatePassword операцій
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/password/forgot`,
        body
      );
      toast.success("Password reset email sent!");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to send password reset email. Please try again.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ token, ...body }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/password/reset/${token}`,
        body
      );
      toast.success("Password updated successfully!");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update password. Please try again.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/logout`);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      toast.info("You have been logged out.");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Logout failed. Please try again.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
