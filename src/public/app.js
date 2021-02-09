//const fetchCarImg = require("../handlers/imageGoogleSearch");
const carImg = document.getElementById("carImg");
const make = document.getElementById("make");
const year = document.getElementById("year");
const model = document.getElementById("model");
const horsepower = document.getElementById("horsepower");
const price = document.getElementById("price");
const a_youtube = document.getElementById("a");

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
                    carImg.src = "https://media4.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif";

                    // if (!UrlExists(data[i].img_url)) {
                    fetchDefaultImage(data[i]);
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

                    a_youtube.href = `https://www.youtube.com/results?search_query=${data[i].make}+${data[i].model}`;
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

function fetchDefaultImage(data) {

    var img = new Image()
    img.onload = function() {
        if (this.height === 80 && this.width === 80) {
            const localStorageUrl = getFromLocalStorage(data);
            if (localStorageUrl.length === 0) {
                fetch(`/google?search=${data.make}+${data.model}`)
                    .then(response => {

                        if (!response.ok) throw new Error(response.status);
                        return response.json();
                    })
                    .then(src => {
                        const obj = { id: data.id, imageURL: src };

                        if (!(localStorage.getItem("carImages"))) {
                            let imagesFromLocalStorage = [];
                            imagesFromLocalStorage.push(obj);
                            localStorage.setItem("carImages", JSON.stringify(imagesFromLocalStorage));

                        } else {
                            let imagesFromLocalStorage = JSON.parse(localStorage.getItem("carImages") || "[]");
                            imagesFromLocalStorage.push(obj);
                            localStorage.setItem("carImages", JSON.stringify(imagesFromLocalStorage));
                        }

                        carImg.src = src;
                    }).catch(error => {
                        console.error(error);
                    })
            } else {
                carImg.src = getFromLocalStorage(data);


            }

        } else {
            carImg.src = data.img_url;
        }
    }
    img.src = data.img_url;


}

function getFromLocalStorage(car) {
    if (!(localStorage.getItem("carImages"))) {
        return "";
    }
    let imagesFromLocalStorage = JSON.parse(localStorage.getItem("carImages") || "[]");;

    for (let i = 0; i < imagesFromLocalStorage.length; i++) {

        if (imagesFromLocalStorage[i].id === car.id) {
            return imagesFromLocalStorage[i].imageURL;
        }
    }
    return "";

}