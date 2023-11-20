import React, { useState, useEffect } from "react";
import { Button, TextareaAutosize, MenuItem, TextField } from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const ModaleModifDevoir = ({ onClose, selectedDevoir }) => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const Id = decodedToken.Id_compte;
  
    const [Niveau, setNiveau] = useState('');
    const [Mention, setMention] = useState('');
    const [Parcours, setParcours] = useState('');
    const [devoirs, setDevoirs] = useState({
      Libelle: '',
      Devoirs: null,
      Description: '',
      Niveau: '',
      Mention: '',
      Parcours: '',
      Date_de_soumise: '',
      Id_Professeur: Id,
    });
  
    useEffect(() => {
      if (selectedDevoir) {
        setDevoirs({
          Libelle: selectedDevoir.Libelle || '',
          Description: selectedDevoir.Description || '',
          Niveau: selectedDevoir.Niveau || '',
          Mention: selectedDevoir.Mention || '',
          Parcours: selectedDevoir.Parcours || '',
          Date_de_soumise: selectedDevoir.Date_de_soumise.split('T')[0] || '',
          Devoirs: null,
          Id_Professeur: Id,
        });
        console.log(Date_de_soumise);

        setNiveau(selectedDevoir.Niveau || '');
        setMention(selectedDevoir.Mention || '');
        setParcours(selectedDevoir.Parcours || '');
      }
    }, [selectedDevoir, Id]);
  
    const displaySweetAlert = (success) => {
      if (success) {
          Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Les données ont été modifier avec succès!',
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression des données.',
          });
      }
  };
    const handleNiveauChange = (event) => {
      const { value } = event.target;
      setNiveau(value);
      setDevoirs((prevDevoirs) => ({
        ...prevDevoirs,
        Niveau: value,
      }));
    };
  
    const handleImageChange = (event) => {
      const selectedFile = event.target.files[0];
      setDevoirs((prevDevoirs) => ({
        ...prevDevoirs,
        Devoirs: selectedFile,
      }));
    };
  
    const handleMentionChange = (event) => {
      const { value } = event.target;
      setMention(value);
      setParcours('');
      setDevoirs((prevDevoirs) => ({
        ...prevDevoirs,
        Mention: value,
      }));
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setDevoirs((prevDevoirs) => ({
        ...prevDevoirs,
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
  
    const { Libelle, Devoirs, Description,niveau, mention, parcours, Date_de_soumise } = selectedDevoir || {};

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("Devoirs", devoirs.Devoirs);
      formData.append("Libelle", devoirs.Libelle);
      formData.append("Description", devoirs.Description);
      formData.append("Niveau", devoirs.Niveau);
      formData.append("Mention", devoirs.Mention);
      formData.append("Parcours", devoirs.Parcours);
      formData.append("Date_de_soumise", devoirs.Date_de_soumise);
      formData.append("Id_Professeur", devoirs.Id_Professeur);
  
      try {
        const response = await axios.put(`http://localhost:4000/Professeur/devoirs/${selectedDevoir.Id_devoirs}`, formData, {
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
            <h2>MODIFICATION D'UN DEVOIR</h2>
          </div>
          <div className="formulaire">
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                id="Libelle"
                label="Libellé"
                name="Libelle"
                value={devoirs.Libelle}
                onChange={handleChange}
              />
              <label className={`input-file ${devoirs.devoirs ? 'has-file' : ''}`}>
                <input
                  type="file"
                  name="Devoirs"
                  onChange={handleImageChange}
                />
              </label>
              <TextareaAutosize
                  minRows={5}
                  maxRows={6}
                  style={{ width: '100%' }}
                  placeholder="Entrez la description de l'annonce"
                  name="Description"
                  value={devoirs.Description}
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
                value={devoirs.Parcours}
                onChange={handleChange}
              >
                {parcoursOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField 
                required
                fullWidth
                id="date"
                label="date fin de remise"  
                name="Date_de_soumise"
                margin="normal"
                type="date"
                value={devoirs.Date_de_soumise}
                onChange={handleChange}
              />
              <Button type="submit" fullWidth variant="contained" color="primary">
                Modifier
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default ModaleModifDevoir;