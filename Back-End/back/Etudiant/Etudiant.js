const connection = require('../Connexion/Connexion');
const cors = require('cors');
const express = require('express');
const router = express.Router();
const multer = require('multer');


router.use(cors());
router.use(express.json());

router.get('/', (req, res) => {
    res.send('Bonjorour')
  });

router.get('/annonce', (req, res) => {
    const sql = "select * from annonce";
    connection.query(sql, (err, results) => {
      if(err){
        console.error(err);
        res.status(500).send("misy erreur");
        return;
      }
      res.json(results);
    })
  });

router.get('/cours', (req, res) => {
  const {Niveau, Mention , Parcours} = req.params.body;
  const sql = "select * from cours where Niveau = ? and Mention = ? and Parcours = ?";
  connection.query(sql, [Niveau, Mention, Parcours], (err, results) => {
    if(err) throw err
  });
  res.json(results);
});

router.get('/devoirs', (req, res) => {
  const {Niveau, Mention , Parcours} = req.params.body;
  const sql = "select * from devoirs where Niveau = ? and Mention = ? and Parcours = ?";
  connection.query(sql, [Niveau, Mention, Parcours], (err, results) => {
    if(err) throw err
  });
  res.json(results);
});

module.exports = router;