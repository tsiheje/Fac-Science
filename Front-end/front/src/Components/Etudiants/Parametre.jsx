import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';
import axios from "axios";
import Profile from "./profile";
import { Button, TextareaAutosize, MenuItem, TextField } from "@mui/material";

const Paremetre = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);
    const niveau = decodedToken.Niveau;
    const Mention = decodedToken.Mention;
    const Parcours = decodedToken.Parcours;
    const Nom = decodedToken.Nom;
    const Prenom = decodedToken.Prenom;
    const Telephone = decodedToken.Telephone;
    const Email = decodedToken.Email;
    
    const [Niveau, setNiveau] = useState('');
    const handleNiveauChange = (event) => {
        const { value } = event.target;
        setNiveau(value);
      };

    return(
        <div className="content">
            <NavBar/>
            <div className="Etudiant">
                <div className="parametre">
                    <div className="left">
                        <Profile/>
                    </div>
                    <div className="gauche">
                        <div className="formulaire-parametre">
                            <h1>GERER SON PROFIL</h1>
                            <form>
                            <div className="info">
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="Nom"
                                    label="Nom"
                                    name="Nom"
                                    autoComplete="Nom"
                                    value={Nom}
                                    // onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="Prenom"
                                    label="Prenom"
                                    name="Prenom"
                                    autoComplete="Prenom"
                                    value={Prenom}
                                    // onChange={handleChange}
                                />
                            </div>
                            <div className="classe-parametre">
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="Mention"
                                    label="Mention"
                                    name="Mention"
                                    autoComplete="Mention"
                                    value={Mention}
                                    // onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="Parcours"
                                    label="Parcours"
                                    name="Parcours"
                                    autoComplete="Parcours"
                                    value={Parcours}
                                    // onChange={handleChange}
                                />
                            </div>
                            <TextField
                                fullWidth
                                id="Niveau"
                                label="Niveau"
                                name="Niveau"
                                select
                                value={niveau}
                                margin="normal"
                                onChange={handleNiveauChange}
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                <MenuItem key={`S${i + 1}`} value={`S${i + 1}`}>
                                    S{i + 1}
                                </MenuItem>
                                ))}
                            </TextField>
                            <div className="contact-parametre">
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="Telephone"
                                    label="Telephone"
                                    name="Telephone"
                                    autoComplete="Telephone"
                                    value={Telephone}
                                    // onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="Email"
                                    label="Email"
                                    name="Email"
                                    autoComplete="Email"
                                    value={Email}
                                    // onChange={handleChange}
                                />
                            </div>
                            <div className="btn-parametre">
                                <Button type="submit" fullWidth variant="contained" color="primary">
                                    Mettre à jour
                                </Button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paremetre;