var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'apiusers' //nome do nosso banco de dados
    }
  });

module.exports = knex