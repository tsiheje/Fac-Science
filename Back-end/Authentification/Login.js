const connection = require('../Connexion/ConnexionDB');
const cors = require('cors');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.use(cors());
router.use(express.json());

router.get('/login', (req, res) => {
  res.send('authentificationGFGFGFG');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const query = 'SELECT * FROM Compte where Email = $1';
    const { rows } = await connection.query(query, [email]);
    
    if (rows.length === 0) {
      return res.status(401).json({ error: "L'utilisateur n'existe pas" });

    }

    const user = rows[0];

    const isValidPassword = await (password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, 'votre_clé_secrète', {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la connexion' });
  }
});

router.post('/Signup', async (req, res) => {
    const { Matricul ,Nom, Prenom, Mention, Parcours, Niveau, Telephone, Email, Mot_de_passe,  Image} = req.body;
  
    const query = 'INSERT INTO Compte (Matricul, Nom, Prenom, Mention, Parcours, Niveau, Telephone, Email, Mot_de_passe, Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
    connection.query(query, [Matricul ,Nom, Prenom, Mention, Parcours, Niveau, Telephone, Email, Mot_de_passe,  Image], (err, result) => {
      if (err) {
        console.error('Erreur lors de la création :', err);
        res.status(500).json({ error: 'Erreur lors de la création.' });
        return;
      }
      res.json({ message: 'créé avec succès !' });
    });
  });

module.exports = router;
