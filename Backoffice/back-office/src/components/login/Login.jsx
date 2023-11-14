import React, {useState} from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button, InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Login.css'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        Email: '',
        Mot_de_passe:'',
    });

    // Erreur sur les inputs
    const [formErrors, setFormErrors] = React.useState({
        Email: '',
        Mot_de_passe: '',
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.Email || !formData.Mot_de_passe) {
          setFormErrors({
            ...formErrors,
            Email: !formData.Email ? 'Veuillez remplir ce champ.' : '',
            Mot_de_passe: !formData.Mot_de_passe ? 'Veuillez remplir ce champ.' : '',
          });
          return; 
        }
        try{
            const Reponsetoken = await axios.post('http://localhost:4000/Authentification/Login', formData);
            const token = Reponsetoken.data;
            const tokenString = JSON.stringify(token);

            //stocker le token dans la cookie
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
            Cookies.set('token', tokenString, { expires: oneYearFromNow });
            const storedTokenString = Cookies.get('token');
            const storedToken = JSON.parse(storedTokenString);

            //recuperer les donnees dans la token
            const user = await axios.get('http://localhost:4000/Authentification/me', {
              headers: {
                  Authorization: `Bearer ${storedToken}`
              }
          });
          const Utilisateur = user.data;
          const roles = Utilisateur.Roles
          
          if (roles === 'Administrateur') {
            navigate('/Administrateur'); 
          } else if (roles === 'Professeur') { 
            navigate('/Professeur');
          } else{
            navigate('/');
          }



        }catch(error){
            console.error('Erreur lors de la connexion', error);
      if (error.response) {
        if (error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Mot de passe incorrect',
            text: 'Le mot de passe que vous avez saisi est incorrecte!.',
          });
        } else if (error.response.status === 402 ){
          Swal.fire({
            icon: 'error',
            title: 'Le token n\'existe pas',
            text: ' il semble que vous n\'avec pas acces.',
          });
        }
        else{
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

    }
    return(
        <div className="contenu">
            {/* <div className="left">
                <h1>ONE NOTE</h1>
                <p>Explorez le savoir partagé par nos enseignants et restez à jour avec les dernières annonces liées à vos cours et à propos de vos études. Connectez-vous pour enrichir votre expérience académique!</p>
            </div> */}
            <div className="right">
                <div className="formulaire">
                  <h2>CONNEXION</h2>
                  <form onSubmit={handleSubmit}>
                      <TextField
                      margin="normal"
                      fullWidth
                      id="Email"
                      label="Adresse email"
                      name="Email"
                      autoComplete="email"
                      autoFocus
                      onChange={handleChange}
                      error={!!formErrors.Email}
                      helperText={formErrors.Email}
                      />
                      <TextField
                          margin="normal"
                          fullWidth
                          name="Mot_de_passe"
                          label="Mot de passe"
                          type={showPassword ? "text" : "password"}
                          id="Mot_de_passe"
                          autoComplete="current-password"
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
                      <div className="oublier">
                        <NavLink to="/Mot_de_passe_oublier" variant="body2"  underline='none'>
                            Mot de passe oublié?
                        </NavLink>
                      </div>
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 2, mb: 2 }}
                      >
                      Se connecter
                      </Button>
                  </form>
                </div>
            </div>
        </div>
    )
}

export default Login;