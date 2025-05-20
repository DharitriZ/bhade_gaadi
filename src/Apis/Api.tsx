import axios from "axios";

export const LoginApi = '/auth/login';
export const VerifyApi = '/auth/verify-login';
export const ResendApi = '/auth/resend-otp';
export const AllDocApi = '/documents';
export const AddCarApi = '/car-types';
// export const AllCarApi = '/car-types';
// export const DocUpdateApi = `/docum`;

const baseUrl = 'https://b255-2401-4900-1f3f-ae2d-8db3-f547-c1ef-f687.ngrok-free.app/api';


const API = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})


API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // console.log(token);
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