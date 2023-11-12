import React from "react";
import './Etudiant.css';
import profil from '../../Assets/Images/3135715.png';

const Profile = () => {
    return(
        <div className="anatiny-profile">
            <img src={profil} alt="" width={'60%'}/>
            <div className="anarana">
                <p className="nom">Rasolofoniaina Tsiheje Marie Mickaelio</p>
            </div>
            <div className="classe">
                <p className="mention">MATHEMATIQUE ET APPLICATION</p>
                <p className="parcour">S2 en MISS</p>
            </div>
            <div className="bar"></div>
            <div className="total">
                <p className="lesona">Lecons <span>03</span></p>
                <p className="devoir">Devoirs <span>03</span></p>
            </div>
        </div>
    )
}

export default Profile;