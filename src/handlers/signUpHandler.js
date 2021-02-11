const db = require("../database/connection");
const model = require("../database/model")

function signUpHandler(request, response) {
    let body = "";
    request.on('data', chunk => {
        body += chunk;
    })
    request.on('end', () => {
        body = JSON.parse(body);
        model.adduser(body).then(result => {
            response.writeHead(200, { "content-type": "application/json" });
            response.end(JSON.stringify(body));
        }).catch(error => {
            if (error.code === "23505") {
                response.writeHead(501, { "content-type": "text/html" });
                response.end(`you have an account in this email`);
            } else {
                response.writeHead(500, { "content-type": "text/html" });
                response.end(`${error}`);
            }
        })
    })

}



module.exports = signUpHandler;