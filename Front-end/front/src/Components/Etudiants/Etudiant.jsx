import React from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';

const Etudiant = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);

    return (
        <div className="content">
            <NavBar/>
            <div className="Etudiants">
                <div className="kozy">
                    <h1>Bienvenue sur <span>ONE NOTE</span></h1>
                    <p>"l'endroit où l'apprentissage rencontre l'innovation. Explorez notre communauté éducative dynamique, découvrez des ressources de qualité et interagissez avec des esprits curieux. Préparez-vous à façonner votre avenir académique."</p>
                </div>
            </div>
            <div className="decs">

            </div>
        </div>
    );
}

export default Etudiant;
