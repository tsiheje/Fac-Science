import React, { useState, useEffect } from "react";
import { Button, TextareaAutosize, MenuItem, TextField } from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const ModaleModifCour = ({ onClose, selectedCours }) => {
  const token = Cookies.get('token');
  const decodedToken = jwtDecode(token);
  const Id = decodedToken.Id_compte;

  const [Niveau, setNiveau] = useState('');
  const [Mention, setMention] = useState('');
  const [Parcours, setParcours] = useState('');

  const [cours, setCours] = useState({
    Libelle: '',
    Description : '',
    Niveau: '',
    Mention: '',
    Parcours: '',
    Cours: null,
    Id_Professeur: Id,
  });

  useEffect(() => {
    if (selectedCours) {
      setCours({
        Libelle: selectedCours.Libelle || '',
        Description: selectedCours.Description || '',
        Niveau: selectedCours.Niveau || '',
        Mention: selectedCours.Mention || '',
        Parcours: selectedCours.Parcours || '',
        Cours: null,
        Id_Professeur: Id,
      });

      setNiveau(selectedCours.Niveau || '');
      setMention(selectedCours.Mention || '');
      setParcours(selectedCours.Parcours || '');
    }
  }, [selectedCours, Id]);

  const displaySweetAlert = (success) => {
    if (success) {
        Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Les données ont été ajoutées avec succès!',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout des données.',
        });
    }
};
  const { Libelle, Cours, Description,niveau, mention, parcours, Date_de_publication } = selectedCours || {};
  console.log(Libelle); 
  const handleNiveauChange = (event) => {
    const { value } = event.target;
    setNiveau(value);
    setMention('');
    setParcours('');
    setCours((prevCours) => ({
      ...prevCours,
      Niveau: value,
    }));
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setCours((prevCours) => ({
      ...prevCours,
      Cours: selectedFile,
    }));
  };

  const handleMentionChange = (event) => {
    const { value } = event.target;
    setMention(value);
    setCours((prevCours) => ({
      ...prevCours,
      Mention: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCours((prevCours) => ({
      ...prevCours,
      [name]: value,
    }));
  };

  const parcoursOptions = (() => {
    if (Mention === 'PHYSIQUE ET APPLICATION' && (Niveau >= 'S7' || Niveau <= 'S10')) {
      return ['CAP', 'MET', 'EMS'];
    } else if (Mention === 'PHYSIQUE CHIMIE') {
      return ['PHYSIQUE', 'CHIMIE GENERALISTE', 'LP3E'];
    } else if (Mention === 'GSEEM') {
      return ['IEET', 'GIRE', 'ER'];
    } else if (Mention === 'SCIENCE DE LA VIE') {
      return ['BM', 'BT'];
    } else if (Mention === 'CHIMIE') {
      return ['Chimie médical', 'Géochimie', 'Vini-viticole'];
    } else if (Mention === 'PHYSIQUE ET APPLICATION') {
      return ['EA2I'];
    } else if (Mention === 'MATHEMATIQUE ET APPLICATION') {
      return ['MF', 'ME', 'MISS'];
    } else {
      return [];
    }
  })();

  const mentionOptions = Niveau !== ''
    ? Niveau >= 'S1' && Niveau <= 'S6'
      ? ['MATHEMATIQUE ET APPLICATION', 'PHYSIQUE CHIMIE', 'PHYSIQUE ET APPLICATION', 'SCIENCE DE LA VIE']
      : !['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].includes(Niveau)
      ? ['MATHEMATIQUE ET APPLICATION', 'PHYSIQUE ET APPLICATION', 'CHIMIE', 'SCIENCE DE LA VIE', 'GSEEM']
      : []
    : [];

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      const Id = decodedToken.Id_compte;
  
      const formData = new FormData();
      formData.append("Libelle", cours.Libelle);
      formData.append("Description", cours.Description);
      formData.append("Niveau", cours.Niveau);
      formData.append("Mention", cours.Mention);
      formData.append("Parcours", cours.Parcours);
      formData.append("Id_Professeur", Id);
  
      // Ajoutez la logique pour append le fichier uniquement s'il est sélectionné
      if (cours.Cours) {
        formData.append("Cours", cours.Cours);
      }
  
      try {
        const response = await axios.put(`http://localhost:4000/Professeur/cours/${selectedCours.Id_cours}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        console.log('Réponse du serveur:', response.data);
        displaySweetAlert(true);
      } catch (error) {
        console.error('Erreur:', error);
        displaySweetAlert(false);
      }
  
      onClose();
    };

  return (
    <div className="Modal">
      <div>
        <div className="fermer" onClick={onClose}>X</div>
        <div className="Titre">
          <h2>MODIFICATION D'UN COUR</h2>
        </div>
        <div className="formulaire">
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="Libelle"
              label="Libellé"
              name="Libelle"
              value={cours.Libelle}
              onChange={handleChange}
            />
            <label className={`input-file ${cours.Cours ? 'has-file' : ''}`}>
              <input
                type="file"
                name="Cours"
                onChange={handleImageChange}
              />
            </label>
            <TextareaAutosize
                minRows={5}
                maxRows={6}
                style={{ width: '100%' }}
                placeholder="Entrez la description de l'annonce"
                name="Description"
                value={cours.Description}
                onChange={handleChange}
            />
            
            <TextField
              required
              fullWidth
              id="Niveau"
              label="Niveau"
              name="Niveau"
              select
              value={Niveau}
              margin="normal"
              onChange={handleNiveauChange}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <MenuItem key={`S${i + 1}`} value={`S${i + 1}`}>
                  S{i + 1}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              fullWidth
              id="Mention"
              label="Mention"
              name="Mention"
              margin="normal"
              select
              value={Mention}
              onChange={handleMentionChange}
            >
              {mentionOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              fullWidth
              id="Parcours"
              label="Parcours"
              name="Parcours"
              margin="normal"
              select
              value={cours.Parcours}
              onChange={handleChange}
            >
              {parcoursOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Modifier  
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModaleModifCour;