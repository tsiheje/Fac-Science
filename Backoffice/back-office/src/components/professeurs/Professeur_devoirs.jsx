import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import ModaleDevoirs from "./ModaleDevoirs";
import axios from "axios";
import BarNav from "./Navbar";

const Professeur_Devoirs = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
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
            <div className="nav">
                <BarNav/>
            </div>
            <div className="compents">
                <div className="haut">
                    <div className="rechercher">
                        <input type="search" name="recherche" id="" placeholder="rechercher votre devoirs..."/>
                    </div>
                    <div className="buttonajouter" onClick={handleshowModal}>
                        Donner un devoirs
                    </div>
                </div>
                <table>
                    
                </table>
            </div>
            {showModal && <ModaleDevoirs onClose={handlehideModal}/>}
        </div>
    )
}

export default Professeur_Devoirs;