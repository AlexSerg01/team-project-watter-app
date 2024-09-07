import axios from "axios";

axios.defaults.baseURL = "https://team-project-b-watter-app.onrender.com";

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
