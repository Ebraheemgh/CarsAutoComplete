const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const confirmPassword = document.getElementById("confirmPassword");
const errorOutput = document.getElementById("errorOutput");
const SubmitedOutput = document.getElementById("SubmitedOutput");

form.addEventListener('submit', event => {
    event.preventDefault();
    errorOutput.innerHTML = "";
    SubmitedOutput.innerHTML = "";
    let valid = true;

    if (emailValidation(email.value)) {
        email.classList = "validInput";
    } else {
        let error = document.createElement("label");
        error.textContent = "* Pleas Enter A valid Email.";
        email.classList = "invalidInput";
        errorOutput.appendChild(error);
        valid = false;
    }


    if (nameValidation(firstName.value)) {
        firstName.classList = "validInput";
    } else {
        firstName.classList = "invalidInput";
        let error1 = document.createElement("label");
        error1.textContent = "* First Name must be at least 3 character and not contain numbers or symbols.";
        errorOutput.appendChild(error1);
        valid = false;

    }



    lastName.addEventListener('blur', event => {
        errorOutput.innerHTML = "";
        if (nameValidation(firstName.value)) {
            lastName.classList = "validInput";
        } else {
            lastName.classList = "invalidInput";
            let error1 = document.createElement("label");
            error1.textContent = "* last Name must be at least 3 character and not contain numbers or symbols.";
            errorOutput.appendChild(error1);
            valid = false;

        }
    })




    if (passwordValidation(password.value)) {
        password.classList = "validInput";

        if (password.value === confirmPassword.value) {
            confirmPassword.classList = "validInput";
        } else {
            confirmPassword.classList = "invalidInput";
            let error = document.createElement("label");
            error.textContent = "* Password must match.";
            errorOutput.appendChild(error);
            valid = false;

        }

    } else {
        password.classList = "invalidInput";
        confirmPassword.classList = "invalidInput";
        let error1 = document.createElement("label");
        error1.textContent = "* Password must be at least 8 character.";
        let error2 = document.createElement("label");
        error2.textContent = "* Password must contain capital and lower case.";
        let error3 = document.createElement("label");
        error3.textContent = "* Password must contain numbers.";
        errorOutput.appendChild(error1);
        errorOutput.appendChild(error2);
        errorOutput.appendChild(error3);
        valid = false;

    }
    console.log(valid);
    if (valid) {
        console.log("kdsjfsdkj");
        fetch("/signup", {
                method: "POST",
                body: JSON.stringify({
                    email: email.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    password: password.value
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(response => {
                if (response.message !== 302) throw new Error(response.status);
                //window.location = "localhostlogin.js";
            })
            .catch(error => {
                if (error.message == 501) {
                    errorOutput.innerHTML = "";
                    let error = document.createElement("label");
                    error.textContent = "* email already Exist";
                    errorOutput.appendChild(error);
                }
            })
    }


})

email.addEventListener("blur", event => {
    errorOutput.innerHTML = "";
    if (emailValidation(email.value)) {
        email.classList = "validInput";
    } else {
        let error = document.createElement("label");
        error.textContent = "* Pleas Enter A valid Email.";
        email.classList = "invalidInput";
        errorOutput.appendChild(error);
        valid = false;
    }
})

firstName.addEventListener('blur', event => {
    errorOutput.innerHTML = "";
    if (nameValidation(firstName.value)) {
        firstName.classList = "validInput";
    } else {
        firstName.classList = "invalidInput";
        let error1 = document.createElement("label");
        error1.textContent = "* First Name must be at least 3 character and not contain numbers or symbols.";
        errorOutput.appendChild(error1);
    }
})


lastName.addEventListener('blur', event => {
    errorOutput.innerHTML = "";
    if (nameValidation(firstName.value)) {
        lastName.classList = "validInput";
    } else {
        lastName.classList = "invalidInput";
        let error1 = document.createElement("label");
        error1.textContent = "* last Name must be at least 3 character and not contain numbers or symbols.";
        errorOutput.appendChild(error1);
    }
})



password.addEventListener("blur", event => {

    if (passwordValidation(password.value)) {
        password.classList = "validInput";

    } else {
        password.classList = "invalidInput";
        let error1 = document.createElement("label");
        error1.textContent = "* Password must be at least 8 character.";
        let error2 = document.createElement("label");
        error2.textContent = "* Password must contain capital and lower case.";
        let error3 = document.createElement("label");
        error3.textContent = "* Password must contain numbers.";
        errorOutput.appendChild(error1);
        errorOutput.appendChild(error2);
        errorOutput.appendChild(error3);
        valid = false;
    }
})


confirmPassword.addEventListener("blur", event => {
    errorOutput.innerHTML = "";

    if (passwordValidation(password.value) && password.value === confirmPassword.value) {
        confirmPassword.classList = "validInput";

    } else {
        confirmPassword.classList = "invalidInput";
        let error3 = document.createElement("label");
        error3.textContent = "* Password must match.";
        errorOutput.appendChild(error3);

    }
})


function emailValidation(email) {
    let pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return pattern.test(email);
}

function passwordValidation(password) {
    if (password.length < 8) {
        return false;
    }
    let capital = false;
    let lower = false;
    let number = false;

    for (let i = 0; i < password.length; i++) {

        if (!isNaN((password.charAt(i)) * 1)) {
            number = true;
        } else {


            if (password.charAt(i) === (password.charAt(i)).toUpperCase()) {
                capital = true;
            }

            if (password.charAt(i) === (password.charAt(i)).toLowerCase()) {
                lower = true;
            }

        }
    }

    if (capital && lower && number) {
        return true;
    }
    return false;

}

function nameValidation(name) {
    if (name.length < 3) return false;
    const pattern = /^[A-Za-z]+$/;
    return pattern.test(name);
}