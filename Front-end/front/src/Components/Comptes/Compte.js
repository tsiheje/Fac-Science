import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function PaymentForm() {
  const [formData, setFormData] = React.useState({
    Telephone: '',
    Email: '',
    Mot_de_passe: '',
    Confirmation: '',
  });

  const [passwordsMatch, setPasswordsMatch] = React.useState(true);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    if (id === 'Confirmation') {
      setPasswordsMatch(formData.Mot_de_passe === value);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" align='center' >
        Compte Personnel
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="Telephone"
            label="Telephone"
            fullWidth
            value={formData.Telephone}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Email"
            label="Email"
            fullWidth
            value={formData.Email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Mot_de_passe"
            label="Mot_de_passe"
            type="password"
            fullWidth
            value={formData.Mot_de_passe}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Confirmation"
            label="Confirmation"
            type="password"
            fullWidth
            value={formData.Confirmation}
            onChange={handleInputChange}
            error={!passwordsMatch}
            helperText={!passwordsMatch ? 'Les mots de passe ne correspondent pas' : ''}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
