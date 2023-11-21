import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import './Etudiant.css';

const Voire = ({ devoir, onClose }) => {
    console.log(devoir)
    const fileURL = devoir ? `http://localhost:4000/Administrateur/uploads/${devoir}` : '';

    return (
        <div className="regarder">
            <div className="anaty-regarder">
                <div className="fermer" onClick={onClose}>X</div>
                <div className="fichier">
                    {devoir ? (
                        // Utilisez les détails du devoir pour afficher le fichier
                        <iframe title="File Viewer" src={fileURL} width="99%" height="100vh" />
                    ) : (
                        <p>Aucun fichier sélectionné</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Voire;
