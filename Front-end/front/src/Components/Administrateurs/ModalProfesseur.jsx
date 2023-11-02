import React, {useState} from "react";
import './Administrateur.css';
import { Button, InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';


const ModalProfesseur = ({onClose}) => {
  const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    Nom: '',
    Prenom: '',
    Email: '',
    Telephone: '',
    Mot_de_passe:'',
    Roles:'Professeur'
  });
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);

  const [formErrors, setFormErrors] = React.useState({
    Nom: '',
    Prenom: '',
    Email: '',
    Telephone: '',
    Mot_de_passe:'',
  });

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const handleSuccess = () => {
    Swal.fire({
      icon: 'success',
      title: 'Compte créé avec succès',
      text: 'Vous pouvez maintenant vous connecter.',
    })
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });

    setFormErrors({ ...formErrors, [name]: '' });
      if (name === 'Email' && !isEmailValid(value)) {
        setFormErrors({ ...formErrors, Email: 'Adresse e-mail invalide' });
      }
    };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.Email || !formData.Mot_de_passe || !formData.Nom || !formData.Prenom || !formData.Telephone) {
          setFormErrors({
            ...formErrors,
            Nom: !formData.Nom ? 'Veuillez remplir ce champ' : '',
            Prenom: !formData.Prenom ? 'Veuillez remplir ce champ' : '',
            Telephone: !formData.Telephone ? 'Veuillez remplir ce champ': '',
            Email: !formData.Email ? 'Veuillez remplir ce champ.' : '',
            Mot_de_passe: !formData.Mot_de_passe ? 'Veuillez remplir ce champ.' : '',
          });
          return;
        }
        try {
        console.log(formData);
        const response = await axios.post('http://localhost:4000/Authentification/signup_professeur', formData);
        if (response.status === 200) {
          handleSuccess();
        }
        } catch (error) {
          console.error('Erreur lors de la connexion', error);
          if (error.response) {
            if (error.response.status === 401) {
              Swal.fire({
                icon: 'error',
                title: 'Mot de passe incorrect',
                text: 'Le mot de passe que vous aves saisi est incorrecte!.',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'L\'utilisateur n\'existe pas',
                text: ' Verifiez bien l\'email que vous avez saisi!. Si vous n\'avez pas de compte inscrivez vous!.',
              });
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erreur de connexion',
              text: 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer.',
            });
          }
        }
      };
    
    return(
        <div className="Modal">
            <div>
                <div className="fermer" onClick={onClose}>X</div>
                <div className="titre">
                   <h2>AJOUT PROFESSEUR</h2>
                </div>
                <div className="formulaire-prof">
                    <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="Nom"
                        label="Nom"
                        name="Nom"
                        autoComplete="Nom"
                        onChange={handleChange}
                        error={!!formErrors.Nom}
                        helperText={formErrors.Nom}
                    />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="Prenom"
                            label="Prenom"
                            name="Prenom"
                            autoComplete="Prenom"
                            onChange={handleChange}
                            error={!!formErrors.Prenom}
                            helperText={formErrors.Prenom}
                           
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="Email"
                            label="Adresse email"
                            name="Email"
                            onChange={handleChange}
                            error={!!formErrors.Email}
                            helperText={formErrors.Email}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="Telephone"
                            label="Telephone"
                            name="Telephone"
                            onChange={handleChange}
                            error={!!formErrors.Telephone}
                            helperText={formErrors.Telephone}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="Mot_de_passe"
                            label="Mot de passe"
                            type={showPassword ? "text" : "password"}
                            id="Mot_de_passe"
                            onChange={handleChange}
                            error={!!formErrors.Mot_de_passe}
                            helperText={formErrors.Mot_de_passe}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                  >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                        >
                        CREER
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalProfesseur;