const test = require("tape");
const router = require("./router");
const supertest = require("supertest");
const nock = require("nock");


/** Back End Testing **/

// test 1
test("Initialise", t => {
    let num = 2;
    t.equal(num, 2, "Should return 2");
    t.end();
});

// test 2
test("home url expected status code 200", t => {
    supertest(router)
        .get("/")
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
            t.error(err);
            t.end();
        });
});

// test 3
test("invalid url code is 404", t => {
    supertest(router)
        .get("/bigCar")
        .expect(404)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
            t.error(err);
            t.equal(res.text, "<h1>Not found</h1>");
            t.end();
        });
});


// test 4
test("valid url code is 200", t => {
    supertest(router)
        .get("/car?q=ford")
        .expect(200)
        .expect("Content-Type", "application/json")
        .end((err, res) => {
            t.error(err);
            t.end();
        });
});

// test 5
test("valid url code is 200", t => {
    supertest(router)
        .get("/car?q=mer")
        .expect(200)
        .expect("Content-Type", "application/json")
        .end((err, res) => {
            t.error(err);
            t.end();
        });
});

// test 6
test("valid url code is 200", t => {
    supertest(router)
        .get("/car?q=bm")
        .expect(200)
        .expect("Content-Type", "application/json")
        .end((err, res) => {
            t.error(err);
            t.end();
        });
});

// test 7
test("valid url code is 200", t => {
    supertest(router)
        .get("/car?q=to")
        .expect(200)
        .expect("Content-Type", "application/json")
        .end((err, res) => {
            t.error(err);
            t.end();
        });
});

// test 8
test("invalid url code is 404", t => {
    supertest(router)
        .get("/car?q=maar")
        .expect(404)
        .expect("Content-Type", "application/json")
        .end((err, res) => {
            t.error(err);
            t.end();
        });
});

// tests of API google

// test 9 
nock("https://api.dataforseo.com")
    .post("/v3/serp/google/images/live/advanced")
    .reply(200, { tasks: [{ result: [{ items: [{ source_url: "image_url" }] }] }] });

test("valid url code is 200", t => {
    supertest(router)
        .post("/google?search=ford")
        .expect(200)
        .expect("Content-Type", "text/plain")
        .end((err, res) => {
            t.error(err);
            t.equal(JSON.parse(res.text), "image_url");
            t.end();
        });
});