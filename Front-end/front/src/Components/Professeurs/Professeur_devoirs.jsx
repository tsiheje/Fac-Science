import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import ModaleDevoirs from "./ModaleDevoirs";
import axios from "axios";

const Professeur_Devoirs = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);
    const Id_Professeur = decodedToken.Id_compte;
    const [showModal, setshowModal] = useState(false);

    const handleshowModal = () => {
        setshowModal(true);
    }

    const handlehideModal = () => {
        setshowModal(false);
    }

    const [devoirs, setDevoirs] = useState([]);

    useEffect(() => {
        
        const getAlldevoirs = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/Professeur/devoirs/${Id_Professeur}`);
                setDevoirs(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAlldevoirs(); 
        
    }, []);

    return(
        <div className="content">
            <NavBar/>
            <div className="professeur">
                <div className="buttonajouter" onClick={handleshowModal}>
                    Donner un Devoirs
                </div>
                {showModal && <ModaleDevoirs onClose={handlehideModal}/>}
            </div>
        </div>
    )
}

export default Professeur_Devoirs;