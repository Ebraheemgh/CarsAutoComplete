function getCars(body) {

    const suggestion = document.getElementById("suggestion");
    const output = document.getElementById("output");
    output.style.display = "none";
    suggestion.innerHTML = "";

    if (body == "") {
        return;
    }
    fetch(`http://localhost:3000/car?q=${body}`, {
            method: "GET"
        })
        .then(response => {
            if (!response.ok) throw new Error(response.status);

            return response.json();
        })
        // if we get a successful response
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const span = document.createElement("span");
                span.textContent = data[i].make + " " + data[i].model;
                span.addEventListener("click", event => {
                    document.getElementById("carImg").src = data[i].img_url;
                    document.getElementById("make").textContent = "Make= >" + data[i].make;
                    document.getElementById("model").textContent = "Model= >" + data[i].model;
                    document.getElementById("year").textContent = "Year= >" + data[i].year;
                    document.getElementById("horsepower").textContent = "HorsePower=> " + data[i].horsepower;
                    document.getElementById("price").textContent = "Price=> " + data[i].price + "$";
                    output.style.display = "flex";
                    suggestion.innerHTML = "";

                })
                suggestion.appendChild(span)
            }

        })
        .catch(error => {
            if (error.message === "404") {
                suggestion.innerHTML = "";
                const span = document.createElement("span");
                span.textContent = "Caar Not found";
                suggestion.appendChild(span)
            }
        });
}
let time = 500;
let timeOut;
document.querySelector("form").addEventListener("keyup", event => {
    const input = document.getElementById("carInput").value;
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        getCars(input);
    }, time);

})

document.getElementById("form").addEventListener("submit", event => {
    event.preventDefault();
})