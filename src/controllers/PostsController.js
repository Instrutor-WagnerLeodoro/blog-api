const knex = require('../database/knex')

class PostsController {
  async create(req, res) {
    const { title, content, tags } = req.body
    const { author_id } = req.params

    const [post_id] = await knex('posts').insert({
      title,
      content,
      author_id,
    })

    const tagsInsert = tags.map((name) => {
      return {
        post_id,
        name,
      }
    })

    await knex('tags').insert(tagsInsert)

    res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const post = await knex('posts').where({ id }).first()
    const tags = await knex('tags').where({ post_id: id }).orderBy('name')
      .where({ post_id: id })
      .orderBy('created_at')

    return res.json({
      ...post,
      tags,
    })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('posts').where({ id }).delete()

    return res.json()
  }

  async index(req, res) {
    const { author_id, title, tags } = req.query

    let posts

    if (tags) {
      const filterTags = tags.split(',').map((tag) => tag.trim())

      posts = await knex('tags')
        .select(['posts.id', 'posts.title', 'posts.author_id'])
        .where('posts.author_id', author_id)
        .whereLike('posts.title', `%${title}%`)
        .whereIn('name', filterTags)
        .innerJoin('posts', 'posts.id', 'tags.post_id')
        .orderBy('posts.title')
    } else {
      posts = await knex('posts')
        .where({ author_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title')
    }

    const postTags = await knex('tags').where({ post_id })

    const postsWithTags = posts.map((post) => {
      const listTags = postTags.filter((tag) => tag.post_id === post.id)
      return {
        ...post,
        tags: listTags,
      }
    })
    return res.json(postsWithTags)
  }
}

module.exports = PostsController
