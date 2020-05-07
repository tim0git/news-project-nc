const {
  insertComment,
  selectCommentById,
  incrementCommentById,
  delCommentById,
} = require("../model/comments.model.js");

exports.postComment = (req, res, next) => {
  const { body } = req;
  const { article_id } = req.params;
  insertComment(body, article_id)
    .then((result) => {
      //console.log(result);
      res.status(201).send({ comment: result[0] });
    })
    .catch(next);
};

exports.getCommentById = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by } = req.query;
  const { order } = req.query;
  selectCommentById(article_id, sort_by, order)
    .then((result) => {
      res.status(200).send({ comments: result });
    })
    .catch(next);
}; // get comments by article_id

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  incrementCommentById(comment_id, inc_votes)
    .then((result) => {
      res.status(200).send({ comment: result });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  delCommentById(comment_id)
    .then((result) => {
      res.status(result.status).send({ result: result });
    })
    .catch(next);
};
