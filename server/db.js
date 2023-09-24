const Pool = require("pg").Pool

const pool = new Pool({
  user: "postgres",
  password: "bearbear",
  host: "localhost",
  port: 5000,
  database: "perntodo",
})

module.exports = pool
