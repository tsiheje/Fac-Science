const connection = require('../Connexion/Connexion');
const cors = require('cors');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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

router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// router.get('/test-upload', (req, res) => {
//   res.sendFile(path.join(__dirname, '../uploads', 'logoENI.png')); // Remplacez 'test.txt' par le nom d'un fichier réel
// });

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

router.delete('/delete:Id_Annonce', (req, res) => {
  const Id_Annonce = req.params.Id_Annonce;
  try{
      const sql = 'DELETE FROM annonce WHERE Id_Annonce = ?';
      connection.query(sql, [Id_Annonce], (err, results) => {
        if (err) throw err;
        console.log('Suppression des fichier avec succes');
        res.send('Fichier Supprimer avec succès');
    });
  }catch(error){
    console.error(error);
    res.status(500).send('Erreur interne du serveur.');
  }
})

router.get('/etudiants', (req, res) => {
  const sql = "select * from compte where Roles = 'Etudiant' ";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Misy erreur.');
      return;
    }

    res.json(results);
  })
});

router.get('/professeurs', (req, res) => {
  const sql = "select * from compte where Roles = 'Professeur' ";
  connection.query(sql, (err, results) => {
    if(err) {
      console.error(err);
      res.status(500).send('Misy erreur');
      return;
    }

    res.json(results);
  })
})

router.delete('/supprimer:Id_compte', (req, res) => {
  const Id = req.params.Id_compte;
  try{
    const sql = 'delete from compte where Id_compte = ?';
    connection.query(sql, [Id], (err, results) => {
      if (err) throw err;
        console.log('Suppression des fichier avec succes');
        res.send('Fichier Supprimer avec succès');
    })

  }catch(error){
    console.error(error);
    res.status(500).send('Erreur interne du serveur.');
  }

})
module.exports = router;