const { Router } = require('express')

const usersRoutes = require('./users.routes')
const postsRoutes = require('./posts.routes')
const tagsRoutes = require('./tags.routes')
const authorsRoutes = require('./authors.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/notes', postsRoutes)
routes.use('/tags', tagsRoutes)
routes.use('/authors', authorsRoutes)

module.exports = routes
