import React, { useState, useEffect } from "react";
import './Administrateur.css';
import { Button, TextareaAutosize } from '@mui/material';
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

const ModalModif = ({ onClose, selectedAnnouncement }) => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const Id = decodedToken.Id_compte;

    const [annonce, setAnnonce] = useState({
        Description: "",
        Annonce: null,
        Id_source: Id,
    });

    const { Description } = selectedAnnouncement || {};
    console.log(Description)
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
                text: 'L\'annonce est modifiée avec succès!',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la modification.',
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
            const response = await axios.put(`http://localhost:4000/Administrateur/annonce/${selectedAnnouncement.id}`, formData, {
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
                <div className="titre">
                    <h2>MODIFIER L'ANNONCE</h2>
                </div>
                <div className="formulaire">
                    <form onSubmit={handleSubmit}>
                        <div className="form-anaty">
                            <div className="fichier">
                                <div className="file-input-container">
                                    <label className="file-input-label">
                                        <input
                                            type="file"
                                            className="file-input"
                                            name="Annonce"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
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

export default ModalModif;
