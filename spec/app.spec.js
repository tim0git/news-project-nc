const ENV = process.env.NODE_ENV || "test";
// set env to test
const app = require("../app.js");
const request = require("supertest");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run);
afterAll(() => connection.destroy());

describe("app", () => {
  describe("/api", () => {
    describe("/topics", () => {
      describe("GET", () => {
        test("expect a 200 return from /api/topics", () => {
          return request(app).get("/api/topics").expect(200);
        });
        test("topics array to have a length of 3", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then((result) => {
              expect(result.body.topics.length).toBe(3);
            });
        });
        test("each topic have keys of slug & description", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then((result) => {
              result.body.topics.forEach((topic) => {
                expect(topic).toHaveProperty("slug");
                expect(topic).toHaveProperty("description");
              });
            });
        });
        // end of topics/ GET
      });
      // end of /topics
    });
    // end of /api
  });
  // end of app
});
