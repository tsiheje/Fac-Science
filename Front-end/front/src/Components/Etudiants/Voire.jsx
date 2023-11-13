import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import './Etudiant.css';

const Voire = ({onClose}) => {
    return(
        <div className="regarder">
            <div className="anaty-regarder">
                <div className="fermer" onClick={ onClose }>X</div>
                <div className="fichier">

                </div>
            </div>
        </div>
    )
}

export default Voire;