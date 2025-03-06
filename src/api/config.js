import { Axios } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const axios = new Axios({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => status >= 200 && status < 400,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      new Error(error?.response?.data ? JSON.parse(error?.response?.data).message : error.message)
    );
  }
);

export const apiCall = async (url, { method = "GET", params = {}, body = {} }) => {
  const response = await axios.request({
    url,
    method,
    params,
    ...(method !== "GET" && { data: JSON.stringify(body) }),
  });

  return JSON.parse(response.data);
};
