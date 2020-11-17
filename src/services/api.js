import axios from 'axios';

const api = axios.create({
  baseURL: "https://controle-estoque-gl.herokuapp.com:3333",
});

export default api;