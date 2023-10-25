import React, {useState} from "react";
import { Button, InputAdornment, IconButton } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';


const ModaleCours = ({onClose}) => {
    const [Niveau, setNiveau] = useState('');
    const [Mention, setMention] = useState('');
    const [Parcours, setParcours] = useState('');

    const [formData, setFormData] = useState({
        Libelle:'',
        Cours: '',
        Niveau:'',
        Mention:'',
        Parcours:'',
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
    return(
        <div className="Modal">
            <div>
                <div className="fermer" onClick={onClose}>X</div>
                <div className="Titre">
                    <h2>CREER UN COURS</h2>
                </div>
                <div className="formulaire">
                    <form>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="Libelle"
                            label="Libelle"
                            name="Libelle"
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
                                    <TextField required fullWidth id="Parcours" label="Parcours" name="Parcours" margin="normal" select value={formData.Parcours} onChange={handleChange}>
                                    {parcoursOptions.map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                            </TextField>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                Creer
                            </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModaleCours;