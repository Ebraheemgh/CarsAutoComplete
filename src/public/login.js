var form = document.getElementsById("login_form");
var email = document.getElementById("email");
var password = document.getElementById("password");
var error = document.getElementById("error");

function checkPassword (){
    if (password.value === "") { 
        error.textContent = "Please enter Password";
        password.classList.add("check");
        valid=false;
    }
    
    else {
        password.classList.remove("check");
        error.textContent="";
    }
}

function checkEmail (){
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value === "") { 
        error.textContent = "Please enter email";
        email.classList.add("check");
        valid=false;
    }

    else if(!email.value.match(mailformat)){
        error.textContent = "Please enter a valid email address";
        email.classList.add("check");
        valid=false;
    }
    else {
        email.classList.remove("check");
        checkPassword();
    }
}

form.addEventListener("submit", function(event) {
  let valid = true;
  checkEmail();     
  if(valid)  {
    let apiurl = `/login?email=${email.value}$password=${password.value}`;
    fetch(apiurl)
        .then((response) => {
            if (response.statusText !==302) throw new Error(response.status);
            // window.onload("index.html");
         })
         .catch((err) => {
            if (err.message === "404") {
                error.textContent = "Invalid email!";
                
            } else {

                alert("somthing went wrong")
            }
        });
  }

  
});