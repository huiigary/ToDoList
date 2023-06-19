require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  password: process.env.PSQL_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'perntodo',
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

module.exports = pool
