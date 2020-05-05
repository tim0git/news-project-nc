const apiRouter = require("express").Router();
const topicsRouter = require('./topics.router')
const usersRouter = require('./users.router')
const articlesRouter = require('./articles.router')
const commentsRouter =require('./comments.router')

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/users', usersRouter) //GET /api/users/:username
apiRouter.use('/articles', articlesRouter) //GET /api/articles/:article_id
apiRouter.use('/comments', commentsRouter) // PATCH /api/comments/:comment_id



module.exports = apiRouter;