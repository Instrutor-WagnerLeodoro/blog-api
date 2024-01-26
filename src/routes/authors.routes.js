const { Router } = require('express')
const AuthorsController = require('../controllers/AuthorsController')

const authorsRouter = Router()

const authorsController = new AuthorsController()

authorsRouter.post('/', authorsController.create)
authorsRouter.get('/', authorsController.listAuthors)

module.exports = authorsRouter