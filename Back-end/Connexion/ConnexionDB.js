const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Fac_Science'
});

connection.connect((err) => {
  if (err) {
    console.log('Erreur de connexion à MySQL :', err);
    throw err;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = connection;