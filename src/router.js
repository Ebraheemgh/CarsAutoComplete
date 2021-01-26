
const carHandler = require("./handlers/carHandler");
const homeHandlers = require("./handlers/homeHandlers");
const missingHandler = require("./handlers/missingHandler");
const publicHandler = require("./handlers/publicHandler");
const router = (req, res) => {
  const url = request.url;
  if (url === "/") {
    homeHandler(request, response);
  } else if (url.includes("public")) {
    publicHandler(request, response);
  } else if (req.url === "/car") {
    carHandler(request, response);
  } else {
    missingHandler(request, response);
  }
};
module.exports = router;
