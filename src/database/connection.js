const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

//const connectionString = "postgres://lnyzeroyqefift:882d0f939a38b884afc15a77c136d76195726ed4c19e027abe8002aaabe045bd@ec2-35-171-57-132.compute-1.amazonaws.com:5432/d3o3nlkip83tk";
//const db = new pg.Pool({ connectionString });
var client = new pg.Client({
    user: "lnyzeroyqefift",
    password: "882d0f939a38b884afc15a77c136d76195726ed4c19e027abe8002aaabe045bd",
    database: "d3o3nlkip83tk",
    port: 5432,
    host: "ec2-35-171-57-132.compute-1.amazonaws.com",
    ssl: true
});
client.connect();


//db.query("SELECT * FROM USERS").then((result) => console.log(result));
module.exports = client;