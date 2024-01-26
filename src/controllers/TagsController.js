const knex = require('../database/knex')

class TagsController {
  async listTagsByPostId(req, res) {
    const { post_id } = req.params

    const tags = await knex('tags').where({ post_id })

    return res.json(tags)
  }
}

module.exports = TagsController
