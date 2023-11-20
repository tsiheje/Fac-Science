import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';
import axios from "axios";
import Profile from "./profile";
import profil from '../../Assets/Images/3135715.png';

const Professeur = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);
    const navigate = useNavigate();

    const [professeur, setProfesseur] = useState([]);
    useEffect(() => {
        const getAllProfesseur = async () => {
            try{
                const response = await axios.get('http://localhost:4000/Etudiant/professeur');
                setProfesseur(response.data);
                console.log(response.data);
            }catch(error){
                console.error(error);
            }
        }
        getAllProfesseur();
    }, []);
    return(
        <div className="content">
            <NavBar/>
            <div className="Etudiant">
                {/* <div className="left">
                    <Profile/>
                </div> */}
                <div className="gauche">
                    <div className="right-contenu">
                        {professeur.map(professeur => (
                            <div className="anaty-prof" key={professeur.id}>
                                <img src={profil} alt="" width={'50%'}/>
                                <div className="bio">
                                    <p className="anarany">{professeur.Nom} {professeur.Prenom}</p>
                                    <p className="tel">{professeur.Telephone}</p>
                                    <p className="mail">{professeur.Email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Professeur;