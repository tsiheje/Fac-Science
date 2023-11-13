import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import './Etudiant.css';
import { TextField, Button, TextareaAutosize } from '@mui/material';

const Soumettre = ({onClose}) => {
    return(
        <div className="soumettre">
            <div className="anaty-soumettre">
                <div className="fermer" onClick={ onClose }>X</div>
                <div className="formulaire">
                    <h2>Soumettre devoirs</h2>
                    <form>
                        <input
                            type="file"
                            className="file-input"
                            name="Annonce"
                            // onChange={handleImageChange}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Faire
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Soumettre;