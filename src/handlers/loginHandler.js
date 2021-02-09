const db = require("../database/connection");

function loginHandler(request, response) {
  let email = "";
  let password = "";
  email = new URL(`http://${request.url}`).searchParams.get("email");
  password = new URL(`http://${request.url}`).searchParams.get("password");
  getuser(email, password)
    .then((user) => {
      if (user.length > 0) {
        //if exsist user
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify(user));
      } else {
        //if not exist
        response.writeHead(404, { "content-type": "text/html" });
        response.end("<h1>Not Found</h1>");
      }
    })
    .catch((error) => {
      console.log(error);
      response.writeHead(500, { "content-type": "text/html" });
      response.end(`<h1>Something went wrong </h1>`);
    });
}
function getuser(email, password) {
  return db
    .query(
      `select * from users where email=${email} and password=${password};
      `
    )
    .then((result) => result.rows);
}
module.exports = loginHandler;
