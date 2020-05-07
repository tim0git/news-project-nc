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
  if (topic) {
    selectAllTopics(topic).then((result) => {
      if (result.length > 0) {
        console.log(result);
        selectAllArticles(sort_by, order, author, topic)
          .then((result) => {
            res.status(200).send({ articles: result });
          })
          .catch(next);
      } else {
        res.status(404).send({ message: "resource not found" });
      }
    });
  } else if (author) {
    selectCommentsByAuthor(author).then((result) => {
      if (result.length < 1) {
        res.status(404).send({ message: "resource not found" });
      } else {
        selectAllArticles(sort_by, order, author, topic)
          .then((result) => {
            res.status(200).send({ articles: result });
          })
          .catch(next);
      }
    });
  } else {
    selectAllArticles(sort_by, order, author, topic)
      .then((result) => {
        res.status(200).send({ articles: result });
      })
      .catch(next);
  }
};
