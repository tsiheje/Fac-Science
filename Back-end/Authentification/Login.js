const connection = require('../Connexion/ConnexionDB');
const cors = require('cors');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.use(cors());
router.use(express.json());

router.post('/Login', async (req, res) => {
  const { Email, Mot_de_passe } = req.body;
  try {
    const query = 'SELECT * FROM Compte WHERE Email = ? AND Mot_de_passe = ?';
    connection.query(query, [Email, Mot_de_passe], (err, rows) => {
      if (err) {
        console.error('Erreur lors de la recherche de l\'utilisateur :', err);
        res.json({ error: 'Une erreur est survenue lors de la recherche de l\'utilisateur.' });
        return;
      }

      if (rows.length === 0) {
        return res.json({ error: "Misy diso" });
      }

      const user = rows[0];
      res.json(user);

    });
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la connexion' });
  }
});

router.post('/Signup', async (req, res) => {
    const { Matricul ,Nom, Prenom, Mention, Parcours, Niveau, Telephone, Email, Mot_de_passe, Roles} = req.body;
  
    const query = 'INSERT INTO Compte (Matricul, Nom, Prenom, Mention, Parcours, Niveau, Telephone, Email, Mot_de_passe, Roles) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [Matricul ,Nom, Prenom, Mention, Parcours, Niveau, Telephone, Email, Mot_de_passe, Roles], (err, result) => {
      if (err) {
        console.error('Erreur lors de la création :', err);
        res.status(500).json({ error: 'Erreur lors de la création.' });
        return;
      }
      res.json({ message: 'créé avec succès !' });
    });
  });

module.exports = router;
