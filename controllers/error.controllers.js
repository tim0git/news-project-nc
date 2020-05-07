exports.send404 = (req, res, next) => {
  res.status(404).send({
    availableRoutes: {
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
    },
  });
};

exports.handle405 = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};

exports.handlePSQLError = (err, req, res, next) => {
  const codes = {
    "23502": { status: 400, message: "bad request" }, // not_null violation
    "23503": { status: 404, message: "resource not found" }, // 23503 Key (author)=(lurke) is not present in table "users"
    "22P02": { status: 400, message: "bad request" }, // invalid_text_representation
    "42601": { status: 400, message: "bad request" }, // syntax error
    "42703": { status: 400, message: "bad request" }, /// undefined column
    "42P01": { status: 400, message: "bad request" }, // query uses the incorrect schema name
    "42P02": { status: 400, message: "bad request" }, // undefined parameter
  };
  if (err.code in codes) {
    const { status, message } = codes[err.code];
    res.status(status).send({ message });
  } else {
    next(err);
  }
};

exports.handleCustomError = (err, req, res, next) => {
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
