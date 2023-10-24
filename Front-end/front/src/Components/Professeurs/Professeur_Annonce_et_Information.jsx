import React, {useState} from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import ModaleAnnonce from "./ModaleAnnonce";

const Professeur_Annonce_et_Information = () => {
    const token = Cookies.get('token');
    console.log(token);

    //jwt_decode pour décoder le token
    const decodedToken = jwt_decode(token);

    console.log(decodedToken.Roles);
    const [showModal, setshowModal] = useState(false);
    
    const handleshowModal = () => {
        setshowModal(true);
    }

    
    const Modal = showModal && <ModaleAnnonce/>;
    return(
        <div className="content">
            <NavBar/>
            <div className="scroll">
                <div className="buttonajouter" onClick={handleshowModal}>
                    Faire une Annonce
                </div>
                {Modal}
            </div>
        </div>
    )
}

export default Professeur_Annonce_et_Information;