import React from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';

const Professeur = () => {
    const token = Cookies.get('token');
    console.log(token);

    const decodedToken = jwt_decode(token);

    console.log(decodedToken.Roles);
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