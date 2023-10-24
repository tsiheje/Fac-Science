import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import ModalProfesseur from "./ModalProfesseur";
import sary from '../../Assets/Images/3135715.png';
import axios from "axios";


const Admin_Professeur = () => {
    const token = Cookies.get('token');
    console.log(token);

    //jwt_decode pour décoder le token
    const decodedToken = jwt_decode(token);

    console.log(decodedToken.Roles);
    
    const [showModal, setshowModal] = useState(false);

    const handleshowModal = () => {
        setshowModal(true);
    }

    const handleCloseModal = () => {
        setshowModal(false);
      };

    const [Professeur, setprofesseur] = useState([]);

    useEffect(() => {
        
        const getAllProfesseurs = async () => {
            try {
                const response = await axios.get('http://localhost:4000/Administrateur/professeur');
                setprofesseur(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getAllProfesseurs(); 
    }, []);

    const Modal = showModal && <ModalProfesseur onClose={handleCloseModal}/>;
    return(
        <div className="content">
            <NavBar/>
            <div className="scroll">
                <div className="buttonajouter" onClick={handleshowModal}>
                    Ajouter Un(e) Professeur
                </div>
                {Modal}
                <div className="card-professeur">
                    <div className="anatiny">
                        <div className="left">
                        <img src={sary} width="100%" height="80%">
                            </img>
                        </div>
                        <div className="right">
                            <p>Nom : </p>
                            <p>Prenom : </p>
                            <p>Telephone : </p>
                            <p>Email : </p>
                        </div>
                    </div>
                    <div className="action">
                        <div className="modifier">Modifier</div>
                        <div className="supprimer">Supprimer</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin_Professeur;