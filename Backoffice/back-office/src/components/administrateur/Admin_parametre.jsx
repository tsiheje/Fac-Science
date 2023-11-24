import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import BarNav from "./Navbar";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { Button, TextareaAutosize, MenuItem, TextField } from "@mui/material";
import profil from '../../Assets/Images/3135715.png';
import Mdp from "./mdp";
import QRCode from 'react-qr-code';

const Admin_parametre = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const [user, setUser] = useState({
        Nom: decodedToken.Nom,
        Prenom: decodedToken.Prenom,
        Telephone: decodedToken.Telephone,
        Email: decodedToken.Email,
    });


    const [showMdp, setshowMdp] = useState(false);
    const showModalMdp = () => {
        setshowMdp(true);
    }
    const hideModalMdp = () => {
        setshowMdp(false)
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:4000/Administrateur/update/${decodedToken.Id_compte}`, {
                Telephone: user.Telephone,
                Email: user.Email,
            });

            Swal.fire({
                icon: 'success',
                title: 'Mise à jour réussie',
                text: 'Vos informations ont été mises à jour avec succès!',
            });

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la mise à jour des informations.',
            });
        }
    }

    const textToEncode = user.Email;


    return(
        <div className="content">
            <div className="nav">
                <BarNav/>
            </div>
            <div className="compent">
                <div className="componet-content">
                    <h1>GERER SON PROFIL</h1>
                    <div className="param">
                        <p className="param-kozy">Cette interface vous permet de mettre à jour les informations de votre compte en toute simplicité. Vous pouvez visualiser et modifier des détails tels que votre nom, prénom, numéro de téléphone et adresse e-mail. Assurez-vous que vos informations sont toujours à jour pour une communication efficace</p>
                        <div className="anaty-param">
                            <div className="sary">
                                <img src={profil} alt="" width={'90%'}/>
                            </div>
                            <div className="formulaire">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-ambony">
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="Nom"
                                            label="Nom"
                                            name="Nom"
                                            autoComplete="Nom"
                                            value={user.Nom}
                                            // onChange={handleChange}
                                        />
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="Prenom"
                                            label="Prenom"
                                            name="Prenom"
                                            autoComplete="Prenom"
                                            value={user.Prenom}
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
                                            value={user.Telephone}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="Email"
                                            label="Email"
                                            name="Email"
                                            autoComplete="Email"
                                            value={user.Email}
                                            onChange={handleChange}
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
                        <div className="kozy">
                            <p>De plus, vous avez la possibilité de renforcer la sécurité de votre compte en changeant régulièrement votre mot de passe. Cliquez sur "Changer le mot de passe" pour accéder à cette fonctionnalité</p>
                            {/* <QRCode value={textToEncode} size={256}/> */}
                        </div>
                        <div className="mdp" onClick={showModalMdp}>
                            Changer le mot de passe
                        </div>
                    </div>
                </div>
                {showMdp && < Mdp onClose={hideModalMdp}/>}
            </div>
        </div>
    )
}

export default Admin_parametre;