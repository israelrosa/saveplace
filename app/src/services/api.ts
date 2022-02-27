import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.19.0.1:3080',
});

export const cepApi = axios.create({
  baseURL: 'https://brasilapi.com.br/api/cep/v2',
});

export default api;
