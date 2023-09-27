import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';

export default function AddressForm() {
  const [Niveau, setNiveau] = useState('');
  const [Mention, setMention] = useState('');
  const [Parcours, setParcours] = useState('');
  const handleNiveauChange = (event) => {
    setNiveau(event.target.value);
    setMention('');
    setParcours(''); 
  };
  const handleMentionChange = (event) => {
    setMention(event.target.value);
    setParcours('');
  };
  const [formData, setFormData] = useState({
    Nom: '',
    Prenom: '',
    Matricul: '',
    Niveau: '',
    Mention: '',
    Parcours: '',
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
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
      }else if(Mention === 'PHYSIQUE ET APPLICATION'){
        return['EA2I'];
      } else if (Mention === 'MATHEMATIQUE ET APPLICATION'){
        return ['MF', 'ME', 'MISS'];
      }else {
        return [];
      }
    })();

  return (
    <React.Fragment>
      <Typography variant="h6" align="center">
        Information Personnel
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField required id="Nom" name="Nom" label="Nom" fullWidth onChange={handleChange}/>
        </Grid>
        <Grid item xs={12}>
          <TextField required id="Prenom" name="Prenom" label="Prenom" fullWidth onChange={handleChange}/>
        </Grid>
        <Grid item xs={12}>
          <TextField required id="Matricul" name="Matricul" label="Matricul" fullWidth onChange={handleChange}/>
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth id="Niveau" label="Niveau" select value={Niveau} onChange={handleNiveauChange}>
            {Array.from({ length: 10 }, (_, i) => (
              <MenuItem key={`S${i + 1}`} value={`S${i + 1}`}>
                S{i + 1}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth id="Mention" label="Mention" select value={Mention} onChange={handleMentionChange}>
            {mentionOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth id="Parcours" label="Parcours" select value={Parcours} onChange={(event) => setParcours(event.target.value)}>
            {parcoursOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
