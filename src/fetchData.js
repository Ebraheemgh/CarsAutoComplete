const fetch = require("node-fetch");

function fetchCars() {

    return fetch(`https://private-anon-1471d3aef0-carsapi1.apiary-mock.com/cars`)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
}
module.exports = fetchCars;