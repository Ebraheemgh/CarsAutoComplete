const fetchCar = require("../fetchData");

function carHandler(request, response) {
  let body = "";

  body = new URL(`http://${request.url}`).searchParams.get("q");

  let carsList = [];
  fetchCar()
    .then((data) => {
      carsList = [...data];

      let dataToReturn = [];
      for (let i = 0; i < carsList.length; i++) {
        let temp = carsList[i].make + " " + carsList[i].model;
        if (temp.includes(body)) {
          dataToReturn.push(carsList[i]);
        }
      }

      if (dataToReturn.length > 0) {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify(dataToReturn));
      } else {
        response.writeHead(404, { "content-type": "application/json" });
        response.end(JSON.stringify(dataToReturn));
      }
    })
    .catch((error) => {
      response.writeHead(500, { "content-type": "text/html" });
      response.end("<h1>something went wrong</h1>");
      console.error(error);
    });
}

module.exports = carHandler;
