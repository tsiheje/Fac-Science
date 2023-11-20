import React, { useState } from "react";
import './Administrateur.css';
import { TextField, Button, TextareaAutosize } from '@mui/material';
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

const ModalModif = ({onClose}) => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const Id = decodedToken.Id_compte;
    const [annonce, setAnnonce] = useState({
        Description: "",
        Annonce: null,
        Id_source: Id,
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setAnnonce((prevAnnonce) => ({
            ...prevAnnonce,
            [name]: value,
        }));
        setSelectedFile(name);
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
                text: 'L\'annonce est publié avec succés!',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la publication',
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
            const response = await axios.post('http://localhost:4000/Administrateur/annonce', formData, {
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
        
        // onClose();
    };
    return(
        <div className="Modal">
           <div>
                    <div className="fermer" onClick={onClose}>X</div>
                    <div className="titre">
                        <h2>FAIRE UNE ANNONCE</h2>
                    </div>
                    <div className="formulaire">
                        <form onSubmit={handleSubmit}>
                            <div className="form-anaty">
                            <div className="fichier">
                            <label>Choisissez votre image</label>
                            <div className="file-input-container">
                                <label className="file-input-label"></label>
                                <input
                                    type="file"
                                    className="file-input"
                                    name="Annonce"
                                    onChange={handleImageChange}
                                    />
                            </div>
                            {selectedFile && <p>Fichier sélectionné : {selectedFile.name}</p>}
                            </div>
                            <div className="champ">
                                <TextareaAutosize
                                    minRows={5}
                                    maxRows={6}
                                    style={{ width: '100%' }}
                                    placeholder="Entrez la description de l'annonce"
                                    name="Description"
                                    value={annonce.Description}
                                    onChange={handleChange}
                                />
                            </div>
                            </div>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                Faire
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default ModalModif;