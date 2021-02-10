const carHandler = require("./handlers/carHandler");
const homeHandlers = require("./handlers/homeHandlers");
const missingHandler = require("./handlers/missingHandler");
const publicHandler = require("./handlers/publicHandler");
const googleHandler = require("./handlers/imageGoogleSearch");
const signUpHandler = require("./handlers/signUpHandler");
const loginHandler = require("./handlers/loginHandler");
const mainHandler = require("./handlers/mainHandler");
const signupformHandler = require("./handlers/signupformHandler");
const viewCommentsHandler = require("./handlers/viewCommentsHandler");
const addCommentHandler = require("./handlers/addCommentHandler");

const router = (request, response) => {
    const url = request.url;
    if (url === "/") {
        homeHandlers(request, response);
    } else if (url.includes("public")) {
        publicHandler(request, response);
    } else if (url.includes("car")) {
        carHandler(request, response);
    } else if (url.includes("google")) {
        googleHandler(request, response);
    } else if (url.includes("signup")) {
        signUpHandler(request, response);
    } else if (url.includes("regestration")) {
        signupformHandler(request, response);
    } else if (url.includes("login")) {
        loginHandler(request, response);
    } else if (url.includes("main")) {
        mainHandler(request, response);
    } else if (url.includes("viewcomments")) {
        viewCommentsHandler(request, response);
    } else if (url.includes("addcomment")) {
        addCommentHandler(request, response);
    } else {
        missingHandler(request, response);
    }

}
module.exports = router;