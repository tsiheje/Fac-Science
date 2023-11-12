import React, { useState } from "react";
import { Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
  

const ModaleDevoirs = ({onClose}) => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const Id = decodedToken.Id_compte;
  
    const [Niveau, setNiveau] = useState('');
    const [Mention, setMention] = useState('');
    const [Parcours, setParcours] = useState('');
    const [devoirs, setDevoirs] = useState({
      Libelle: '',
      Devoirs: null,
      Niveau: '',
      Mention: '',
      Parcours: '',
      Date_de_soumise: '',
      Id_Professeur: Id,
    });
  
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Utilisez FormData pour envoyer le fichier
      const formData = new FormData();
      formData.append("Devoirs", devoirs.Devoirs);
      formData.append("Libelle", devoirs.Libelle);
      formData.append("Niveau", devoirs.Niveau);
      formData.append("Mention", devoirs.Mention);
      formData.append("Parcours", devoirs.Parcours);
      formData.append("Date_de_soumise", devoirs.Date_de_soumise);
      formData.append("Id_Professeur", devoirs.Id_Professeur);
  
      try {
        const response = await axios.post('http://localhost:4000/Professeur/devoirs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Réponse du serveur:', response.data);
        // displaySweetAlert(true);
      } catch (error) {
        console.error('Erreur:', error);
        // displaySweetAlert(false);
      }
  
      onClose();
    };
  
    return (
      <div className="Modal">
        <div>
          <div className="fermer" onClick={onClose}>X</div>
          <div className="Titre">
            <h2>CRÉER UN COURS</h2>
          </div>
          <div className="formulaire">
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                id="Libelle"
                label="Libellé"
                name="Libelle"
                onChange={handleChange}
              />
              <label className={`input-file ${devoirs.devoirs ? 'has-file' : ''}`}>
                <input
                  type="file"
                  name="Devoirs"
                  onChange={handleImageChange}
                />
              </label>
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
                // label="date fin de remise"
                name="Date_de_soumise"
                margin="normal"
                type="date"
                onChange={handleChange}
              />
              <Button type="submit" fullWidth variant="contained" color="primary">
                Créer
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  };
export default ModaleDevoirs;