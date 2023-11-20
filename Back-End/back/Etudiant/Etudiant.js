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
        return;
      }
      res.json(results);
    })
  });

router.get('/professeur', (req, res) => {
  const sql = "select * from compte where Roles = 'Professeur' ";
  connection.query(sql, (err, results) => {
    if(err){
      console.error(err);
      return;
    }
    res.json(results);
  })
})

router.get('/cours/:Niveau/:Mention/:Parcours', (req, res) => {
  const {Niveau, Mention, Parcours} = req.params;
  const sql = "select * from cours where Niveau = ? and Mention = ? and Parcours = ?";
  connection.query(sql, [Niveau, Mention, Parcours], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

router.get('/devoirs/:Niveau/:Mention/:Parcours', (req, res) => {
  const {Niveau, Mention, Parcours} = req.params;
  const sql = "select * from devoirs where Niveau = ? and Mention = ? and Parcours = ?";
  connection.query(sql, [Niveau, Mention, Parcours], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

router.get('/notification/:Id_compte', (req, res) => {
  const {Id_compte} = req.params;
  const sql = "select * from notification where Id_compte = ?";
  connection.query(sql, [Id_compte], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  })
});

router.get('/notification/:Id_compte/:filtre', (req, res) => {
  const {Id_compte, filtre} = req.params;
  const sql = "select * from notification where Id_compte = ? and Type = ?";
  connection.query(sql, [Id_compte, filtre], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  })
});

router.get('/totaldevoirs/:Niveau/:Mention/:Parcours', (req, res) => {
  const {Niveau, Mention, Parcours} = req.params;
  const sql = "select count(Devoirs)as Total from devoirs where Niveau = ? and Mention = ? and Parcours = ?";
  connection.query(sql, [Niveau, Mention, Parcours], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

router.get('/totalcours/:Niveau/:Mention/:Parcours', (req, res) => {
  const {Niveau, Mention, Parcours} = req.params;
  const sql = "select count(Cours) as Total from cours where Niveau = ? and Mention = ? and Parcours = ?";
  connection.query(sql, [Niveau, Mention, Parcours], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

module.exports = router;