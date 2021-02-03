//const fetchCarImg = require("../handlers/imageGoogleSearch");

function getCars(body) {
    body = body.toLowerCase();
    body = body.trim();
    const suggestion = document.getElementById("suggestion");
    const output = document.getElementById("output");
    output.style.display = "none";
    suggestion.innerHTML = "";

    if (body == "") {
        return;
    }

    let apiurl = `/car?q=${body}`;

    fetch(apiurl)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);

            return response.json();
        })
        // if we get a successful response
        .then((data) => {
            for (let i = 0; i < data.length; i++) {

                const listItem = document.createElement("span");
                const listItemImg = document.createElement("img");

                listItemImg.src = data[i].img_url;
                listItem.appendChild(listItemImg);
                const t = document.createTextNode(data[i].make + " " + data[i].model);
                listItem.appendChild(t);

                listItem.addEventListener("click", (event) => {
                    if (!UrlExists(data[i].img_url)) {
                        carImg.src = "https://media4.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif";
                        fetch(`/google?search=${data[i].make}+${data[i].model}`)
                            .then(response => {
                                if (!response.ok) throw new Error(response.status);
                                return response.json();
                            })
                            .then(src => {
                                carImg.src = src;
                                console.log("done")
                            }).catch(error => {
                                console.log(error);
                            })
                    } else {
                        carImg.src = data[i].img_url;

                    }
                    make.textContent =
                        "Make => " + data[i].make;
                    model.textContent =
                        "Model =>" + data[i].model;
                    year.textContent =
                        "Year => " + data[i].year;
                    horsepower.textContent =
                        "HorsePower => " + data[i].horsepower;
                    price.textContent =
                        "Price => " + data[i].price + "$";
                    output.style.display = "flex";
                    suggestion.innerHTML = "";
                });
                suggestion.appendChild(listItem);
            }
        })
        .catch((error) => {
            if (error.message === "404") {
                suggestion.innerHTML = "";
                const span = document.createElement("span");
                span.textContent = "Car Not found";
                suggestion.appendChild(span);
            } else {

                alert("somthing went wrong")
            }
        });
}
let time = 500;
let timeOut;
document.getElementById("carInput").addEventListener("keyup", (event) => {
    const input = document.getElementById("carInput").value;
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        getCars(input);
    }, time);
});

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
});