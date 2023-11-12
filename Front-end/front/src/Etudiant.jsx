import React from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { NavLink } from "react-router-dom";
import sary from '../src/Assets/Images/pexels-yan-krukau-8199555.jpg'
import { useState } from "react";
import Login from "./Components/Login/Login";

const Etudiant = () => {

    const [showLogin , setshowLogin] = useState(false);
    const handleshowLogin = () => {
        setshowLogin(true);
    }
    const handleCloseLogin = () => {
        setshowLogin(false);
    };

    const [showSignup, setshowSignup] = useState(false);
    const handleshowSignup = () => {
        setshowSignup(true);
    }
    const handleCloseSignup = () => {
        setshowSignup(false);
    }

    return (
        <div className="content">
            <div className="logo">
                <h2>One Note</h2>
            </div>
            <div className="lien">
                <NavLink>
                    <p>Accueil</p>
                </NavLink>
                <NavLink>
                    <p>A propos</p>
                </NavLink>
                <NavLink>
                    <p>Contact</p>
                </NavLink>
                <div className="inscription" onClick={handleshowSignup}>
                    S'inscrire
                </div>
                <div className="connecte" onClick={handleshowLogin}>
                    Se connecter
                </div>
                {showLogin && <Login onClose={handleCloseLogin} />}
            </div>
            <div className="home" id="home">
                <div className="sary">
                    <img src={sary}></img>
                </div>
                <div className="kozy">
                    <h1>Bienvenue sur <span>ONE NOTE</span></h1>
                    <p>"l'endroit où l'apprentissage rencontre l'innovation. Explorez notre communauté éducative dynamique, découvrez des ressources de qualité et interagissez avec des esprits curieux. Préparez-vous à façonner votre avenir académique."</p>
                </div>
            </div>
            <div className="About" id="about">

            </div>
            <div className="" >

            </div>
        </div>
    );
}

export default Etudiant;
