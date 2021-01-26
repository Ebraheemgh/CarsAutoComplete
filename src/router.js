const carHandler = require("./handlers/carHandler");
const homeHandlers = require("./handlers/homeHandlers");
const missingHandler = require("./handlers/missingHandler");
const publicHandler = require("./handlers/publicHandler");
const router = (request, response) => {
    const url = request.url;
    if (url === "/") {
        homeHandlers(request, response);
    } else if (url.includes("public")) {
        publicHandler(request, response);
    } else if (url === "/car") {
        carHandler(request, response);
    } else {
        missingHandler(request, response);
    }
};
module.exports = router;