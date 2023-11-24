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
  const sql = "SELECT compte.Nom,compte.Prenom, annonce.Annonce, annonce.Description, annonce.Date_de_publication FROM compte JOIN annonce ON compte.Id_compte = annonce.Id_source order by Date_de_publication desc";
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
  const sql = "select compte.Prenom, Cours, Libelle, Description, Date_de_creation FROM compte JOIN cours ON compte.Id_compte = cours.Id_Professeur where cours.Niveau = ? and cours.Mention = ? and cours.Parcours = ? order by Date_de_creation desc";
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
  const sql = "select compte.Prenom,Id_devoirs, Devoirs, Libelle, Description, Date_de_devoirs, Date_de_soumise FROM compte JOIN devoirs ON compte.Id_compte = devoirs.Id_Professeur where devoirs.Niveau = ? and devoirs.Mention = ? and devoirs.Parcours = ? order by Date_de_devoirs DESC";
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
  const sql = "select * from notification where Id_compte = ? order by Date Desc";
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

router.post('/soumettre', upload.single('Devoirs') ,(req, res) => {
  const {Id_Etudiant, Id_devoirs }= req.body;
  const Soumettre = req.file;
  console.log(Soumettre);
  const filepath = Soumettre.filename;
  try{
    const sql = 'insert into soumettre (Id_devoirs, Id_Etudiants, Devoirs, Date_de_soumission) values (?, ?, ?, ?)';
    connection.query(sql, [Id_devoirs, Id_Etudiant, filepath, new Date()], (err, results) => {
      if(err){
        console.error(err);
        res.status(500).send("misy erreur");
        return;
      }
      res.json(results);
    })
  }catch(error){
    console.error(error);
    res.status(500).send("erreur interne du serveur");
  }
})
module.exports = router;