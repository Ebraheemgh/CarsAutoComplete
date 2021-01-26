function fetchCars() {
    let carsList = [];

    fetch(`https://private-anon-1471d3aef0-carsapi1.apiary-mock.com/cars`)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            console.log(response)
            return response.json();
        })
        // if we get a successful response
        .then(data => {
            carsList = data;

        })
        .catch(error => {
            console.log(error);

        });
}
module.exports = fetchCars;