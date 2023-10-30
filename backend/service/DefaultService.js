'use strict';

const pool = require('../mySqlPool'); // Replace with the actual path to your MySQL pool setup

/**
 * Get all deliveries
 *
 * returns List
 **/
exports.dostavaGET = function() {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows, fields] = await pool.query('SELECT * FROM dostava');
      resolve(rows);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}


/**
 * Delete a delivery by ID
 *
 * id Integer The ID of the delivery to delete
 * no response value expected for this operation
 **/
exports.dostavaIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    const query = `
      DELETE FROM dostava
      WHERE sifra = ?;
    `;

    pool.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.affectedRows > 0) {
          resolve(results);
        } else {
          reject({ message: "Delivery not found" });
        }
      }
    });
  });
};


/**
 * Get a delivery by ID
 *
 * id Integer The ID of the delivery to retrieve
 * returns Dostava
 **/
exports.dostavaIdGET = function(sifra) {
  return new Promise(async function(resolve, reject) {
    const query = `
      SELECT * FROM dostava
      WHERE sifra = ?;
    `;

    try {
      const [rows] = await pool.query(query, [sifra]);
        resolve(rows);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};


/**
 * Update a delivery by ID
 *
 * body Dostava Updated delivery details (optional)
 * id Integer The ID of the delivery to update
 * returns Dostava
 **/
exports.dostavaIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    const query = `
      UPDATE dostava
      SET datum_dostave = ?,
          adresa_dostave = ?,
          status_paketa = ?,
          vozilo = ?,
          dostavljac = ?,
          broj_paketa = ?
      WHERE sifra = ?;
    `;

    const {
      datum_dostave,
      adresa_dostave,
      status_paketa,
      vozilo,
      dostavljac,
      broj_paketa,
    } = body;

    pool.query(
      query,
      [datum_dostave, adresa_dostave, status_paketa, vozilo, dostavljac, broj_paketa, id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.affectedRows > 0) {
            resolve(results);
          } else {
            reject({ message: 'Delivery not found' }); 
          }
        }
      }
    );
  });
};


/**
 * Create a new delivery
 *
 * body Dostava Delivery details (optional)
 * returns Dostava
 **/
exports.dostavaPOST = function (body) {
  return new Promise(async function (resolve, reject) {
    const {
      datum_dostave,
      adresa_dostave,
      status_paketa,
      vozilo,
      dostavljac,
      broj_paketa,
    } = body;

    const insertQuery = `INSERT INTO dostava (datum_dostave, adresa_dostave, status_paketa, vozilo, dostavljac, broj_paketa) VALUES (?, ?, ?, ?, ?, ?)`;

    const x = await pool.query(
      insertQuery,
      [datum_dostave, adresa_dostave, status_paketa, vozilo, dostavljac, broj_paketa],
      (err, results) => {
        if (err) {
          console.error('Error creating delivery:', err);
          reject(err);
        } else {
          resolve(results)
        }
      }
    );
  });
};

