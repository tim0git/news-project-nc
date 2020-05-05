const ENV = process.env.NODE_ENV || "test";
// set env to test
const app = require("../app.js");
const request = require("supertest");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe("app", () => {
  describe("/api", () => {
    describe("/topics", () => {
      describe("GET", () => {
        test("expect GET /api/users to return 200", () => {
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
    describe("/users", () => {
      describe("GET /:username", () => {
        test("expect GET /api/users/:username to return 200", () => {
          return request(app).get("/api/users/butter_bridge").expect(200);
        });
        test("return the user with username butter_bridge", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then((result) => {
              result.body.user.forEach((individual) => {
                expect(individual.username).toEqual("butter_bridge");
              });
            });
        });
        test("expect user to have length of 1", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then((result) => {
              expect(result.body.user.length).toBe(1);
            });
        });
        test("return object has properties of username, avatar_url, name", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then((result) => {
              result.body.user.forEach((individual) => {
                expect(individual).toHaveProperty("username");
                expect(individual).toHaveProperty("avatar_url");
                expect(individual).toHaveProperty("name");
              });
            });
        });
        // end of /users GET
      });
      // end of /users
    });
    //GET /api/articles/:article_id
    describe("/articles", () => {
      describe("GET /:article_id", () => {
        test("expect /api/articles/:article_id to respond with a 200", () => {
          return request(app).get("/api/articles/1").expect(200);
        });
        test("expect article to have properties of comment_count... ect", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then((result) => {
              result.body.article.forEach((individual) => {
                expect(individual).toHaveProperty("article_id");
                expect(individual).toHaveProperty("title");
                expect(individual).toHaveProperty("body");
                expect(individual).toHaveProperty("votes");
                expect(individual).toHaveProperty("topic");
                expect(individual).toHaveProperty("author");
                expect(individual).toHaveProperty("created_at");
                expect(individual).toHaveProperty("comment_count");
              });
            });
        });
        test("expect article to have length of 1", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then((result) => {
              expect(result.body.article.length).toBe(1);
            });
        });
        test("returns article with id of 1", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then((result) => {
              result.body.article.forEach((individual) => {
                expect(individual.article_id).toBe(1);
              });
            });
        });
        // end of article GET
      });
      describe("PATCH /:article_id", () => {
        test("expect /api/articles/:article_id responds with 200", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
            .expect(200);
        });
        test("expect /api/articles/:article_id responds the article_id body updated", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then((result) => {
              result.body.article.forEach((individual) => {
                expect(individual).toHaveProperty("article_id");
                expect(individual).toHaveProperty("title");
                expect(individual).toHaveProperty("body");
                expect(individual).toHaveProperty("votes");
                expect(individual).toHaveProperty("topic");
                expect(individual).toHaveProperty("author");
                expect(individual).toHaveProperty("created_at");
              });
            });
        });
        test("updates vote count by 1", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then((result) => {
              result.body.article.forEach((individual) => {
                expect(individual.votes).toBe(101);
              });
            });
        });
      });
      describe("GET", () => {
        test("reponds with 200 on api/articles", () => {
          return request(app).get("/api/articles").expect(200);
        });
        test("expect /api/articles has the following keys", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then((result) => {
              result.body.articles.forEach((individual) => {
                expect(individual).toHaveProperty("article_id");
                expect(individual).toHaveProperty("title");
                expect(individual).toHaveProperty("body");
                expect(individual).toHaveProperty("votes");
                expect(individual).toHaveProperty("topic");
                expect(individual).toHaveProperty("author");
                expect(individual).toHaveProperty("created_at");
                expect(individual).toHaveProperty("comment_count");
              });
            });
        });
        test("can take a sort_by query author", () => {
          return request(app)
            .get("/api/articles?sort_by=author")
            .expect(200)
            .then((result) => {
              expect(result.body.articles).toBeSortedBy("author", {
                descending: true,
              });
            });
        });
        test("can take a sort_by query author & order by asc", () => {
          return request(app)
            .get("/api/articles?sort_by=author&order=asc")
            .expect(200)
            .then((result) => {
              expect(result.body.articles).toBeSortedBy("author");
            });
        });
        test("can filter by author", () => {
          return request(app)
            .get("/api/articles?author=butter_bridge")
            .expect(200)
            .then((result) => {
              result.body.articles.forEach((article) => {
                expect(article.author).toBe("butter_bridge");
              });
            });
        });
        test("can filter by topic", () => {
          return request(app)
            .get("/api/articles?topic=mitch")
            .expect(200)
            .then((result) => {
              result.body.articles.forEach((article) => {
                expect(article.topic).toBe("mitch");
              });
            });
        });
        // end of GET
      });
      // end of /articles
    });
    describe("/comments", () => {
      describe("POST /:article_id/comments", () => {
        test("post request return 201", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ username: "lurker", body: "lorem10" })
            .expect(201);
        });
        test("expect return object to have the following keys", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ username: "lurker", body: "lorem10" })
            .expect(201)
            .then((result) => {
              result.body.comment.forEach((comment) => {
                expect(comment).toHaveProperty("comment_id");
                expect(comment).toHaveProperty("author");
                expect(comment).toHaveProperty("article_id");
                expect(comment).toHaveProperty("votes");
                expect(comment).toHaveProperty("body");
                expect(comment).toHaveProperty("created_at");
              });
            });
        });
        // end of POST
      });
      describe("GET /:article_id/comments", () => {
        test("returns 200 on a get request", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then((result) => {
              result.body.comments.forEach((comment) => {
                expect(comment).toHaveProperty("comment_id");
                expect(comment).toHaveProperty("author");
                expect(comment).toHaveProperty("article_id");
                expect(comment).toHaveProperty("votes");
                expect(comment).toHaveProperty("body");
                expect(comment).toHaveProperty("created_at");
              });
            });
        });
        test("can take a sort_by query comment_id", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=comment_id")
            .expect(200)
            .then((result) => {
              expect(result.body.comments).toBeSortedBy("comment_id", {
                coerce: true,
                descending: true,
              });
            });
        });
        test("can take a sort_by query author", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=author")
            .expect(200)
            .then((result) => {
              expect(result.body.comments).toBeSortedBy("author", {
                descending: true,
              });
            });
        });
        test("can take a sort_by query aricle_id asc", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=article_id&order=asc")
            .expect(200)
            .then((result) => {
              expect(result.body.comments).toBeSortedBy("article_id", {
                coerce: true,
              });
            });
        });
        // end of GET
      });
      describe("PATCH /comments/:comment_id", () => {
        test("resonds with 200 okay", () => {
          return request(app).patch("/api/comments/1").expect(200);
        });
        test("expect comment to be returned with the following keys", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then((result) => {
              result.body.comment.forEach((individual) => {
                expect(individual).toHaveProperty("comment_id");
                expect(individual).toHaveProperty("article_id");
                expect(individual).toHaveProperty("body");
                expect(individual).toHaveProperty("votes");
                expect(individual).toHaveProperty("author");
                expect(individual).toHaveProperty("created_at");
              });
            });
        });
        test("updates vote count by 1", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then((result) => {
              result.body.comment.forEach((individual) => {
                expect(individual.votes).toBe(17);
              });
            });
        });
      });
      describe("DELETE", () => {
        test("returns 204 and no content", () => {
          return request(app)
            .del("/api/comments/1")
            .expect(204)
            .then((result) => {
              expect(result.res.statusMessage).toBe("No Content");
            });
        });
      });
      // end of /comments
    });
    // end of /api
  });
  // end of app
});
