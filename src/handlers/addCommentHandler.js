const db = require("../database/connection");

function addCommentHandler(request, response) {
    let body = "";
    request.on('data', chunk => {
        body += chunk;
    })
    request.on('end', () => {
        body = JSON.parse(body);
        addComment(body).then(result => {
            response.writeHead(200, { "content-type": "application/json" });
            response.end(JSON.stringify(body));
        }).catch(error => {
            response.writeHead(500, { "content-type": "text/html" });
            response.end(`${error}`);
        })
    })

}

function addComment(data) {
    const values = [data.email, data.car_id, data.comment];
    return db.query(
        "INSERT INTO comments(email, car_id, comment) VALUES($1, $2, $3)",
        values
    )
}

module.exports = addCommentHandler;