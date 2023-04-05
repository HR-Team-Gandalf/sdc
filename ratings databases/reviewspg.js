// const { Pool } = require('pg')

// const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'Citifield5',
//   database: 'reviews'
// })

// pool.query(`DROP TABLE IF EXISTS reviews`)
// pool.query(`DROP TABLE IF EXISTS photos`)

// pool.query(
//   `CREATE TABLE IF NOT EXISTS reviewsdb (
//     review_id SERIAL PRIMARY KEY,
//     product_id VARCHAR(255) NOT NULL,
//     rating INTEGER NOT NULL,
//     summary TEXT NOT NULL,
//     recommend BOOLEAN NOT NULL,
//     response TEXT,
//     body TEXT NOT NULL,
//     date TIMESTAMP WITH TIME ZONE NOT NULL,
//     reviewer_name VARCHAR(255) NOT NULL,
//     helpfulness INTEGER NOT NULL,
//     photo_id INTEGER
//   )`
// )
// .then(() => console.log('reviews table created successfully'))
// .catch(err => console.error('Error creating reviews table', err))

// pool.query(
//   `CREATE TABLE IF NOT EXISTS photos (
//     id SERIAL PRIMARY KEY REFERENCES reviews(photo_id),
//     url TEXT
//   )`
// )
// .then(() => console.log('photos table created successfully'))
// .catch(err => console.error('Error creating photos table', err))
// .finally(() => pool.end())

// // review transform function
// const transformReview = function(review) {
//   const {
//     review_id,
//     rating,
//     summary,
//     recommend,
//     response,
//     body,
//     date,
//     reviewer_name,
//     helpfulness,
//     photos // refactor
//   } = review
//   return {
//     review_id,
//     product_id: 37311,
//     rating,
//     summary,
//     recommend,
//     response,
//     body,
//     date,
//     reviewer_name,
//     helpfulness,
//     photo_id: photos[0] ? photos[0].id : null
//   }
//   // photo transform function
//   function transformPhoto(photo) {
//     const {id, url} = photo
//     return {id, url}
//   }

//   // Insert review
//  async function insertReview(review) {
//   const reviewRow = transformReview(review)
//   const photosRows = review.photos.map(transformPhoto)
//   const client = await pool.connect()
//   try {
//     await client.query('BEGIN')
//     const insertReviewQuery = {
//       text: `
//         INSERT INTO reviewsdb (review_id, product_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photo_id)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
//       `,
//       values: Object.values(reviewRow)
//     }
//     await client.query(insertReviewQuery)
//     if (photosRows.length > 0) {
//       const insertPhotosQuery = {
//         text: `
//           INSERT INTO photos (id, url)
//           VALUES ${photosRows.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', ')}
//         `,
//         values: photosRows.flatMap(row => [row.id, row.url])
//       }
//       await client.query(insertPhotosQuery)
//     }
//     await client.query('COMMIT')
//   } catch (err) {
//     await client.query('ROLLBACK')
//     throw err
//   } finally {
//     client.release()
//   }
// };

const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Citifield5',
  database: 'reviews'
})

// Define a function to transform an incoming review object into a row for the reviews table
function transformReview(review) {
  const {
    review_id,
    rating,
    summary,
    recommend,
    response,
    body,
    date,
    reviewer_name,
    helpfulness,
    photos
  } = review
  return {
    review_id,
    product_id: 'EXAMPLE_PRODUCT_ID', // Replace with the actual product ID
    rating,
    summary,
    recommend,
    response,
    body,
    date,
    reviewer_name,
    helpfulness,
    photo_id: photos[0] ? photos[0].id : null
  }
}

// Define a function to transform an incoming photo object into a row for the photos table
function transformPhoto(photo) {
  const { id, url } = photo
  return { id, url }
}

// Define a function to insert a review into the reviews table and its associated photos into the photos table
async function insertReview(review) {
  const reviewRow = transformReview(review)
  const photosRows = review.photos.map(transformPhoto)
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const insertReviewQuery = {
      text: `
        INSERT INTO reviewsdb (review_id, product_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photo_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `,
      values: Object.values(reviewRow)
    }
    await client.query(insertReviewQuery)
    if (photosRows.length > 0) {
      const insertPhotosQuery = {
        text: `
          INSERT INTO photos (id, url)
          VALUES ${photosRows.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', ')}
        `,
        values: photosRows.flatMap(row => [row.id, row.url])
      }
      await client.query(insertPhotosQuery)
    }
    await client.query('COMMIT')
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

// Example usage
const incomingReview = {
  "review_id": 1279420,
  "rating": 3,
  "summary": "jsd;lfjls;kdjf",
  "recommend": true,
  "response": null,
  "body": "dfsldfja;sldfj",
  "date": "2023-03-31T00:00:00.000Z",
  "reviewer_name": "asdfs",
  "helpfulness": 3,
  "photos": [
    {
      "id": 2458428,
      "url": "http://res.cloudinary.com/dsziylmmb/image/upload/v1680280088/Denali_zektli.webp"
    }
  ]
}
insertReview(incomingReview)
  .then(() => console.log('Review inserted successfully'))
  .catch(err => console.error('Error inserting review', err))
  .finally(() => pool.end())
