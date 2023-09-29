import React from "react";
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from "./Navbar";
import Cours_et_Devoirs from "./Cours_et_devoirs";
import Annonces_et_Informations from "./Annonce_et_Information";

const Etudiant = () => {
    const location = useLocation();
    const user = location.state?.user; // Utilisation de la syntaxe optionnelle ?. pour éviter l'erreur si location.state est null

    const Nom = user ? user.Prenom : ""; // Assurez-vous que Nom a une valeur par défaut si user est null

    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
}

export default Etudiant;
