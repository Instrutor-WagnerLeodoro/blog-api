const { Router } = require('express')
const PostsController = require('../controllers/PostsController')

const postsRouter = Router()

const postsController = new PostsController()

postsRouter.get('/', postsController.index)
postsRouter.post('/:user_id', postsController.create)
postsRouter.get('/:id', postsController.show)
postsRouter.delete('/:id', postsController.delete)

module.exports = postsRouter
