const {Client} = require('cassandra-driver')
const client = new Client ({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1'})

const createKeyspace = `
CREATE KEYSPACE IF NOT EXISTS reviews_keyspace
WITH REPLICATION = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};
`;

const createTable = `
  CREATE TABLE IF NOT EXISTS reviews_keyspace.reviews (
    review_id bigint PRIMARY KEY,
    rating int,
    summary text,
    recommend boolean,
    response text,
    body text,
    date timestamp,
    reviewer_name text,
    helpfulness int,
    photos list <frozen<tuple<bigint, text>>>
  );
`;

client.connect()
.then(() => client.execute(createKeyspace))
.then(() => client.execute(createTable))
.then(() => console.log('Table created successfully'))
.catch((err) => console.log(err))

// this is fun

// out of sync

const pleasehelp = 2