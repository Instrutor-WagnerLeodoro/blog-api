
exports.up = (knex) => {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.integer('author_id').unsigned().index().references('id').inTable('authors');
    table.string('title').notNullable();
    table.string('content').notNullable();
  })
};


exports.down = (knex) => {
    return knex.schema.dropTableIfExists('posts')
};
