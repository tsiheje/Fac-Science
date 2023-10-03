import React from "react";
import Navbar from '../NavBar/Navbar';
import Card from '../Card/Card';

const Professeur_Cours_et_Devoirs = () =>{
    return(
        <div className="content">
        <Navbar></Navbar>
            <div className="scroll">
                <h1>Professeur Devoir et Cours</h1>
                <Card></Card>
            </div>
        </div>
    )
}

export default Professeur_Cours_et_Devoirs;