const articlesRouter = require("express").Router();
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
  .get(getCommentById);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter.route("/").get(getAllArticles);

module.exports = articlesRouter;
