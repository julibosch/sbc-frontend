import axios from 'axios';

const socioAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  maxContentLength: 50 * 1024 * 1024 // 50MB
});

export default socioAxios;