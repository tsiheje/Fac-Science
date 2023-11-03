import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';
import axios from "axios";

const Professeur = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);

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
                <div className="card-etudiant">
                    <div className="anatiny-etudiant">
                        
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Professeur;