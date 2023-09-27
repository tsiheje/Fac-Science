import React from "react";
import { useLocation } from 'react-router-dom';


const Etudiant = () => {
    const location = useLocation();
    const { user } = location.state; 
  
   const Nom = user.Prenom
    console.log(Nom);
  
    return (
      <div>
        <h1>Vous etes sur {Nom}</h1>
      </div>
    );
}

export default Etudiant;