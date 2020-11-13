const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Conexão com o banco de dados
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'e3n1d7a9',
  database: 'controle_estoque_gl'
});

// Inicializando as rotas pelo Express
const app = express();

// Criando uma rota GET que retorna os dados da tabela veículos.
app.get('/veiculos', function (req, res) {
    // Conectando ao banco.
    connection.getConnection(function (err, connection) {
    
    // Executando a query MySQL (selecionar todos os dados da tabela veículos).
    connection.query('SELECT * FROM veiculos', function (error, results, fields) {
      // Caso ocorra algum erro, não irá executar corretamente.if (error) throw error;
      
      // Pegando a 'resposta' do servidor pra nossa requisição. Ou seja, aqui ele vai mandar nossos dados.
      res.send(results)
    });
  });
});

// Iniciando o servidor.
app.listen(3000);