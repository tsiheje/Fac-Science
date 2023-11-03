import React, { useState,useEffect } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import ModaleCours from "./ModaleCours";
import axios from "axios";

const Professeur_Cours = () => {
    const token = Cookies.get('token');

    //jwt_decode pour décoder le token
    const decodedToken = jwt_decode(token);
    const Id = decodedToken.Id_compte;

    const [showModal, setshowModal] = useState(false);

    const handleshowModal = () => {
        setshowModal(true);
    }
    const handlehideModal = () => {
        setshowModal(false);
    }

    const [cours, setCours] = useState([]);
    useEffect(() => {
        
        const getAllCours = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/Professeur/cours/${Id}`);
                setCours(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAllCours(); 
        
    }, []);


    return(
        <div className="content">
            <NavBar/>
            <div className="professeur">
                <div className="buttonajouter" onClick={handleshowModal}>
                    Creer un Cours
                </div>
                {showModal && <ModaleCours onClose={handlehideModal}/>}
            </div>
        </div>
    )
}

export default Professeur_Cours;