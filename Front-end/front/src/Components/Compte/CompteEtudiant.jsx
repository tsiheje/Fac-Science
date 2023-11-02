import React, {useState} from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import axios from 'axios';
import './Compte.css';

const CompteEtudiant = () => {
    const navigate = useNavigate();
    const [Niveau, setNiveau] = useState('');
    const [Mention, setMention] = useState('');
    const [Parcours, setParcours] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true); 

    const [formData, setFormData] = useState({
        Nom: '',
        Prenom: '',
        Matricul: '',
        Email: '',
        Niveau: '',
        Mention: '',
        Parcours: '',
        Mot_de_passe: '',
        Confirmation: '',
        Roles:'Etudiant',
      });

    const handleNiveauChange = (event) => {
        const { name, value } = event.target;
        setNiveau(value);
        handleChange(event);
        setMention('');
        setParcours('');
      };

    const handleMentionChange = (event) => {
        const { name, value } = event.target;
        setMention(value);
        handleChange(event);
        setParcours('');
    };

    const [currentStep, setCurrentStep] = useState(1);
    const nextStep = () => {
      setCurrentStep(currentStep + 1);
    };
    const prevStep = () => {
      setCurrentStep(currentStep - 1);
    };
    const isLastStep = currentStep === 4;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    
        if (name === 'Mot_de_passe' || name === 'Confirmation') {
          setPasswordsMatch(formData.Mot_de_passe === formData.Confirmation);
        }
      };

      const handleSuccess = () => {
        Swal.fire({
          icon: 'success',
          title: 'Compte créé avec succès',
          text: 'Vous pouvez maintenant vous connecter.',
        }).then(() => {
          navigate('/');
        });
      };

      const handleCreate = async () => {
        try {
          console.log(formData);
      
          const response = await axios.post('http://localhost:4000/Authentification/signup', formData);
          if (response.ok) {
            handleSuccess();
          } else {
            const data = await response.json();
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: `Erreur : ${data.message}`,
            });
          }
        } catch (error) {
          // Erreur réseau
          console.error('Erreur réseau :', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur réseau',
            text: 'Une erreur réseau s\'est produite.',
          });
        }
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
      const mentionOptions =
        Niveau !== ''
        ? Niveau >= 'S1' && Niveau <= 'S6'
            ? ['MATHEMATIQUE ET APPLICATION', 'PHYSIQUE CHIMIE', 'PHYSIQUE ET APPLICATION', 'SCIENCE DE LA VIE']
            : !['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].includes(Niveau)
            ? ['MATHEMATIQUE ET APPLICATION', 'PHYSIQUE ET APPLICATION', 'CHIMIE', 'SCIENCE DE LA VIE', 'GSEEM']
            : []
        : [];


        const stepNames = [
          "Information personnelle",
          "Compte",
        ];

    return(
        <div className="cont">
            <div className="compte">
                <h2>INSCRIPTION</h2>
               <div className="steps-list">
                    {stepNames.map((step, index) => (
                      <div key={index} className={`step-item ${index === currentStep - 1 ? 'active' : ''}`}>
                      <div className={`step-number ${index === currentStep - 1 ? 'active' : ''}`}>
                        {index + 1}
                      </div>
                      <div className="step-name">{step}</div>
                      {index < stepNames.length - 1 && <hr className="step-separator" />}
                    </div>
                    ))}
                </div>
                <form onSubmit={handleCreate}>
                {currentStep === 1 && (
                  <div>
                                <TextField required id="Nom" name="Nom" label="Nom" fullWidth margin="normal"
                                onChange={handleChange}
                                />
                                <TextField required id="Prenom" name="Prenom" label="Prenom" fullWidth margin="normal"
                                onChange={handleChange}
                                />
                                <TextField required id="Matricul" name="Matricul" label="Matricul" fullWidth margin="normal"
                                onChange={handleChange} 
                                />
                                <TextField required fullWidth id="Niveau" label="Niveau" name='Niveau' select value={Niveau} margin="normal"
                                onChange={handleNiveauChange}
                                >
                                      {Array.from({ length: 10 }, (_, i) => (
                                        <MenuItem key={`S${i + 1}`} value={`S${i + 1}`}>
                                          S{i + 1}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                    <TextField required fullWidth id="Mention" label="Mention" name='Mention' margin="normal" select value={Mention} onChange={handleMentionChange}>
                                      {mentionOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                          {option}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                    
                                  <div className="btn">
                                    <Button
                                    className="suivant"
                                    type="button"
                                    onClick={nextStep}
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2 }}
                                  >
                                    Étape suivante
                                  </Button>
                                  </div>
                          </div>
                        )}
                   {currentStep === 2 && (
                  <div> 
                    <TextField required fullWidth id="Parcours" label="Parcours" name="Parcours" margin="normal" select value={formData.Parcours} onChange={handleChange}>
                                    {parcoursOptions.map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                    </TextField>
                    <TextField
                        margin="normal"
                        required
                        id="Telephone"
                        label="Telephone"
                        fullWidth
                        name="Telephone"
                        value={formData.Telephone}
                        onChange={handleChange}
                    />
                <TextField
                        margin="normal"
                        required="true"
                        fullWidth
                        id="Email"
                        label="Adresse email"
                        name="Email"
                        autoComplete="email"
                        onChange={handleChange}
                      />
                <TextField
                      required
                      margin="normal"
                      id="Mot_de_passe"
                      label="Mot_de_passe"
                      type="password"
                      fullWidth
                      name="Mot_de_passe"
                      value={formData.Mot_de_passe}
                      onChange={handleChange}
                    />
                <TextField
                      required
                      margin="normal"
                      id="Confirmation"
                      label="Confirmation"
                      type="password"
                      fullWidth
                      name="Confirmation"
                      value={formData.Confirmation}
                      onChange={handleChange}
                    />
                    <div className="btn">
                    <Button
                      className="retour"
                      type="button"
                      onClick={prevStep}
                      variant="contained"
                      sx={{ mt: 2, mb: 2 }}
                    >
                      Étape précédente
                    </Button>
                    <Button
                          className="creer"
                          type="submit"
                          variant="contained"
                          sx={{ mt: 2, mb: 2 }}
                      >
                      CREER
                  </Button>
                    </div>
                  </div>)}
                </form>
                <div className="inscri">
                      Vous aves de compte?
                      <NavLink to="/" variant="body2"  underline='none'>
                          Connectez-vous
                      </NavLink>
                  </div>
            </div>
        </div>
    )
}

export default CompteEtudiant;