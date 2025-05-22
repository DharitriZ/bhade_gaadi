import axios from "axios";
import { store } from "../store/index";
import { logoutAction } from "../store/actions/auth";

const localURl = "http://localhost:3001";
export const baseURl = "https://car-rentals-3tel.onrender.com";

const API = axios.create({
  baseURL: `${baseURl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await store.dispatch(logoutAction());
    }
    return Promise.reject(error);
  }
);

export default API;

// http://192.168.1.51:3001/docs
