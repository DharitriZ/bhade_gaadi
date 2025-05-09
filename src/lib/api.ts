import axios from "axios";
import { store } from '../store/index';
import { logoutAction } from "../store/actions/auth";

export const ipURL = "http://192.168.1.34:3001";
const localURl = "http://192.168.1.34:3001/api";
const baseURl = "https://d2c2-43-250-157-147.ngrok-free.app/api";

const API = axios.create({
  baseURL: localURl,
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
  },
);


API.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      await store.dispatch(logoutAction());
    }
    return Promise.reject(error);
  }
);

export default API;

// http://192.168.1.51:3001/docs
