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

router.get('/annonce/:Id_source', (req, res) => {
  const Id_source = req.params.Id_source;
  const sql = 'select * from annonce where Id_source = ?';
  connection.query(sql, [Id_source], (err, results) => {
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
      if(err){
        console.error(err);
        res.status(500).send('Erreur interne du serveur')
      }else{
        const idAnnonce = result.insertId;

        const studentsId = "select Id_compte from compte where Roles = 'Etudiant' ";
        connection.query(studentsId, (err, students) => {
          if(err){
            console.error(err);
          }else{
            console.log(students);
            students.forEach(etudiant => {
              const notification = {
                ID_destinataire: etudiant.Id_compte,
                type: 'Annonce',
                contenu: 'Une nouvelle annonce a été publiée',
                Id_element: idAnnonce,
                date: new Date(),
                statut: 'non_lue'
              };

              connection.query('INSERT INTO notification (Id_compte, Type, contenu, Id_element, date, statu) VALUES (?, ?, ?, ?, ?, ?)', 
              [notification.ID_destinataire, notification.type ,notification.contenu, notification.Id_element, notification.date, notification.statut],
              (err, result) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log('Notification insérée pour l\'étudiant ID:', notification.ID_destinataire);
                }
              }
            );
          });
        }
      });
    }
  });
    res.send('Fichier uploadé avec succès');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur.');
  }
});

router.post('/cours', upload.single('Cours'), (req,res) => {
  const {Libelle,Description, Niveau, Mention, Parcours, Id_Professeur} = req.body;
  const Cours = req.file;

  const filePath = Cours.filename;

  try{
    const sql = 'INSERT INTO cours (Libelle, Description, Niveau, Mention, Parcours, Cours, Date_de_creation, Id_Professeur) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [Libelle, Description, Niveau, Mention, Parcours, filePath, new Date(), Id_Professeur], (err, results) => {
      if(err){
        console.error(err);
      }else{
          const Idcours = results.insertId;
          const studentsId = "select Id_compte from compte where Niveau = ? and Mention = ? and Parcours = ? ";
          connection.query(studentsId, [Niveau, Mention, Parcours], (res, students) => {
            if(err){
              console.error(err);
            }else{
              console.log(students);
             students.forEach(etudiant => {
              const notification = {
                ID_destinataire: etudiant.Id_compte,
                type: 'Cours',
                contenu: 'Un nouvau cour a été publiée',
                Id_element: Idcours,
                date: new Date(),
                statut: 'non_lue'
              };

              connection.query('insert into notification (Id_compte, Type, contenu, Id_element, date, statu) values (?, ?, ?, ?, ?, ?)',
              [notification.ID_destinataire, notification.type ,notification.contenu, notification.Id_element, notification.date, notification.statut],
              (err, result) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log('Notification insérée pour l\'étudiant ID:', notification.ID_destinataire);
                }
              }
              );
            })
          }
        })
      }
    });
    res.send('Creation de cours avec succès');
  }catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur.');
  }
});

router.post('/devoirs', upload.single('Devoirs'), (req,res) => {
  const {Libelle, Description, Niveau, Mention, Parcours, Date_de_soumise, Id_Professeur} = req.body;
  const Devoirs = req.file;
  console.log(Date_de_soumise);
  const filePath = Devoirs.filename;

  try{
    const sql = 'INSERT INTO devoirs (Libelle, Description, Niveau, Mention, Parcours, Devoirs, Date_de_devoirs, Date_de_soumise, Id_Professeur) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [Libelle, Description, Niveau, Mention, Parcours, filePath, new Date(), Date_de_soumise , Id_Professeur], (err, results) => {
      if(err){
        console.error(err);
      }else{
        const IdDevoir = results.insertId;
        const studentsId = "select Id_compte from compte where Niveau = ? and Mention = ? and Parcours = ? ";
        connection.query(studentsId, [Niveau, Mention, Parcours], (res, students) => {
          if(err){
            console.error(err);
          }else{
            console.log(students);
           students.forEach(etudiant => {
            const notification = {
              ID_destinataire: etudiant.Id_compte,
              type: 'Devoirs',
              contenu: 'Un nouvau devoir a été publiée',
              Id_element: IdDevoir,
              date: new Date(),
              statut: 'non_lue'
            };

            connection.query('insert into notification (Id_compte, Type, contenu, Id_element, date, statu) values (?, ?, ?, ?, ?, ?)',
            [notification.ID_destinataire, notification.type ,notification.contenu, notification.Id_element, notification.date, notification.statut],
            (err, result) => {
              if (err) {
                console.error(err);
              } else {
                console.log('Notification insérée pour l\'étudiant ID:', notification.ID_destinataire);
              }
            }
            );
          })
        }
      })
    }

    });

    res.send('Creation de cours avec succès');
  }catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur.');
  }
});

