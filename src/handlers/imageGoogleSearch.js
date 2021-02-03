function googleHandler(request, response) {
    let carName = "";
    carName = new URL(`http://${request.url}`).searchParams.get("search");

    const axios = require('axios');
    axios.post('https://api.dataforseo.com/v3/serp/google/images/live/advanced', [{ keyword: carName, language_code: "en", location_code: 2740 }], { auth: { username: "ave.brhom@gmail.com", password: "d4f9b29544f1b39f" } })

    .then(data => {
        response.writeHead(200, { "content-type": "text/plain" });
        response.end(JSON.stringify(data.data.tasks[0].result[0].items[0].source_url));
    }).catch(err => {
        response.writeHead(500, { "content-type": "text/plain" });
        response.end("nono");
    })

}
module.exports = googleHandler;