const commentsRouter = require("express").Router();
const { handle405 } = require("../controllers/error.controllers");

const {
  patchCommentById,
  deleteCommentById,
} = require("../controllers/comments.controller");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)   //PATCH /api/comments/:comment_id
  .delete(deleteCommentById) //DELETE /api/comments/:comment_id
  .all(handle405); // POST & GET 405 DONE

module.exports = commentsRouter;
