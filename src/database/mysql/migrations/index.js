const { conn } = require('../..')
const createUsers = require('./createUsers')

async function migrationRun() {
  const schemas = [createUsers].join('')
  
  const tableName = `users`;

  const verifyIfTableExists = `SHOW TABLES LIKE '${tableName}'`

  conn.execute(verifyIfTableExists, (err, results) => {
    if(err) {
      console.error('Erro ao verificar a existência da tabela', err)
      conn.end()
      return;
    }
    if(results.length === 0) {
      conn.execute(schemas, (err) => {
        if(err) {
          console.error('Erro ao criar a tabela', err)
        } else {
          console.log('Tabela criada com sucesso!');
        }
        conn.end()
      })
    }
  })
}

module.exports = migrationRun
