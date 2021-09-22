import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pepple.social/'
});

export default api;