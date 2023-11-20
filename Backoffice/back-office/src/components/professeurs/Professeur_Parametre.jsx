import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import BarNav from "./Navbar";
import { jwtDecode } from "jwt-decode";
import './Professeur.css';
import profil from '../../Assets/Images/3135715.png';
import { Button, TextareaAutosize, MenuItem, TextField } from "@mui/material";
import Mdp from "./mdp";
import Cookies from "js-cookie";

const Professeur_Parametre = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const Nom = decodedToken.Nom;
    const Prenom = decodedToken.Prenom;
    const Telephone = decodedToken.Telephone;
    const Email = decodedToken.Email;
    const [showMdp, setshowMdp] = useState(false);
    const showModalMdp = () => {
        setshowMdp(true)
    }
    const hideModalMdp = () => {
        setshowMdp(false)
    }
    return(
        <div className="content">
            <div className="nav">
                <BarNav/>
            </div>
            <div className="compents">
                <div className="compents-content">
                    <h1>GERER SON PROFIL</h1>
                    <div className="param">
                        <div className="anaty-param">
                            <div className="sary">
                                <img src={profil} alt="" width={'90%'}/>
                            </div>
                            <div className="formulaire">
                                <form>
                                    <div className="form-ambony">
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
                                    <div className="form-ambany">
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
                                    <div className="btn">
                                        <Button type="submit" fullWidth variant="contained" color="primary">
                                            Mettre à jour
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="bar"></div>
                        <div className="kozy"></div>
                        <div className="mdp" onClick={showModalMdp}>
                            Changer le mot de passe
                        </div>
                    </div>
                    {showMdp && <Mdp onClose={hideModalMdp}/>}
                </div>
            </div>
        </div>
    )
}

export default Professeur_Parametre;