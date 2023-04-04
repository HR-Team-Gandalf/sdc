const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Citifield5',
  database: 'reviews'
})

pool.query(`DROP TABLE IF EXISTS reviews`)

pool.query(
  `CREATE TABLE IF NOT EXISTS reviewsdb (
    review_id SERIAL PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL,
    summary TEXT NOT NULL,
    recommend BOOLEAN NOT NULL,
    response TEXT,
    body TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    reviewer_name VARCHAR(255) NOT NULL,
    helpfulness INTEGER NOT NULL,
    photo_id INTEGER
  )`
)
.then(() => console.log('reviews table created successfully'))
.catch(err => console.error('Error creating reviews table', err))

pool.query(
  `CREATE TABLE IF NOT EXISTS photos (
    id SERIAL PRIMARY KEY REFERENCES reviews(photo_id),
    url TEXT
  )`
)
.then(() => console.log('photos table created successfully'))
.catch(err => console.error('Error creating photos table', err))
.finally(() => pool.end())