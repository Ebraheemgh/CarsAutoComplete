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
        if (
          carsList[i].make.includes(body) ||
          carsList[i].model.includes(body)
        ) {
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
    .catch((error) => console.error(error));
}

module.exports = carHandler;
