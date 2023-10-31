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

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const fs = require('fs');
  
  const uploadDirectory = './uploads';
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
  }
  
const upload = multer({ storage: storage });

router.get('/annonce', (req, res) => {
  const sql = 'select * from annonce';
  connection.query(sql, (err, results) => {
    if(err){
      console.error(err);
      res.status(500).send("misy erreur");
      return;
    }
    res.json(results);
  })
})

router.post('/annonce',upload.single('Annonce'), (req, res) => {
  const { Description, Id_source } = req.body;
  const Annonce = req.file;
  console.log(Description);
  console.log(Annonce);

  const filePath = Annonce.filename;
  
  try {
    const sql = 'INSERT INTO annonce (Description,Annonce, date_de_publication, Id_source) VALUES ( ?, ?, ?, ?)';
    connection.query(sql, [ Description, filePath, new Date(), Id_source ], (err, result) => {
      if (err) throw err;
      console.log('Fichier enregistré dans la base de données');
    });

    res.send('Fichier uploadé avec succès');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur.');
  }
});

router.post('/cours', upload.single('Cours'), (req,res) => {
  const {Libelle, Niveau, Mention, Parcours, Id_Professeur} = req.body;
  const Cours = req.file;

  const filePath = Cours.filename;

  try{
    const sql = 'INSERT INTO cours (Libelle, Niveau, Mention, Parcours, Date_de_creation, Id_Professeur) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [Libelle, Niveau, Mention, Parcours, filePath, new Date(), Id_Professeur], (err, results) => {
      if(err) throw err;

    });

    res.send('Creation de cours avec succès');
  }catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur.');
  }
});

router.get('/cours', (req, res) => {
  const Id_Professeur = req.body;
  const sql = 'select * from cours where Id_Professeur = ?';
  connection.query(sql, [Id_Professeur], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Misy erreur.');
      return;
    }

    res.json(results);
  })
});

router.post('/devoirs', upload.single('Devoirs'), (req,res) => {
  const {Libelle, Niveau, Mention, Parcours, Id_Professeur} = req.body;
  const Cours = req.file;

  const filePath = Cours.filename;

  try{
    const sql = 'INSERT INTO cours (Libelle, Niveau, Mention, Parcours, Date_de_creation, Id_Professeur) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [Libelle, Niveau, Mention, Parcours, filePath, new Date(), Id_Professeur], (err, results) => {
      if(err) throw err;

    });

    res.send('Creation de cours avec succès');
  }catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur.');
  }
});
module.exports = router;