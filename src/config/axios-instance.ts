import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    'x-api-key': import.meta.env.VITE_API_KEY as string,
  },
  timeout: 10000,
});

export default axiosInstance;
