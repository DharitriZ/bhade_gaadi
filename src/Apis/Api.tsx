import axios from "axios";

export const LoginApi = '/auth/login';
export const VerifyApi = '/auth/verify-login';
export const ResendApi = '/auth/resend-otp';

const baseUrl = 'http://192.168.1.9:3001/api';


const API = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})


API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

export default API;