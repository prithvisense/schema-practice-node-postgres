var options = {
    promiseLib: promise,
    query(e) {
       monitor.query(e);
   },
   error(err, e) {
       monitor.error(err, e);
   }
};

//importing npm librries
var pgp = require('pg-promise')(options);
var fs = require('fs');
var copyFrom = require('pg-copy-streams').from;
const parse = require('csv-parser');
var pg = require('pg');
var promise = require('bluebird');
const monitor = require('pg-monitor');
console.log('processing');
const { Client } = require('pg')

//setting up the database
var connectionString = {
    user: "postgres",
    host: "localhost",
    database: "todos",
    password: "password",
    port: 5432,
  };


//connecting the database
const client = new Client(connectionString)
client.connect()

//fetching data from the csv to database
var storeKeys;
var stores = [];
var csvData = [];
fs.createReadStream('storemaster.csv')
    .pipe(parse({ delimiter: ',' }))
    .on('data', function (csvrow) {
        // console.log(csvrow);
        //do something with csvrow
        stores.push(csvrow);
        //var colName = Object.keys(csvrow);
        // console.log(Object.keys(stores));
        
        storeKeys = Object.keys(csvrow);
        // console.log(storeKeys);
        
    })
    .on('end', function () {
        //console.log(storeKeys);
        
        //do something wiht csvData
        // console.log(stores);
        var dbData = storeKeys.join(' character varying,')
        // console.log(storeKeys.join('character varying' ));
        
        // console.log(  'CREATE TABLE IF NOT EXISTS random_data('+ dbData +')');
     
        //creating the table in the database
        const query = client.query(
            'CREATE TABLE IF NOT EXISTS random_data('+ dbData +' character varying)');

        // var stream = client.query(copyFrom(`COPY ${storemaster.csv} FROM CSV HEADER STDIN`))
        // var fileStream = fs.createReadStream(storemaster.csv)

        // fileStream.on('error', (error) => {
        //     console.log(`Error in reading file: ${error}`)
        // })
        // stream.on('error', (error) => {
        //     console.log(`Error in copy command: ${error}`)
        // })
        // stream.on('end', () => {
        //     console.log(`Completed loading data into ${storemaster.csv}`)
        //     client.end()
        // })
        // fileStream.pipe(stream);




            pg.connect(function(err, client, done) {
                var stream = client.query(copyFrom('COPY storemaster FROM STDIN'));
                var fileStream = fs.createReadStream('storemaster.csv')
                fileStream.on('error', done);
                fileStream.pipe(stream).on('finish', done).on('error', done);
              });  
            
            
        //     client.none(pgp.helpers.insert(stores, new pgp.helpers.ColumnSet(['storeName', 'storeId', 'customerAccount', 'channel', 'retailClass', 'dealerClass', 'stateOrProvince', 'city', 'franchiseeName', 'region', 'kwiStoreId', 'subTerritory', 'active', 'RSM', 'KAM', 'TM', 'salesDirector'], {table: 'storemaster'}))).then(function () {
        //         // Success callback
        //     }).catch(function (err) {
        //         // Fail Callback
        //     });
        
        
        //     // console.log('QUERY RUNNING');
            
        // // query.on('end', () => { client.end(); });
        





    });



// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//     console.log(err ? err.stack : res.rows[0].message) // Hello World!
//     client.end()
// })
// console.log(colName);

