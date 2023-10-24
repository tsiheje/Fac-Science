import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import sary from '../../Assets/Images/3135715.png';
import axios from "axios";

const Admin_Etudiant = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);
    const [etudiants, setEtudiants] = useState([]);

    useEffect(() => {
        
        const getAllEtudiants = async () => {
            try {
                const response = await axios.get('http://localhost:4000/Administrateur/etudiants');
                setEtudiants(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getAllEtudiants(); 
    }, []);

    return (
        <div className="content">
            <NavBar />
            <div className="scroll">
                    <div className="card" >
                        {etudiants.map(etudiant => (
                            <div className="anatiny" key={etudiant.id}>
                            <div className="left">
                                <img src={sary} width="100%" height="80%" alt="Image de l'étudiant" />
                            </div>
                            <div className="right">
                                <p>Nom : {etudiant.Nom}</p>
                                <p>Prenom : {etudiant.Prenom}</p>
                                <p>Matricul : {etudiant.Matricul}</p>
                                <p>Niveau : {etudiant.Niveau}</p>
                                <p>Mention : {etudiant.Mention}</p>
                                <p>Parcours : {etudiant.Parcours}</p>
                                <p>Telephone : {etudiant.Telephone}</p>
                                <p>Email : {etudiant.Email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Admin_Etudiant;
