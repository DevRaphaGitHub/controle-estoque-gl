import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
      host: '10.6.2.15',
      user: 'root',
      password: 'e3n1d7a9',
      database: 'controle_estoque_gl'
    },
    useNullAsDefault: true,
});

export default connection;