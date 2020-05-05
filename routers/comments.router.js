const commentsRouter = require("express").Router();
const {
  patchCommentById,
  deleteCommentById,
} = require("../controllers/comments.controller");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById) //PATCH /api/comments/:comment_id
  .delete(deleteCommentById); //DELETE /api/comments/:comment_id

module.exports = commentsRouter;
