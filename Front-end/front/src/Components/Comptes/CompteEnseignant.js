import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const defaultTheme = createTheme();

export default function SignInSide() {
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

  const isTelephoneValid = (telephone) => {
    const telephonePattern = /^(034|033|032|038|020)[0-9]{7}$/;
    return telephonePattern.test(telephone);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'Telephone' && value.length <= 10) {
      return;
    };

    setFormData({ ...formData, [name]: value });

    setFormErrors({ ...formErrors, [name]: '' });
    if (name === 'Confirmation') {
        setPasswordsMatch(formData.Mot_de_passe === value);
      }
      if (name === 'Email' && !isEmailValid(value)) {
        setFormErrors({ ...formErrors, Email: 'Adresse e-mail invalide' });
      }
      if (name === 'Telephone' && !isTelephoneValid(value)) {
        setFormErrors({
          ...formErrors,
          Telephone: 'Numéro de téléphone invalide .',
        });
      }
    };

    const handleKeyDown = (e) => {
      const { name, value } = e.target;
      if (name === 'Telephone' && !/^[0-9]+$/.test(e.key)) {
        e.preventDefault();
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
    if (!isTelephoneValid(formData.Telephone)) {
      setFormErrors({
        ...formErrors,
        Telephone: 'Numéro de téléphone doit etre des chiffres.',
      });
      return;
    }

    try {
      const emailCheckResponse = await axios.get(`http://localhost:4000/Authentification/CheckEmail/${formData.Email}`);
      if (emailCheckResponse.data.exists) {
        setFormErrors({ ...formErrors, Email: 'Cet e-mail est déjà utilisé.' });
        return;
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'e-mail', error);
    }

    try {
    console.log(formData);
    const response = await axios.post('http://localhost:4000/Authentification/SignupProfesseur', formData);
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
            backgroundImage: 'url(../Asset/Images/images(1).png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 2,
              mx: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              INSCRIPTION D'UN(E) ENSEIGNANT(E)
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required="true"
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
                required="true"
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
                required="true"
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
                required="true"
                fullWidth
                id="Telephone"
                label="Telephone"
                name="Telephone"
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                error={!!formErrors.Telephone}
                helperText={formErrors.Telephone}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Mot_de_passe"
                label="Mot de passe"
                type="password"
                id="Mot_de_passe"
                onChange={handleChange}
                error={!!formErrors.Mot_de_passe}
                helperText={formErrors.Mot_de_passe}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Confirmation"
                label="Confirmation"
                type="password"
                id="Confirmation"
                onChange={handleChange}
                error={!passwordsMatch}
                helperText={!passwordsMatch ? 'Les mots de passe ne correspondent pas' : ''}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
              CREER
              </Button>
              <Grid container>
                  <Grid item xs>
                    <NavLink to="/" variant="body2"  underline='none'>
                      J'ai un compte
                    </NavLink>
                  </Grid>
                  <Grid item>
                    <NavLink to="/CompteEtudiant" variant="body2"  underline='none'>
                      Je suis un(e) Etudiant(e)
                    </NavLink>  
                  </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}