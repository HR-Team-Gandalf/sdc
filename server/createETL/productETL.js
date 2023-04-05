const path = require('path')
const db = require('../database')

async function buildTables() {
  db.query('DROP TABLE IF EXISTS ;')
  .then(() => {
    db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name VARCHAR (30) NOT NULL,
      slogan VARCHAR (256) NOT NULL,
      description VARCHAR (512) NOT NULL,
      category VARCHAR (20) NOT NULL,
      default_price VARCHAR (10) NOT NULL
    )`)
  })
  .then(() => db.query(`
  COPY products(id, name, slogan, description, category, default_price)
  FROM '${path.join(__dirname, '../data/product.csv')}'
  DELIMITER ','
  CSV HEADER
  `))
}