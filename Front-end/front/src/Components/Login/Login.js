import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import backgroundImage from '../../Asset/Images/images (1).png'; // Utilisez un chemin absolu depuis la racine


const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState(null);
  const [formData, setFormData] = React.useState({
    Email: '',
    Mot_de_passe:'',
  });

  const [formErrors, setFormErrors] = React.useState({
    Email: '',
    Mot_de_passe: '',
  });
  
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

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
    try {
    console.log(formData);
    const response = await axios.post('http://localhost:4000/Authentification/Login', formData);
    const {user, token} = response.data;
    setAccessToken(token);
    setRefreshToken();

    setUserInfo(user);
    const roles = user.Roles;
    console.log(roles);
    if (roles === 'Etudiant') {
      setUserInfo(user); 
      navigate('/Etudiant', { state: { user: user } }); 
    } else if (roles === 'Professeur') {
      setUserInfo(user); 
      navigate('/Professeur', { state: { user: user } });
    } else if(roles === 'Administrateur'){
      setUserInfo(user)
      navigate('/Administrateur');
    }else{
      navigate('/');
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              
            </Avatar>
            <Typography component="h1" variant="h4">
              CONNEXION
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required="true"
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
                required
                fullWidth
                name="Mot_de_passe"
                label="Mot de passe"
                type="password"
                id="Mot_de_passe"
                autoComplete="current-password"
                onChange={handleChange}
                error={!!formErrors.Mot_de_passe}
                helperText={formErrors.Mot_de_passe}
              />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" underline='none'>
                  Mot de passe oublié?
                  </Link>
                </Grid>
            </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
              Se connecter
              </Button>
              <Grid item>
                Vous n' avez pas de compte?
                <NavLink to="/CompteEtudiant" variant="body2"  underline='none'>
                     S'inscrire
                </NavLink>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}