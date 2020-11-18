import axios from 'axios';

const api = axios.create({
  baseURL: "http://10.6.2.15:3333/",
});

export default api;