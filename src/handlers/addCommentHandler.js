const db = require("../database/connection");
const model = require("../database/model")

function addCommentHandler(request, response) {
    let body = "";
    request.on('data', chunk => {
        body += chunk;
    })
    request.on('end', () => {
        body = JSON.parse(body);
        model.addComment(body).then(result => {
            response.writeHead(200, { "content-type": "application/json" });
            response.end(JSON.stringify(body));
        }).catch(error => {
            response.writeHead(500, { "content-type": "text/html" });
            response.end(`${error}`);
        })
    })

}



module.exports = { addCommentHandler };