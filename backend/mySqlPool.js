const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'toor',
  database: 'dostavapaketa_zavrsnirad',
};

const pool = mysql.createPool(dbConfig);

module.exports = pool; 
