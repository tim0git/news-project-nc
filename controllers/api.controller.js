exports.sendRoutes = (req, res, next) => {
    res.status(200).send({
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