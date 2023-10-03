import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import backgroundImage from '../../Asset/Images/pexels-buro-millennial-1438072.jpg';


const defaultTheme = createTheme();

const steps = ['Information Personnel', 'Compte Personnel'];

export default function SignInSide() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [Niveau, setNiveau] = useState('');
  const [Mention, setMention] = useState('');
  const [Parcours, setParcours] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); 

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

  const handleSuccess = () => {
    Swal.fire({
      icon: 'success',
      title: 'Compte créé avec succès',
      text: 'Vous pouvez maintenant vous connecter.',
    }).then(() => {
      navigate('/');
    });
  };

  const handleNextStep = () => {
    if (
      (step === 0 && formData.Nom && formData.Prenom && formData.Matricul && Niveau && Mention) ||
      (step === 1 && Parcours && formData.Email && formData.Mot_de_passe && formData.Confirmation && passwordsMatch)
    ) {
      if (step === steps.length - 1) {
        alert('Création effectuée !');
      } else {
        setStep(step + 1);
      }
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'Mot_de_passe' || name === 'Confirmation') {
      setPasswordsMatch(formData.Mot_de_passe === formData.Confirmation);
    }
  };

  const handleCreate = async () => {
    try {
      console.log(formData);
  
      const response = await fetch('http://localhost:4000/Authentification/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
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
  


  const mentionOptions =
    Niveau !== ''
      ? Niveau >= 'S1' && Niveau <= 'S6'
        ? ['MATHEMATIQUE ET APPLICATION', 'PHYSIQUE CHIMIE', 'PHYSIQUE ET APPLICATION', 'SCIENCE DE LA VIE']
        : !['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].includes(Niveau)
        ? ['MATHEMATIQUE ET APPLICATION', 'PHYSIQUE ET APPLICATION', 'CHIMIE', 'SCIENCE DE LA VIE', 'GSEEM']
        : []
      : [];

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
              my: 2,
              mx: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Typography variant="h6" align="center">
                {steps[step]}
              </Typography>
              {step === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField required id="Nom" name="Nom" label="Nom" fullWidth onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required id="Prenom" name="Prenom" label="Prenom" fullWidth onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required id="Matricul" name="Matricul" label="Matricul" fullWidth onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="Niveau" label="Niveau" name='Niveau' select value={Niveau} onChange={handleNiveauChange}>
                      {Array.from({ length: 10 }, (_, i) => (
                        <MenuItem key={`S${i + 1}`} value={`S${i + 1}`}>
                          S{i + 1}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="Mention" label="Mention" name='Mention' select value={Mention} onChange={handleMentionChange}>
                      {mentionOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="Parcours" label="Parcours" name="Parcours" select value={formData.Parcours} onChange={handleChange}>
                    {parcoursOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                    </TextField>
                  </Grid>
                </Grid>
              )}
              {step === 1 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="Email"
                      label="Email"
                      fullWidth
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="Telephone"
                      label="Telephone"
                      fullWidth
                      name="Telephone"
                      value={formData.Telephone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="Mot_de_passe"
                      label="Mot_de_passe"
                      type="password"
                      fullWidth
                      name="Mot_de_passe"
                      value={formData.Mot_de_passe}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="Confirmation"
                      label="Confirmation"
                      type="password"
                      fullWidth
                      name="Confirmation"
                      value={formData.Confirmation}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {step === 1 && !passwordsMatch && (
                      <Typography variant="body2" color="error">
                        Les mots de passe ne correspondent pas.
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {step === 1 && (!formData.Email || !formData.Mot_de_passe || !formData.Confirmation || !Parcours) && (
                      <Typography variant="body2" color="error">
                        Remplissez tous les champs obligatoires.
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                {step > 0 && (
                  <Button variant="outlined" onClick={() => setStep(step - 1)}>
                    Précédent
                  </Button>
                )}
                {step < steps.length - 1 && (
                  <Button variant="contained" onClick={handleNextStep}>
                    Suivant
                  </Button>
                )}
                {step === steps.length - 1 && (
                  <Button variant="contained" color="primary" onClick={handleCreate}>
                    Créer
                  </Button>
                )}
              </Box>
              <Grid container>
                  <Grid item xs>
                    <NavLink to="/" variant="body2"  underline='none'>
                      J'ai un compte
                    </NavLink>
                  </Grid>
                  <Grid item>
                    <NavLink to="/CompteEnseignant" variant="body2"  underline='none'>
                      Je suis un(e) Enseignant(e)
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
