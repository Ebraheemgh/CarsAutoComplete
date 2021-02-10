const db = require("../database/connection");

function viewCommentsHandler(request, response) {


    let carId = "";
    carId = new URL(`http://${request.url}`).searchParams.get("id");
    getComments(carId)
        .then((comments) => {

            if (comments.rows.length > 0) {
                //if exsist user
                response.writeHead(200, { "content-type": "application/json" });
                response.end(JSON.stringify(comments.rows));
            } else {
                //if not exist
                response.writeHead(404, { "content-type": "text/html" });
                response.end("<h1>Comments Not Found</h1>");
            }
        })
        .catch((error) => {
            response.writeHead(500, { "content-type": "text/html" });
            response.end(`<h1>${error} </h1>`);
        });
}

function getComments(car_id) {
    return db
        .query(
            `select users.first_name, users.last_name, comments.comment
            from users inner join comments on
            users.email = comments.email where comments.car_id='${car_id}';`
        )

}
module.exports = { viewCommentsHandler, getComments };