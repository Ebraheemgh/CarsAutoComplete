const db = require("../database/connection");
const model = require("../database/model")

function loginHandler(request, response) {
    let email = "";
    let password = "";
    email = new URL(`http://${request.url}`).searchParams.get("email");
    password = new URL(`http://${request.url}`).searchParams.get("password");
    model.getuser(email, password)
        .then((user) => {
            if (user.rows.length > 0) {
                //if exsist user
                response.writeHead(200, { "content-type": "application/json" });
                response.end(JSON.stringify(user.rows));
            } else {
                //if not exist
                response.writeHead(404, { "content-type": "text/html" });
                response.end("<h1>Not Found</h1>");
            }
        })
        .catch((error) => {
            response.writeHead(500, { "content-type": "text/html" });
            response.end(`<h1>${error}</h1>`);
        });
}


module.exports = { loginHandler };