const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = "postgres://haneencars:12345@localhost:5432/carsautocomplete";
const db = new pg.Pool({ connectionString });
//db.query("SELECT * FROM USERS").then((result) => console.log(result));
module.exports = db;