import React, {useEffect, useState} from "react";
import './Etudiant.css';
import profil from '../../Assets/Images/3135715.png';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import Mdp from "./mdp";

const Profile = () => {
    const token = Cookies.get('token');
    const decodedToken = jwt_decode(token);
    const niveau = decodedToken.Niveau;
    const Mention = decodedToken.Mention;
    const Parcours = decodedToken.Parcours;
    const Nom = decodedToken.Nom;
    const Prenom = decodedToken.Prenom;

    const [devoirs, setDevoirs] = useState([]);
    useEffect(() => {
        const getAllDevoirs = async () => {
            try{
                const response = await axios.get(`http://localhost:4000/Etudiant/totaldevoirs/${niveau}/${Mention}/${Parcours}`);
                setDevoirs(response.data);
                console.log(response.data)
            }catch(error){
                console.error(error)
            }
        }
        getAllDevoirs();
    }, []);

    const [cours, setCours] = useState([]);
    useEffect(() => {
        const getAllCours = async () => {
            try{
                const response = await axios.get(`http://localhost:4000/Etudiant/totalcours/${niveau}/${Mention}/${Parcours}`);
                setCours(response.data);
                console.log(response.data)
            }catch(error){
                console.error(error)
            }
        }
        getAllCours();
    }, []);

    const [showMdp, setshowMdp] = useState(false);
    const showModifMdp = () => {
        setshowMdp(true);
    }
    const hideModifMdp = () => {
        setshowMdp(false)
    }
    return(
        <div className="anatiny-profile">
            <img src={profil} alt="" width={'60%'}/>
            <div className="anarana">
                <p className="nom">{Nom} {Prenom}</p>
            </div>
            <div className="classe">
                <p className="mention">{Mention}</p>
                <p className="parcour">{niveau} en {Parcours}</p>
            </div>
            <div className="bar"></div>
            <div className="total">
                <p className="lesona">Total des Lecons <span>03</span></p>
                <p className="devoir">Total des Devoirs <span>03</span></p>
            </div>
            <div className="mdp" onClick={showModifMdp}>
                Modifier le mot de passe
            </div>
            {showMdp && <Mdp onClose={hideModifMdp}/>}
        </div>
    )
}

export default Profile;