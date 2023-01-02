import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_URL = 'https://pone-server-production.up.railway.app/api/';
export const API_URL_PHILL = 'https://server-pricing-production.up.railway.app/api';
export const local = 'http://192.168.100.10:3001/api';
export const instance = axios.create({
    baseURL: local,
});

// Request interceptor for API calls
instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// Response interceptor for API calls
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const {data} = await instance.post<{ token: string }>(`auth/refresh`);
            axios.defaults.headers.common['authorization'] = 'Bearer ' + data.token;
            return instance(originalRequest);
        }
        return Promise.reject(error);
    },
);
