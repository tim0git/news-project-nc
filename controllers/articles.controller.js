const {
  selectArticleById,
  updateArticleById,
  selectAllArticles,
  selectAllArticlesTopic,
} = require("../model/articles.model");
const { selectAllTopics } = require("../model/topics.model");
const { selectCommentsByAuthor } = require("../model/comments.model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((result) => {
      res.status(200).send({ article: result });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  let { inc_votes } = req.body;
  updateArticleById(article_id, inc_votes)
    .then((result) => {
      res.status(200).send({ article: result });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  const queries = [selectAllArticles(sort_by, order, author, topic)];
  if (author) queries.push(selectCommentsByAuthor(author));
  if (topic) queries.push(selectAllTopics(topic));
  Promise.all(queries)
    .then((results) => {
      const articles = results;
      res.status(200).send({ articles: results[0] });
    })
    .catch(next);
};
