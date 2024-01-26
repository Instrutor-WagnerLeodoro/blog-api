
exports.up = (knex) => {
    return knex.schema.createTable('tags', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('post_id').unsigned().index().references('id').inTable('posts');
      })
};


exports.down = (knex) => {
    return knex.schema.dropTableIfExists('tags')
};
