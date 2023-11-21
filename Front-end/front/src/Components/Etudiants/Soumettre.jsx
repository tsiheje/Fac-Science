import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import './Etudiant.css';
import { TextField, Button, TextareaAutosize } from '@mui/material';

const Soumettre = ({ onClose }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        // Assurez-vous que le fichier a été sélectionné
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Assurez-vous que le fichier a été sélectionné
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                // Remplacez l'URL ci-dessous par l'URL de votre endpoint côté serveur pour recevoir le fichier
                const response = await axios.post('http://localhost:4000/votre-endpoint', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Traitez la réponse du serveur, par exemple, affichez un message de succès
                console.log(response.data);
            } catch (error) {
                console.error('Erreur lors de l\'envoi du fichier :', error);
            }
        }
    };

    return (
        <div className="soumettre">
            <div className="anaty-soumettre">
                <div className="fermer" onClick={onClose}>X</div>
                <div className="formulaire">
                    <h2>Soumettre devoirs</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            className="file-input"
                            name="file"
                            onChange={handleFileChange}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Soumettre
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Soumettre;
