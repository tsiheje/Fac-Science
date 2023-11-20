import React, { useState } from "react";
import { Button, TextareaAutosize } from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const ModaleModifAnnonce = ({ onClose, selectedAnnouncement }) => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const Id = decodedToken.Id_compte;

    const [annonce, setAnnonce] = useState({
        Description: "",
        Annonce: null,
        Id_source: Id,
    });

    const { Description } = selectedAnnouncement || {};

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAnnonce((prevAnnonce) => ({
            ...prevAnnonce,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setAnnonce((prevAnnonce) => ({
            ...prevAnnonce,
            Annonce: selectedFile,
        }));
    };

    const displaySweetAlert = (success) => {
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Les données ont été ajoutées avec succès!',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de l\'ajout des données.',
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(annonce);

        // Utilisez FormData pour envoyer le fichier
        const formData = new FormData();
        formData.append("Annonce", annonce.Annonce);
        formData.append("Description", annonce.Description);
        formData.append("Id_source", annonce.Id_source);

        try {
            const response = await axios.post('http://localhost:4000/Professeur/annonce', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Réponse du serveur:', response.data);
            displaySweetAlert(true);
        } catch (error) {
            console.error('Erreur:', error);
            displaySweetAlert(false);
        }

        onClose();
    };

    return (
        <div className="Modal">
            <div>
                <div className="fermer" onClick={onClose}>X</div>
                <div className="Titre">
                    <h2>MODIFIER L'ANNONCE</h2>
                </div>
                <div className="formulaire">
                    <form onSubmit={handleSubmit}>
                        <div className="form-anaty">
                            <div className="fichier">
                                <label className={`input-file ${annonce.Annonce ? 'has-file' : ''}`}>
                                    <input
                                        type="file"
                                        name="Annonce"
                                        onChange={handleImageChange}
                                    />

                                </label>
                            </div>
                            <div className="champ">
                                <TextareaAutosize
                                    minRows={5}
                                    maxRows={6}
                                    style={{ width: '100%' }}
                                    placeholder="Entrez la description de l'annonce"
                                    name="Description"
                                    value={annonce.Description || Description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Modifier
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModaleModifAnnonce;
