import express from 'express';
import routes from './routes.js';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 3333;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});