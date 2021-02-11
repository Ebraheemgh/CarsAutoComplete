const db = require("../database/connection");

function getuser(email, password) {
    const values = [email, password]
    return db
        .query(
            "select * from users where email=$1 and password=$2;", values
        )

}

function adduser(data) {
    const values = [data.email, data.firstName, data.lastName, data.password];
    return db.query(
        "INSERT INTO users(email, first_name, last_name,password) VALUES($1, $2, $3,$4)",
        values
    )
}


function getComments(car_id) {
    const value = [car_id];
    return db
        .query(
            "select users.first_name, users.last_name, comments.comment from users inner join comments on users.email = comments.email where comments.car_id=$1;",
            value
        )

}

function addComment(data) {
    const values = [data.email, data.car_id, data.comment];
    return db.query(
        "INSERT INTO comments(email, car_id, comment) VALUES($1, $2, $3)",
        values
    )
}

module.exports = { getuser, getComments, adduser, addComment };