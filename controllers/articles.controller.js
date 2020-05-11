const {
  selectArticleById,
  updateArticleById,
  selectAllArticles,
} = require("../model/articles.model");
const { selectUserById } = require("../model/users.model");
const { selectAllTopics } = require("../model/topics.model");

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
  const { sort_by, order, author, topic, limit, p } = req.query;
  const queries = [selectAllArticles(sort_by, order, author, topic, limit, p)];
  if (author) queries.push(selectUserById(author));
  if (topic) queries.push(selectAllTopics(topic));
  Promise.all(queries)
    .then((results) => {
      const articles = results[0];
      res
        .status(200)
        .send({ articles: articles, total_count: articles.length });
    })
    .catch(next);
};
