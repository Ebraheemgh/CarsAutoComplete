const fetchCar = require("./src/carHandlers");

function carHandlers(request, response) {
    fetchCar();
    let body = request.body;

    dataToReturn = [];
    for (let i = 0; i < carsList.length; i++) {
        if (carsList[i].make.includes(body) || carsList[i].model.includes(body)) {
            dataToReturn.push(carsList[i]);
        }
    }

    if (dataToReturn.length > 0) {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify(carsList));
    } else {
        response.writeHead(404, { "content-type": "application/json" });
        response.end(JSON.stringify(carsList));

    }
}

module.exports = carHandlers;