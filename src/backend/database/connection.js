import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
      host: 'us-cdbr-east-02.cleardb.com',
      user: 'b1de9de9fe8c15',
      password: '249a23fa4ce1b36',
      database: 'heroku_ccf3d9670930e6b'
    },
    useNullAsDefault: true,
});

export default connection;