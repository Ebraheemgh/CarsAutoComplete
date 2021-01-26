const http = require("http");
const hostname = "localhost";
const port = process.env.PORT || 3000;
const router = require("./router");

http.createServer(router).listen(port, hostname, () => {
    console.log(`Server running at port http://${hostname}:${port}`);
});