const knex = require('../database/knex')

class AuthorsController {
  async create(req, res) {
    const { name, lastname } = req.body

    await knex('authors').insert({
        name,
        lastname}
    )
    return res.json()
  }

  async listAuthors(req, res) {
    const authors = await knex('authors')
    .select('lastname', 'name')
    .orderBy('lastname')

    res.json(authors)
  }
}

module.exports = AuthorsController
