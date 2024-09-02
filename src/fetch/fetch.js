import axios from "axios";

const API_URL = "https://team-project-b-watter-app.onrender.com";

export function setAuthHeader(token) {
  axios.defaults.headers.common.Authorization = token;
}

export async function registerFetch(data) {
  axios.defaults.baseURL = "/";
  const response = await axios.post("users/signup", data);
  return response;
}
export const sendForgotPasswordEmail = async (email) => {
  try {
    const response = await axios.post("users/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to send email");
  }
};
export const UpdatePassword = async (token, newPassword) => {
  const response = await axios.post("users/update-password", {
    token,
    newPassword,
  });

  return response;
};

// Функция для получения данных пользователя
export async function getUserInfo(token) {
  setAuthHeader(token);
  const response = await axios.get(`${API_URL}/user/info`);
  return response;
}

// Функция для обновления данных пользователя
export async function updateUserInfo(token, data) {
  setAuthHeader(token);
  const response = await axios.patch(`${API_URL}/user/updateInfo`, data);
  return response;
}

// Функция для обновления аватара пользователя
export async function updateUserPhoto(token, formData) {
  setAuthHeader(token);
  const response = await axios.patch(`${API_URL}/user/userPhoto`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}
