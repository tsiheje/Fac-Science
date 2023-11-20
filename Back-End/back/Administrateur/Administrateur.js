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
const { send } = require('process');
  
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
    connection.query(sql, [Description, filePath, new Date(), Id_source], (err, result) => {
  if (err) {
    console.error(err);
    res.status(500).send('Erreur interne du serveur.');
  } else {
    const idAnnonce = result.insertId;
    
    const studentsId = "SELECT Id_compte FROM compte WHERE Roles = 'Etudiant'";
    connection.query(studentsId, (err, students) => {
      if (err) {
        console.error(err);
      } else {
        students.forEach(etudiant => {
          const notification = {
            ID_destinataire: etudiant.Id_compte,
            type: 'annonce',
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
  res.send('Creation de cours avec succès');
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

});

router.get('/dashbord', (req, res) => {
  const sql = "select Niveau, count(Niveau) as Total from compte where Roles = 'Etudiant' group by (Niveau)";
  connection.query(sql, (err, results) => {
    if(err) {
      console.error(err);
      res.status(500).send('Misy erreur');
      return;
    }
    res.json(results);
  })
})

router.get('/mention', (req, res) => {
  const sql = "select Mention, count(Mention) as Total from compte where Roles = 'Etudiant' group by (Mention)";
  connection.query(sql, (err, results) => {
    if(err){
      console.error(err);
      res.status(500).send('Misy erreur');
      return;
    }
    res.json(results);
  })
});

// ...

// Après avoir reçu les données du message depuis la requête POST
router.post('/message', (req, res) => {
  const { messageText, senderId, receiverId } = req.body; // Supposons que vous envoyez le texte du message, l'ID de l'expéditeur et le destinataire
  
  try {
    const sql = 'INSERT INTO messages (Texte, Id_Expediteur, Id_Destinataire, Date_Envoi) VALUES (?, ?, ?, ?)';
    connection.query(sql, [messageText, senderId, receiverId, new Date()], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur interne du serveur.');
      } else {
        // Le message a été enregistré avec succès
        res.send('Message envoyé avec succès');
        const messageId = result.insertId; // Récupérer l'ID du message inséré
        
        const notification = {
          ID_destinataire: receiverId,
          type: 'message',
          contenu: 'Vous avez reçu un nouveau message',
          Id_element: messageId, // Utilisation de l'ID du message ici
          date: new Date(),
          statut: 'non_lue'
        };

        // Insérer cette notification dans la table des notifications
        connection.query('INSERT INTO notification (Id_compte, Type, contenu, Id_element, date, statu) VALUES (?, ?, ?, ?, ?, ?)', 
          [notification.ID_destinataire, notification.type ,notification.contenu, notification.Id_element, notification.date, notification.statut],
          (err, result) => {
            if (err) {
              console.error(err);
              // Gérer l'échec de l'insertion de la notification
            } else {
              // Notification insérée avec succès
              console.log('Notification insérée pour l\'étudiant ID:', notification.ID_destinataire);
            }
          }
        );
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur.');
  }
});

// ...

module.exports = router;