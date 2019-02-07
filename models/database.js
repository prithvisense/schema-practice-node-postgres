// const pg = require('pg');
// // const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todos';

// var connectionString = {
//     user: "postgres",
//     host: "localhost",
//     database: "todos",
//     password: "password",
//     port: 5432,
//   };

// // const client = new pg.Client(connectionString);
// debugger
// // client.connect();
// const query = client.query(
//     'CREATE TABLE IF NOT EXISTS random_data(first_name character varying, last_name character varying, address character varying, status character varying)');

//     console.log('QUERY RUNNING');
    
// query.on('end', () => { client.end(); });