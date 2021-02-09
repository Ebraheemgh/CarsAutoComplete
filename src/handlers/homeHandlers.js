const fs = require("fs");
const path = require("path");

function homeHandler(request, response) {
    // public directory is one level above this, so we need the ".."
    const filePath = path.join(__dirname, "..", "public", "login.html");
    fs.readFile(filePath, (error, file) => {
        if (error) {
            response.writeHead(500, { "content-type": "text/html" });
            response.end("<h1>Error in reading file</h1>");
        } else {
            response.writeHead(200, { "content-type": "text/html" });
            response.end(file);
        }
    });
}
module.exports = homeHandler;