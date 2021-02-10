const db = require("../database/connection");

function viewCommentsHandler(request, response) {
    console.log("comment");

    let carId = "";
    carId = new URL(`http://${request.url}`).searchParams.get("carId");
    getComments(carId)
        .then((comments) => {
            if (comments.rows.length > 0) {
                //if exsist user
                response.writeHead(200, { "content-type": "application/json" });
                response.end(JSON.stringify(comments.rows));
            } else {
                //if not exist
                response.writeHead(501, { "content-type": "text/html" });
                response.end("<h1>Comments Not Found</h1>");
            }
        })
        .catch((error) => {
            response.writeHead(500, { "content-type": "text/html" });
            response.end(`<h1>Something went wrong </h1>`);
        });
}

function getComments(car_id) {
    return db
        .query(
            `select * from comments where car_id='${car_id}';`
        )

}
module.exports = viewCommentsHandler;