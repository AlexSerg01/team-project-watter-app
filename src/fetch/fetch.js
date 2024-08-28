import axios from "axios";

export function setAuthHeader(token) {
  axios.defaults.headers.common.Authorization = token;
}

export async function registerFetch(data) {
  axios.defaults.baseURL = "/";
  const response = await axios.post("users/signup", data);
  return response;
}
