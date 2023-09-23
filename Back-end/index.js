const connection = require('./Connexion/ConnexionDB');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 4000;

const authRoutes = require('./Authentification/Login');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Bonjour tous!!!!');
});


app.use('/Authentification', authRoutes);


app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
