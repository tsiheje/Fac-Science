import React from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import './Etudiant.css';

const Annonce_et_Information = () => {
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
                        <p>2023-10-18</p>
                        <div className="Desc">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, doloremque explicabo itaque officia quas excepturi dolore recusandae </p>
                        </div>
                        <div className="fichier-anatiny">

                        </div>
                        <div className="action">
                            <div className="voire">Voire</div>
                            <div className="telecharger">Telecharger</div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Annonce_et_Information;