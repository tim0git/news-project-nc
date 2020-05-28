const {
  insertComment,
  selectCommentById,
  incrementCommentById,
  delCommentById,
} = require("../model/comments.model.js");
const { checkArticle_id } = require("../model/articles.model");

exports.postComment = (req, res, next) => {
  const { body } = req;
  const { article_id } = req.params;
  insertComment(body, article_id)
    .then((result) => {
      res.status(201).send({ comment: result[0] });
    })
    .catch(next);
};

exports.getCommentById = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order, limit, p } = req.query;
  const queries = [selectCommentById(article_id, sort_by, order, limit, p)];
  if (article_id) queries.push(checkArticle_id(article_id));
  Promise.all(queries)
    .then(([comments, article]) => {
      res.status(200).send({ comments: comments, total_count: comments.length });
    })
    .catch(next);
};

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
    .catch((err) => {
      next(err);
    });
};
