import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import './Professeur.css';
import BarNav from "./Navbar";
import axios from "axios"; // Assurez-vous d'importer axios
import cour from '../../Assets/Images/icons8-cours-en-ligne-50.png';
import devoir from '../../Assets/Images/icons8-formulaire-de-candidature-48.png';

const Professeur = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const Id_professeur = decodedToken.Id_compte;

    const [totalCours, setTotalCours] = useState(0);
    const [totalDevoirs, setTotalDevoirs] = useState(0);

    useEffect(() => {
        // Fonction pour récupérer le total des cours
        const fetchTotalCours = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/Professeur/totalCours/${Id_professeur}`);
                setTotalCours(response.data[0].Total);
                console.log(response.data.Total )
            } catch (error) {
                console.error(error);
            }
        };

        // Fonction pour récupérer le total des devoirs
        const fetchTotalDevoirs = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/Professeur/totalDevoirs/${Id_professeur}`);
                setTotalDevoirs(response.data[0].Total);
            } catch (error) {
                console.error(error);
            }
        };

        // Appeler les fonctions pour récupérer les totaux
        fetchTotalCours();
        fetchTotalDevoirs();
    }, [Id_professeur]); // Exécutez le code lorsque Id_professeur change

    return (
        <div className="content">
            <div className="nav">
                <BarNav />
            </div>
            <div className="compents">
                <div className="compents-content">
                    <h1 className="h1">Statistique des cours et devoirs</h1>
                    <div className="dash">
                        <div className="anaty-dash">
                            <img src={cour} alt="" width={'30%'}/>
                            <p>Total des cours: {totalCours}</p>
                        </div>
                        <div className="anaty-dash">
                            <img src={devoir} alt="" width={'30%'}/>
                            <p>Total des devoirs: {totalDevoirs}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Professeur;
