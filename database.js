const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./user_database.db');

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)');
});

function saveUserToDatabase(userName, password, callback) {
  db.run('INSERT INTO users (name, password) VALUES (?, ?)', [userName, password], function (err) {
    if (err) {
      console.error('Error saving user:', err.message);
      callback(err); // Se ocorrer um erro, chamamos o callback com o erro
    } else {
      console.log('User saved to database:', userName);
      callback(null); // Se tudo estiver bem, chamamos o callback sem nenhum erro
    }
  });
}

function findUserInDatabase(userName, password, callback) {
  db.get('SELECT * FROM users WHERE name = ? AND password = ?', [userName, password], callback);
}

module.exports = { saveUser: saveUserToDatabase, findUser: findUserInDatabase };
