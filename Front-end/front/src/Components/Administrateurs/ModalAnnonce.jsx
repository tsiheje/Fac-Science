    import React, { useState } from "react";
    import './Administrateur.css';
    import { TextField, Button, TextareaAutosize } from '@mui/material';
    import axios from "axios";
    import Cookies from 'js-cookie';
    import jwt_decode from 'jwt-decode';
    import Swal from 'sweetalert2';

    const ModalAnnonce = ({ onClose }) => {
        const token = Cookies.get('token');
        const decodedToken = jwt_decode(token);
        const Id = decodedToken.Id_compte;
        console.log(Id);
        const [annonce, setAnnonce] = useState({
            Description: "",
            Annonce: null,
            Id_source: Id,
        });

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
            
            onClose();
        };

        return (
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
                            <label className={`input-file ${annonce.Annonce ? 'has-file' : ''}`}>
                                <input
                                    type="file"
                                    name="Annonce"
                                    onChange={handleImageChange}
                                />
                                Choisissez votre image
                            </label>
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
        );
    }

    export default ModalAnnonce;
