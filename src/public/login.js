var form = document.querySelector("form");
var email = document.getElementById("email");
var password = document.getElementById("password");
var error = document.getElementById("error");
let valid = true;


function checkPassword() {
    if (password.value === "") {
        error.textContent = "Please enter Password";
        password.classList.add("check");
        valid = false;
    } else {
        password.classList.remove("check");
        error.textContent = "";
    }
}

function checkEmail() {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value === "") {
        error.textContent = "Please enter email";
        email.classList.add("check");
        valid = false;
    } else if (!email.value.match(mailformat)) {
        error.textContent = "Please enter a valid email address";
        email.classList.add("check");
        valid = false;
    } else {
        email.classList.remove("check");
        checkPassword();
    }
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    error.textContent = "";
    checkEmail();
    if (valid) {
        console.log(valid);
        let apiurl = `/login?email=${email.value}&password=${password.value}`;
        fetch(apiurl)
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                localStorage.setItem('currentUser', email.value);
                window.location.href = '/main';
            })
            .catch((err) => {
                if (err.message === "404") {
                    error.textContent = "Invalid email or password!";

                } else {

                    alert("somthing went wrong")
                }
            });
    }


});