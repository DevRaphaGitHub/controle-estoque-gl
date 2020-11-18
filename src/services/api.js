import axios from 'axios';

const api = axios.create({
  baseURL: "https://controle-estoque-gl.herokuapp.com/",
});

export default api;