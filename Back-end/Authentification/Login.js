const connection = require('../Connexion/ConnexionDB');
const cors = require('cors');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.use(cors());
router.use(express.json());

router.post('/Login', async (req, res) => {
  const { Email, Mot_de_passe } = req.body;
  try {
    const query = 'SELECT * FROM Compte WHERE Email = ?';
    connection.query(query, [Email], async (err, rows) => {
      if (err) {
        console.error('Erreur lors de la recherche de l\'utilisateur :', err);
        res.json({ error: 'Une erreur est survenue lors de la recherche de l\'utilisateur.' });
        return;
      }
      console.log(rows);
      if (rows.length === 0) {
        res.status(404).json({ error: 'Utilisateur non trouvé.' });
        return;
      }
      const user = rows[0];
      const match = await bcrypt.compare(Mot_de_passe, user.Mot_de_passe);
      if (match) {
        const token = jwt.sign({ userId: user.id, email: user.Email }, 'votre_secret_key_secrete');
        res.json({ user, token });
      } else {
        res.status(401).json({ error: 'Mot de passe incorrect.' });
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la connexion' });
  }
});

router.get('/CheckEmail/:email', (req, res) => {
  const email = req.params.email;

  const query = 'SELECT COUNT(*) AS count FROM Compte WHERE Email = ?';
  connection.query(query, [email], (err, result) => {
    if (err) {
      console.error('Erreur lors de la vérification de l\'e-mail :', err);
      res.status(500).json({ error: 'Erreur lors de la vérification de l\'e-mail.' });
      return;
    }

    const emailExists = result[0].count > 0;

    res.json({ exists: emailExists });
  });
});


router.post('/SignupProfesseur', async (req, res) => {
  const {Nom,Prenom, Email, Telephone, Mot_de_passe, Roles} = req.body;

  try{
    const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);
    const query = 'INSERT INTO Compte (Nom, Prenom, Email, Telephone, Mot_de_passe, Roles)values (?, ?, ?, ?, ?, ?)';
    connection.query(query, [Nom, Prenom, Email, Telephone, hashedPassword, Roles], (err, result) => {
      if(err){
        console.error('Erreur lors de la creation :', err);
        res.status(401).json({error: 'Erreur lors de la creation'});
        return;
      }
      res.json({ message: 'Cree avec succes !'});
    });
  }catch(error) {
    console.error('Erreur lors de la création', error);
    res.status(500).json({ error: 'Erreur lors de la création.' });
  }
})

router.post('/Signup', async (req, res) => {
  const { Matricul ,Nom, Prenom, Mention, Parcours, Niveau, Telephone, Email, Mot_de_passe, Roles } = req.body;

  try {
    
    const hashedPassword = await bcrypt.hash(Mot_de_passe, 10); 

    const query = 'INSERT INTO Compte (Matricul, Nom, Prenom, Mention, Parcours, Niveau, Telephone, Email, Mot_de_passe, Roles) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [Matricul, Nom, Prenom, Mention, Parcours, Niveau, Telephone, Email, hashedPassword, Roles], (err, result) => {
      if (err) {
        console.error('Erreur lors de la création :', err);
        res.status(500).json({ error: 'Erreur lors de la création.' });
        return;
      }
      res.json({ message: 'Créé avec succès !' });
    });
  } catch (error) {
    console.error('Erreur lors de la création', error);
    res.status(500).json({ error: 'Erreur lors de la création.' });
  }
});

module.exports = router;
