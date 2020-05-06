const articlesRouter = require("express").Router();
const {handle405} = require("../controllers/error.controllers");

const {
  getArticleById,
  patchArticleById,
  getAllArticles,
} = require("../controllers/articles.controller");
const {
  postComment,
  getCommentById,
} = require("../controllers/comments.controller");

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getCommentById)
  .all(handle405); // PATCH & DELETE 405 DONE

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(handle405); // POST & DEL 405 DONE

articlesRouter.route("/").get(getAllArticles).all(handle405);

module.exports = articlesRouter;
