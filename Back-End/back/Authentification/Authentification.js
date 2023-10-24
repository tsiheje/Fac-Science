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

router.post('/signup', (req, res) => {
  
})

module.exports = router;