import axios from 'axios';

const api = axios.create({
	baseURL: 'http://52.79.202.229:8080',
});

export default api;