router.put('/cours/:id', upload.single('Cours'), async (req, res) => {
  try {
    const { id } = req.params;
    const { Libelle, Description, Niveau, Mention, Parcours, Id_Professeur } = req.body;

    // Si un nouveau fichier a été téléchargé, récupérez le nom du fichier
    const newCoursFileName = req.file ? req.file.filename : null;

    // Construisez la requête SQL en fonction de la présence d'un nouveau fichier
    let sqlQuery;
    let sqlParams;

    if (newCoursFileName) {
      sqlQuery = 'UPDATE cours SET Libelle=?, Description=?, Niveau=?, Mention=?, Parcours=?, Cours=?, Id_Professeur=? WHERE Id_cours=?';
      sqlParams = [Libelle, Description, Niveau, Mention, Parcours, newCoursFileName, Id_Professeur, id];
    } else {
      sqlQuery = 'UPDATE cours SET Libelle=?, Description=?, Niveau=?, Mention=?, Parcours=?, Id_Professeur=? WHERE Id_cours=?';
      sqlParams = [Libelle, Description, Niveau, Mention, Parcours, Id_Professeur, id];
    }

    // Exécutez la requête SQL
    connection.query(sqlQuery, sqlParams, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du cours' });
      } else {
        res.json({ message: 'Cours mis à jour avec succès' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du cours' });
  }
});

router.put('/devoirs/:id', upload.single('Devoirs'), async (req, res) => {
  try {
    const { id } = req.params;
    const { Libelle, Description, Niveau, Mention, Parcours, Id_Professeur, Date_de_soumise } = req.body;

    // Si un nouveau fichier a été téléchargé, récupérez le nom du fichier
    const newCoursFileName = req.file ? req.file.filename : null;

    // Construisez la requête SQL en fonction de la présence d'un nouveau fichier
    let sqlQuery;
    let sqlParams;
    console.log('ato izao')
    if (newCoursFileName) {
      sqlQuery = 'UPDATE devoirs SET Libelle=?, Description=?, Niveau=?, Mention=?, Parcours=?, Devoirs=?, Date_de_soumise=? WHERE Id_devoirs=?';
      sqlParams = [Libelle, Description, Niveau, Mention, Parcours, newCoursFileName, Date_de_soumise, id];
    } else {
      sqlQuery = 'UPDATE devoirs SET Libelle=?, Description=?, Niveau=?, Mention=?, Parcours=?, Date_de_soumise=? WHERE Id_devoirs=?';
      sqlParams = [Libelle, Description, Niveau, Mention, Parcours, Date_de_soumise, id];
    }

    // Exécutez la requête SQL
    connection.query(sqlQuery, sqlParams, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du cours' });
      } else {
        res.json({ message: 'Cours mis à jour avec succès' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du cours' });
  }
});
router.get('/cours/:Id_Professeur', (req, res) => {
  const Id_Professeur = req.params.Id_Professeur;
  const sql = 'SELECT * FROM cours WHERE Id_Professeur = ?';
  connection.query(sql, [Id_Professeur], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});


router.get('/devoirs/:Id_Professeur', (req, res) => {
  const Id_Professeur = req.params.Id_Professeur;
  const sql = "select * from devoirs where Id_professeur = ?";
  connection.query(sql, [Id_Professeur], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

router.delete('/cours/:Id_cours', (req, res) => {
  const { Id_cours } = req.params;

  const sql = 'DELETE FROM cours WHERE Id_cours = ?';

  connection.query(sql, [Id_cours], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la suppression du cour' });
    } else {
      if (result.affectedRows > 0) {
        res.json({ message: 'Cour supprimé avec succès' });
      } else {
        res.status(404).json({ message: 'Cour non trouvé' });
      }
    }
  });
});

router.delete('/devoirs/:Id_devoirs', (req, res) => {
  const { Id_devoirs } = req.params;

  const sql = 'DELETE FROM devoirs WHERE Id_devoirs = ?';

  connection.query(sql, [Id_devoirs], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la suppression du devoir' });
    } else {
      if (result.affectedRows > 0) {
        res.json({ message: 'Devoir supprimé avec succès' });
      } else {
        res.status(404).json({ message: 'Devoir non trouvé' });
      }
    }
  });
});

router.delete('/annonce/:Id_annonce', (req, res) => {
  const { Id_devoirs } = req.params;

  const sql = 'DELETE FROM annonce WHERE Id_Annonce = ?';

  connection.query(sql, [Id_devoirs], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la suppression d\' Annonce' });
    } else {
      if (result.affectedRows > 0) {
        res.json({ message: 'Annonce supprimé avec succès' });
      } else {
        res.status(404).json({ message: 'Annonce non trouvé' });
      }
    }
  });
});
module.exports = router;