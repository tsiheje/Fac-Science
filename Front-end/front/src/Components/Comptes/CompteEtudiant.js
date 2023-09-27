import  React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Information from './Information';
import Compte from './Compte';
import axios from 'axios';


const steps = ['Information Personnel', 'Compte Personnel'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Information />;
    case 1:
      return <Compte />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    Nom: '',
    Prenom: '',
    Matricul: '',
    Niveau: '',
    Mention: '',
    Parcours: '',
    Telephone: '',
    Email: '',
    Mot_de_passe: '',
    Roles: 'Etudiant',
  });


  const handleNext = () => {
    if (
      (activeStep === 0 && formData.Nom && formData.Prenom && formData.Matricul && formData.Niveau && formData.Mention && formData.Parcours)
    ) {
      setActiveStep(activeStep + 1);
    } else {
      alert('Veuillez remplir tous les champs obligatoires correctement avant de passer à l\'étape suivante.');
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCreate = () => {
    if (
      formData.Nom &&
      formData.Prenom &&
      formData.Matricul &&
      formData.Niveau &&
      formData.Mention &&
      formData.Parcours &&
      formData.Telephone &&
      formData.Email &&
      formData.Mot_de_passe 
    ) {
      const dataToSend = {
        nom: formData.Nom,
        prenom: formData.Prenom,
        matricul: formData.Matricul,
        niveau: formData.Niveau,
        mention: formData.Mention,
        parcours: formData.Parcours,
        telephone: formData.Telephone,
        email: formData.Email,
        mot_de_passe: formData.Mot_de_passe,
        roles: 'Etudiant',
      };
  
      // Envoyez les données au backend
      axios
        .post('http://localhost:4000/Authentification/Login', dataToSend) 
        .then((response) => {
          console.log('Inscription réussie :', response.data);
        })
        .catch((error) => {
          console.error('Erreur d\'inscription :', error);
        });
    } else {
      
      alert('Veuillez remplir tous les champs obligatoires correctement avant de créer un compte.');
    }
  };
  

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            INSCRIPTION
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Retour
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'CREER' : 'Suivant'}
                </Button>

              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}