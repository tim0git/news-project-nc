exports.send404 = (req, res, next) => {
  res.status(404).send({ msg: "resource not found" });
};

exports.handlePSQLError = (err, req, res, next) => {
  console.log(err);
  const badReqCodes = ["23502", "42605", "42703", "42803"];
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
