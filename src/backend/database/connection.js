import knex from 'knex';

const connection = knex({
  client: 'mysql',
  connection: {
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b1990d5a226459',
    password: '25d2940f',
    database: 'heroku_16e5bf51f1e35b2'
  },
})

export default connection;

// import knex from 'knex';
// import { fileURLToPath } from 'url';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const connection = knex({
//   client: 'sqlite3',
//   connection: {
//     __filename: path.resolve(__dirname, 'database.sqlite')
//   },
//   useNullAsDefault: true
// });

// export default connection;