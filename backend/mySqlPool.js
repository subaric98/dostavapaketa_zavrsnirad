const mysql = require('mysql2/promise');

const dbConfig = {
  host: '49.13.3.253',
  user: '',
  password: '',
  database: 'dostavapaketa_zavrsnirad',
};

const pool = mysql.createPool(dbConfig);

module.exports = pool; 
