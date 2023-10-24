const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

// Importez vos routes ici
const authRoutes = require('./Authentification/Authentification');
const adminRoutes = require('./Administrateur/Administrateur');
const etudiantRoutes = require('./Etudiant/Etudiant');
const professeurRoutes = require('./Professeur/Professeur');
const messageRoutes = require('./Message/Message');

// Utilisez le middleware Cors pour gérer les requêtes CORS
app.use(cors());

// Route racine
app.get('/', (req, res) => {
  res.send('Bonjour à tous !');
});


app.use('/Authentification', authRoutes);
app.use('/Administrateur', adminRoutes);
app.use('/Etudiant', etudiantRoutes);
app.use('/Professeur', professeurRoutes);
app.use('/Message', messageRoutes);


app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
