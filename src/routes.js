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
app.get('/veiculos', function(req, res) {
    connection.getConnection(function(err, connection) {
        connection.query('SELECT * FROM veiculos', function(error, results, fields) {
            res.send(results)
        });
    });
});

// Iniciando o servidor.
app.listen(3333);