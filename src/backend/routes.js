import express from 'express';
import VeiculosController from './controllers/VeiculosController.js';

const routes = express();
const veiculosController = new VeiculosController();

// Listar veículos
routes.get("/", veiculosController.index);

export default routes;