const http = require("http");
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 3000;
const router = require("./router");

http.createServer().listen(port, hostname, () => {
    console.log(`Server running at port http://${hostname}:${port}`);
});