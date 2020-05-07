const ENV = process.env.NODE_ENV || "test";
// set env to test
const app = require("../app.js");
const request = require("supertest");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe("app", () => {
  describe("/api", () => {
    describe("GET /api", () => {
      test("return a JSON Object with available routes", () => {
        return request(app)
          .get("/api")
          .expect(200)
          .then((result) => {
            expect(result.body.availableRoutes).toEqual({
              GET: "/api/topics",
              GET: "/api/users/:username",
              GET: "/api/articles/:article_id",
              GET: "/api/articles/:article_id/comments",
              GET: "/api/articles",
              GET: "/api",
              PATCH: "/api/articles/:article_id",
              PATCH: "/api/comments/:comment_id",
              POST: "/api/articles/:article_id/comments",
              DELETE: "/api/comments/:comment_id",
            });
          });
      });
    });
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
      describe("ERRORS /topics", () => {
        test("POST /api/topics", () => {
          return request(app)
            .post("/api/topics")
            .expect(405)
            .then((result) => {
              expect(result.body.msg).toBe("method not allowed");
            });
        });
        test("PATCH /api/topics", () => {
          return request(app)
            .patch("/api/topics")
            .expect(405)
            .then((result) => {
              expect(result.body.msg).toBe("method not allowed");
            });
        });
        test("DELETE/api/topics", () => {
          return request(app)
            .del("/api/topics")
            .expect(405)
            .then((result) => {
              expect(result.body.msg).toBe("method not allowed");
            });
        });
        test("GET /api/topicz Incorrect Path Spelling Error", () => {
          return request(app)
            .get("/api/topicz")
            .expect(404)
            .then((result) => {
              expect(result.res.statusMessage).toBe("Not Found");
            });
        });
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
              expect(result.body.user.username).toEqual("butter_bridge");
            });
        });
        test("return object has properties of username, avatar_url, name", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then((result) => {
              expect(result.body.user).toHaveProperty("username");
              expect(result.body.user).toHaveProperty("avatar_url");
              expect(result.body.user).toHaveProperty("name");
            });
        });
        // end of /users GET
      });
      describe("ERRORS /users/:username", () => {
        test("POST /users/:username", () => {
          return request(app)
            .post("/api/users/butter_bridge")
            .expect(405)
            .then((result) => {
              expect(result.body.msg).toBe("method not allowed");
            });
        });
        test("PATCH /users/:username", () => {
          return request(app)
            .patch("/api/users/butter_bridge")
            .expect(405)
            .then((result) => {
              expect(result.body.msg).toBe("method not allowed");
            });
        });
        test("DELETE /users/:username", () => {
          return request(app)
            .del("/api/users/butter_bridge")
            .expect(405)
            .then((result) => {
              expect(result.body.msg).toBe("method not allowed");
            });
        });
        test("expect GET wong username to return 404 resource not found", () => {
          return request(app)
            .get("/api/users/butter_brid")
            .expect(404)
            .then((result) => {
              expect(result.body.msg).toBe("resource not found");
            });
        });
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
              expect(result.body.article).toHaveProperty("article_id");
              expect(result.body.article).toHaveProperty("title");
              expect(result.body.article).toHaveProperty("body");
              expect(result.body.article).toHaveProperty("votes");
              expect(result.body.article).toHaveProperty("topic");
              expect(result.body.article).toHaveProperty("author");
              expect(result.body.article).toHaveProperty("created_at");
              expect(result.body.article).toHaveProperty("comment_count");
            });
        });
        test("expect article to have length of 1", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then((result) => {
              expect(result.body.article.article_id).toBe(1);
            });
        });
        test("when passed an incorrect Id return 404 resource not found", () => {
          return request(app)
            .get("/api/articles/999")
            .expect(404)
            .then((result) => {
              expect(result.body.msg).toBe("resource not found");
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
              expect(result.body.article).toHaveProperty("article_id");
              expect(result.body.article).toHaveProperty("title");
              expect(result.body.article).toHaveProperty("body");
              expect(result.body.article).toHaveProperty("votes");
              expect(result.body.article).toHaveProperty("topic");
              expect(result.body.article).toHaveProperty("author");
              expect(result.body.article).toHaveProperty("created_at");
            });
        });
        test("updates vote count by 1", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then((result) => {
              expect(result.body.article.votes).toBe(101);
            });
        });
        test("ERROR when passed incorrect Id returns 404 resource not found", () => {
          return request(app)
            .patch("/api/articles/999")
            .send({ inc_votes: 1 })
            .expect(404)
            .then((result) => {
              expect(result.body.msg).toBe("resource not found");
            });
        });

        test("ERROR when passed incorrect body returns 200 okay votes 100", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ incvotes: 1 })
            .expect(200)
            .then((result) => {
              expect(result.body.article.votes).toBe(100);
            });
        });

        test("ERROR when passed incorrect body returns 400 bad request", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: "z" })
            .expect(400)
            .then((result) => {
              expect(result.body.message).toBe("bad request");
            });
        });

        test("ERROR when passed incorrect body returns 200 okay votes 101", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 1, dave: 1 })
            .expect(200)
            .then((result) => {
              expect(result.body.article.votes).toBe(101);
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
        test("ERROR when passed incorrect author responds with 404 resource not found", () => {
          return request(app)
            .get("/api/articles?author=notKnown")
            .expect(200)
            .then((result) => {
              expect(result.body.articles).toEqual([]);
            });
        });
        test("ERROR when passed incorrect topic responds with 404 resource not found", () => {
          return request(app)
            .get("/api/articles?topic=notKnown")
            .expect(200)
            .then((result) => {
              expect(result.body.articles).toEqual([]);
            });
        });
        test("ERROR order by incorrect term", () => {
          return request(app)
            .get("/api/articles?sort_by=author&order=not-asc-or-desc")
            .expect(400)
            .then((result) => {
              expect(result.body.msg).toBe("bad request");
            });
        });
        test("ERROR sort by incorrect term not-a-column", () => {
          return request(app)
            .get("/api/articles?sort_by=not-a-column")
            .expect(400)
            .then((result) => {
              expect(result.body.message).toBe("bad request");
            });
        });
        test("ERROR when passed incorrect path responds with list of available paths", () => {
          return request(app)
            .get("/api/articlez")
            .expect(404)
            .then((result) => {
              expect(result.body).toEqual({
                availableRoutes: {
                  GET: "/api/topics",
                  GET: "/api/users/:username",
                  GET: "/api/articles/:article_id",
                  GET: "/api/articles/:article_id/comments",
                  GET: "/api/articles",
                  GET: "/api",
                  PATCH: "/api/articles/:article_id",
                  PATCH: "/api/comments/:comment_id",
                  POST: "/api/articles/:article_id/comments",
                  DELETE: "/api/comments/:comment_id",
                },
              });
            });
        });
        // end of GET
      });
      describe("ERRORS /:article_id", () => {
        test('POST "/:article_id"', () => {
          return request(app)
            .post("/api/articles/:article_id")
            .expect(405)
            .then((result) => {
              expect(result.body.msg).toBe("method not allowed");
            });
        });
        test('DELETE "/:article_id"', () => {
          return request(app)
            .del("/api/articles/:article_id")
            .expect(405)
            .then((result) => {
              expect(result.body.msg).toBe("method not allowed");
            });
        });
      });
      // end of /articles
    });
    describe("/comments", () => {
      describe("POST /:article_id/comments", () => {
        test("post request return 201", () => {
          return request(app)
            .post("/api/articles/5/comments")
            .send({ username: "lurker", body: "lorem10" })
            .expect(201);
        });
        test("expect return object to have the following keys", () => {
          return request(app)
            .post("/api/articles/4/comments")
            .send({ username: "lurker", body: "lorem10" })
            .expect(201)
            .then((result) => {
              expect(result.body.comment).toHaveProperty("comment_id");
              expect(result.body.comment).toHaveProperty("author");
              expect(result.body.comment).toHaveProperty("votes");
              expect(result.body.comment).toHaveProperty("body");
              expect(result.body.comment).toHaveProperty("created_at");
            });
        });
        test("ERROR when passed an incorrect username returns 404 resource not found", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ username: "tommy", body: "lorem10" })
            .expect(404)
            .then((result) => {
              expect(result.body.message).toBe("resource not found");
            });
        });

        test("ERROR when passed an valid username not there returns 404 resource not found", () => {
          return request(app)
            .post("/api/articles/10000/comments")
            .send({ username: "lurker", body: "lorem10" })
            .expect(404)
            .then((result) => {
              expect(result.body.message).toBe("resource not found");
            });
        });

        test("ERROR when passed an incorrect username returns 400 bad request", () => {
          return request(app)
            .post("/api/articles/notValid/comments")
            .send({ username: "lurker", body: "lorem10" })
            .expect(400)
            .then((result) => {
              expect(result.body.message).toBe("bad request");
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
        test("ERROR when passed incorrect article_id returns 404 resource not found", () => {
          return request(app)
            .get("/api/articles/99")
            .expect(404)
            .then((result) => {
              expect(result.body.msg).toBe("resource not found");
            });
        });
        // end of GET
      });
      describe("ERRORS /:article_id/comments", () => {
        test('PATCH "/:article_id/comments"', () => {
          return request(app)
            .patch("/api/articles/:article_id/comments")
            .expect(405)
            .then((result) => {
              expect(result.body.msg).toBe("method not allowed");
            });
        });
        test('DELETE "/:article_id/comments"', () => {
          return request(app)
            .del("/api/articles/:article_id/comments")
            .expect(405)
            .then((result) => {
              expect(result.body.msg).toBe("method not allowed");
            });
        });
      });
      describe("ERRORS /comments/:comment_id", () => {
        test("POST /api/comments/:comment_id", () => {
          return request(app)
            .post("/api/comments/4")
            .expect(405)
            .then((result) => {
              expect(result.body.msg).toBe("method not allowed");
            });
        });
        test("GET /api/comments/:comment_id", () => {
          return request(app)
            .get("/api/comments/4")
            .expect(405)
            .then((result) => {
              expect(result.body.msg).toBe("method not allowed");
            });
        });
      });

      describe("PATCH /comments/:comment_id", () => {
        test("resonds with 200 okay", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 1 })
            .expect(200);
        });
        test("expect comment to be returned with the following keys", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then((result) => {
              expect(result.body.comment).toHaveProperty("comment_id");
              expect(result.body.comment).toHaveProperty("article_id");
              expect(result.body.comment).toHaveProperty("body");
              expect(result.body.comment).toHaveProperty("votes");
              expect(result.body.comment).toHaveProperty("author");
              expect(result.body.comment).toHaveProperty("created_at");
            });
        });
        test("updates vote count by 1", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then((result) => {
              expect(result.body.comment.votes).toBe(17);
            });
        });
        test("ERROR when passed an incorrect id returns 404 resource not found", () => {
          return request(app)
            .patch("/api/comments/99")
            .send({ inc_votes: 1 })
            .expect(404)
            .then((result) => {
              expect(result.body.msg).toBe("resource not found");
            });
        });

        test("ERROR when passed incorrect body returns 400 bad request", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ incvotes: 1 })
            .expect(200)
            .then((result) => {
              expect(result.body.comment.votes).toBe(16);
            });
        });
        test("ERROR when passed incorrect body returns 400 bad request", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: "z" })
            .expect(400)
            .then((result) => {
              expect(result.body.message).toBe("bad request");
            });
        });

        test("ERROR when passed incorrect body returns 400 bad request", () => {
          return request(app)
            .patch("/api/comments/2")
            .send({ inc_votes: 1, dave: 1 })
            .expect(200)
            .then((result) => {
              expect(result.body.comment.votes).toBe(15);
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
        test("ERROR incorrect username returns 400 not found", () => {
          return request(app)
            .del("/api/comments/z")
            .expect(400)
            .then((result) => {
              expect(result.body.message).toBe("bad request");
            });
        });
        test("ERROR incorrect username returns 404 not found", () => {
          return request(app)
            .del("/api/comments/1000")
            .expect(404)
            .then((result) => {
              expect(result.body.msg).toBe("resource not found");
            });
        });
      });
      // end of DELETE
      // end of /comments
    });
    // end of /api
  });
  describe("FEEDBACK TESTS", () => {
    test(" GET `/api/articles`", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((result) => {
          expect(result.body.articles[0].article_id).toBe(1);
        });
    });
    test(" GET `/api/articles?author=lurker`", () => {
      return request(app)
        .get("/api/articles?author=groceries")
        .expect(200)
        .then((result) => {
          expect(result.body.articles.length).toBe(0);
        });
    });
    test(" GET `/api/articles/2/comments`", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then((result) => {
          expect(result.body).toEqual({ comments: [] });
        });
    });
    test(" GET `/api/users/butter_bridge`", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then((result) => {
          expect(result.body).toEqual({
            user: {
              username: "butter_bridge",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
              name: "jonny",
            },
          });
        });
    });
  });
  // end of app
});
