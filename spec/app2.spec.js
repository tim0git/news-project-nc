const ENV = process.env.NODE_ENV || "test";
// set env to test
const app = require("../app.js");
const request = require("supertest");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe("/api", () => {
  describe("/users", () => {
    describe("GET/api/users", () => {
      test("should return an array of users and a status code of 200", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then((result) => {
            result.body.users.forEach((user) => {
              expect(user).toHaveProperty("username");
              expect(user).toHaveProperty("name");
              expect(user).toHaveProperty("avatar_url");
            });
          });
      });
      test("should return an object of possible routes and a status code of 404 when an incorrect path is given", () => {
        return request(app)
          .get("/api/userz")
          .expect(404)
          .then((result) => {
            expect(result.body).toEqual({
              availableRoutes: {
                DELETE: "/api/comments/:comment_id",
                GET: "/api",
                PATCH: "/api/comments/:comment_id",
                POST: "/api/articles/:article_id/comments",
              },
            });
          });
      });
    });
    // end of GET /api/users
    describe("POST /user", () => {
      test("should return an object of a new user and status 201", () => {
        return request(app)
          .post("/api/users")
          .send({
            username: "tim0git",
            name: "tim",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
          })
          .expect(201)
          .then((user) => {
            expect(user.body.user).toEqual({
              username: "tim0git",
              name: "tim",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
            });
          });
      });
      // end of POST /api/users
    });
    //end of /users
  });
  // end of /api
});
