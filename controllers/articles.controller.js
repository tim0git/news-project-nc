const {
  selectArticleById,
  updateArticleById,
  selectAllArticles,
} = require("../model/articles.model");

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

  selectAllArticles(sort_by, order, author, topic)
    .then((result) => {
      res.status(200).send({ articles: result });
    })
    .catch(next);
};
