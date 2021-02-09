const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = "postgres://ebraheemcars:123123@localhost:5432/learn_node_postgres";
const db = new pg.Pool({ connectionString });
//db.query("SELECT * FROM USERS").then((result) => console.log(result));
module.exports = db;