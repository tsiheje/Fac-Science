import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';
import axios from "axios";

const Devoirs = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);
    const Niveau = decodedToken.Niveau;
    const Mention = decodedToken.Mention;
    const Parcours = decodedToken.Parcours;

    const [devoirs, setDevoirs] = useState([]);
    useEffect(() => {
        const getAllDevoirs = async () => {
            try{
                const response = await axios.get(`http://localhost:4000/Etudiant/devoirs/${Niveau}/${Mention}/${Parcours}`);
                setDevoirs(response.data);
                console.log(response.data)
            }catch(error){
                console.error(error)
            }
        }
        getAllDevoirs();
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

export default Devoirs;