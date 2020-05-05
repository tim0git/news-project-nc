exports.send404 = (req, res, next) => {
  console.log("unknown path error");
  res.status(404).send({
    GET: "/api/topics",
    GET: "/api/users/:username",
    GET: "/api/articles/:article_id",
    GET: "/api/articles/:article_id/comments",
    GET: "/api/articles",
    GET: "/api",
    PATCH: "/api/articles/:article_id",
    PATCH: "/api/comments/:comment_id",
    POST: "/api/articles/:article_id/comments",
    DELETE: "/api/comments/:comment_id",
  });
};

exports.handlePSQLError = (err, req, res, next) => {
  console.log(err);
  const badReqCodes = ["23502", "42605", "42703", "42803", "42P01", "23503"];
  if (badReqCodes.includes(err.code)) {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
};

exports.handleCustomError = (err, req, res, next) => {
  console.log(err);
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleInternalError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};
