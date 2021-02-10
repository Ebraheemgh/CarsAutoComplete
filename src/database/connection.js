const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();
let connectionString = process.env.DATABASE_URL_DEV;
if (process.env.NODE_ENV === 'production') {
    connectionString = process.env.DATABASE_URL;
}
const db = new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } });
//db.query("SELECT * FROM USERS").then((result) => console.log(result));
module.exports = db;