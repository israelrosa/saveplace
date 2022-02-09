import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.19.0.1:3080',
});

export default api;
