import React, { useState } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import ModaleCours from "./ModaleCours";

const Professeur_Cours = () => {
    const token = Cookies.get('token');
    console.log(token);

    //jwt_decode pour décoder le token
    const decodedToken = jwt_decode(token);

    console.log(decodedToken.Roles);

    const [showModal, setshowModal] = useState(false);

    const handleshowModal = () => {
        setshowModal(true);
    }
    const handlehideModal = () => {
        setshowModal(false);
    }

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