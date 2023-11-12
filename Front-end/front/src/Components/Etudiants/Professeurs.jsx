import React, { useEffect, useState } from "react";
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
                    {/* <div className="recherche">
                        <input type="search" name="recherche" id="recherche" placeholder="rechercher votre besoin..."/>
                        <div className="search-icon"></div>
                    </div> */}
                    <div className="right-contenu">
                        <div className="anaty-prof">
                            <img src={profil} alt="" width={'50%'}/>
                            <div className="bio">
                                <p className="anarany">Rasolofoniaina Tsiheje Marie Mickaelio</p>
                                <p className="tel">0342341566</p>
                                <p className="mail">tsihejem@gmail.com</p>
                            </div>
                            <div className="message">
                                Message
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Professeur;