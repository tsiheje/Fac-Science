const connection = require('../Connexion/Connexion');
const cors = require('cors');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cle = "MON_CLE_SECRET_TOKEN";

router.use(cors());
router.use(express.json());

function generateAccessToken(user){
  return jwt.sign(user, cle,{expiresIn: '1800s'})
}

router.get('/check_email', (req, res) => {
  const { Email } = req.query; // Utilisez req.query pour récupérer les paramètres GET
  const sql = "SELECT * FROM compte WHERE Email = ?";
  connection.query(sql, [Email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la recherche de l\'utilisateur :', err);
      res.json({ error: 'Une erreur est survenue lors de la recherche de l\'utilisateur.' });
      return;
    }
    res.json(results);
  });
});

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
  
          const accessToken = generateAccessToken(user);
          res.send(JSON.stringify(accessToken));
  
        } else {
          
          res.status(401).json({ error: 'Mot de passe incorrect.' });
        }
      });
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la connexion' });
    }
});

function authentificationToken(req, res, next) {
  const autheader = req.headers['authorization'];
  const token = autheader && autheader.split(' ')[1];

  if(!token){
      return res.sendStatus(402);
  }

  console.log(token);

  jwt.verify(token, cle, (err, user) => {
      if(err){
          return res.sendStatus(405);
      }
      req.user = user;
      next();
  });
};

router.get('/me',authentificationToken, (req, res) => {
  res.send(req.user);
  console.log(req.user);
});

router.post('/signup_professeur', async (req, res) => {
  const { Nom, Prenom, Email, Telephone, Mot_de_passe, Roles } = req.body;
  try {
    // Cryptez le mot de passe
    const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);

    const sql = "INSERT INTO compte(Nom, Prenom, Email, Telephone, Mot_de_passe, Roles) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql, [Nom, Prenom, Email, Telephone, hashedPassword,Roles], (err, results) => {
      if (err) {
        console.error('Erreur lors de la création du compte professeur :', err);
        res.json({ error: 'Une erreur est survenue lors de la création du compte.' });
        return;
      }
      res.json({ message: 'Compte professeur créé avec succès.' });
    });
  } catch (error) {
    console.error('Erreur lors de la création du compte', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la création du compte.' });
  }
});

router.post('/signup', async (req, res) => {
  const {Nom, Prenom, Matricul, Niveau, Mention, Parcours, Email, Telephone, Mot_de_passe, Roles} = req.body;
  try{
      const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);
      const sql = "INSERT INTO compte(Nom, Prenom, Matricul, Niveau, Mention, Parcours, Email, Telephone, Mot_de_passe, Roles) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      connection.query(sql, [Nom, Prenom, Matricul, Niveau, Mention, Parcours, Email, Telephone, hashedPassword, Roles], (err, results) => {
        if(err) {
          console.error('Erreurlors de la creation du compte Etudiant');
          res.json({ error: 'Une erreur est survenue lors de la création du compte.' });
          return;
        }
        res.json({ message: 'Compte Etudiant créé avec succès.' });
      })
  }catch(error){
    console.error('Erreur lors de la création du compte', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la création du compte.' });
  }
})

module.exports = router;